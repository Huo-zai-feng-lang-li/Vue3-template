/*  封装的axios请求主页 index.ts
	1. 取消重复请求：完全相同的接口在上一个pending状态时，自动取消下一个请求 
	2. 请求失败自动重试： 接口请求后台异常时候， 自动重新发起多次请求， 直到达到所设次数 
	3. 请求接口数据缓存： 接口在设定时间内不会向后台获取数据， 而是直接拿会话存储本地缓存，（关闭当前进程也就是页签就会自动清除）
	4. 父页面单独取消当前请求
	5. 父页面取消所有请求
  6. 请求进度条
*/

// 引入取消重复请求、取消全部请求、取消当前请求 hook
import {
  cancelDuplicateRequest,
  cancelCurrentRequest,
  cancelAllRequest,
} from "./service/cancelAjax";
// 引入请求失败自动重试 hook
import { service, retryFailedRequest } from "./service/retryAjax";
// 引入请求接口数据缓存 hook
import cacheRequest from "./service/cacheAjax";
// 引入loading 、请求进度条、错误判断 hook
import { hideLoading, onResponse, onError } from "./service/errHook";
// 引入请求拦截器Hook
import beforeRequestHook from "./service/requestHooks";
// Axios 的请求拦截器期望返回一个配置对象，而不是响应对象。如果你试图返回一个响应对象，Axios 将会抛出一个错误。
service.interceptors.request.use(
  (config) => {
    beforeRequestHook(config);
    // retryFailedRequest(config); // 请求失败重试
    return config;
  },
  (error) => {
    // 对请求错误做些什么？
    hideLoading();
    // 请求失败重试
    retryFailedRequest(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  // 对响应数据做点什么？ 这里只返回【成功响应的http状态】数据！
  (response) => onResponse(response),
  // 对响应错误数据做点什么？
  (error) => {
    hideLoading();
    onError(error);
  }
);

export {
  service as serviceAxios,
  cancelDuplicateRequest,
  cancelCurrentRequest,
  cancelAllRequest,
  cacheRequest,
};
