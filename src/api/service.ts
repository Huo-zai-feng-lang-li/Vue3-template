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
    // if (Session.get('token')) {
    // 	config.headers!['Authorization'] = `${Session.get('token')}`;
    // }
    app.config.globalProperties.$smallLoading.showLoading();

    // 如果存在上一次的请求，则取消它
    if (cancelToken) {
      cancelToken.cancel("取消请求");
    }

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
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error("接口路径找不到");
    }
    return Promise.reject(error);
  }
);

// 导出 service将其命名为axios , 同时还导出了一个名为cancelToken的变量（取消请求）
export { service as axios, cancelToken };
