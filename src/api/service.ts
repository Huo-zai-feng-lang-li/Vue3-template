import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可在此处添加请求头等信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 可在此处对响应进行统一处理,根据接口返回的层次结构调整返回值
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
