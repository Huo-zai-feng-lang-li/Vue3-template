import axios, { AxiosInstance, CancelTokenSource } from "axios";
import { ElMessage, ElMessageBox } from "element-plus"; // 导入 element-plus 中的消息和弹框组件
import app from "@/main";

// 创建一个 CancelTokenSource 实例，用于取消请求
let cancelToken: CancelTokenSource | null = null;

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么 token
    // if (Session.get('token')) config.headers!['Authorization'] = `${Session.get('token')}`;

    app.config.globalProperties.$smallLoading.showLoading();

    // 如果存在上一次的请求，则取消它
    if (cancelToken) cancelToken.cancel("取消请求");

    // 创建一个新的 CancelTokenSource 实例
    cancelToken = axios.CancelToken.source();
    config.cancelToken = cancelToken.token;

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code && res.code !== 200) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) {
        // Session.clear(); // 清除浏览器全部临时缓存
        window.location.href = "/home"; // 去登录页
        ElMessageBox.alert("你已被登出，请重新登录", "提示", {})
          .then(() => {})
          .catch(() => {});
      }
      return Promise.reject(response);
    } else {
      app.config.globalProperties.$smallLoading.hideLoading();
      return response.data;
    }
  },
  (error) => {
    // 对响应错误数据做点什么？
    console.log("！这里输出 🚀 ==>：", error);
    // 需要根据不同的错误码进行不同的处理，和后端约定好
    let errorMessage;
    /* 
			axios.isCancel(error) 是 Axios 库中的一个方法，用于判断一个错误对象是否是由于请求取消导致的。
			当使用 axios.CancelToken 取消请求时，会抛出一个带有一个 message 属性的错误对象。
			axios.isCancel(error) 的作用就是判断这个错误对象的类型，如果是由请求取消导致的错误，则返回 true，否则返回 false。
		    console.log('打印cancelToken.cancel('xxx')传入来的值', error.message);
	    */
    if (axios.isCancel(error)) {
      ElMessage.error(error.message || "请求被取消"); // 显示错误消息
    } else {
      // 书写else是为了return Promise.reject(error);在抛一次错
      const describeForNameMap = [
        [
          () => error.message.indexOf("timeout") !== -1,
          () => (errorMessage = "网络超时 🤖"),
        ],
        [
          () => error.message === "Network Error",
          () => (errorMessage = "网络连接错误 🤪"),
        ],
        [
          () => error.response?.data,
          () => (errorMessage = error.response.statusText),
        ],
      ];
      // 获取符合条件的子数组
      const getDescribe = describeForNameMap.find((item) => item[0]());
      // 执行子数组中的函数
      getDescribe && getDescribe[1]();
      ElMessage.error(errorMessage); // 显示错误消息
      // 抛错请求异常上面的、这里的错误信息是英文的
      return Promise.reject(error);
    }
  }
);

// 导出 service将其命名为axios , 同时还导出了一个名为cancelToken的变量（取消请求）
export { service as axios, cancelToken };
