// loading、错误提示、响应成功、响应失败 Hook
import { Session } from "@/utils/storage";
import app from "@/main";
import { ElMessage, ElMessageBox } from "element-plus";
import axios, { AxiosResponse } from "axios";
import { pendingRequests, requestKey } from "./cancelAjax";
import { retryFailedRequest } from "./retryAjax";
import { showErrorWithDebounce } from "./showErrorWithDebounce";
import { startFakeProgress } from "./requestHooks";

const hideLoading = () => app.config.globalProperties.$smallLoading.hideLoading;
const showLoading = () =>
	app.config.globalProperties.$smallLoading.showLoading();
const onProgress = () => app.config.globalProperties.$smallLoading.onProgress;

// 请求成功
const onResponse = (response: AxiosResponse<any, any>) => {
	const { config, data } = response;
	onProgress()(100);
	const interval = startFakeProgress();
	clearInterval(interval);
	hideLoading()(); // hideLoading()(true) 不会延迟关闭loading
	// http状态是200 但是code不是200 返回数据是错误的需要return
	// err200(response);

	// 给 pendingRequests 标记一个isFinished为true 请求完成的标识,用于取消正在进行中的请求
	const responseKey = `${config.method}-${config.url}`;
	const request = pendingRequests.get(responseKey);
	if (request && request.token) {
		pendingRequests.set(responseKey, {
			...request,
			isFinished: true,
		});
	}
	// 判断是否有缓存
	if (config.cache) {
		const cachedResponse = Session.get(responseKey);
		if (cachedResponse) {
			return cachedResponse;
		} else {
			// 接口有 cache 参数，且缓存不存在，则缓存接口数据,并插入当前时间戳
			data.cacheTimestamp = new Date().getTime();
			Session.set(responseKey, data);
			return data;
		}
	} else {
		return data;
	}
};

// 请求失败
const onError = (error: any) => {
	hideLoading()();
	/* 
        axios.isCancel(error) 是 Axios 库中的一个方法，用于判断一个错误对象是否是由于请求取消导致的。
        当使用 axios.CancelToken 取消请求时，会抛出一个带有一个 message 属性的错误对象。
        axios.isCancel(error) 的作用就是判断这个错误对象的类型，如果是由请求取消导致的错误，则返回 true，否则返回 false。
		console.log('打印cancelToken.cancel('xxx')传入来的值', error.message);
	    */
	if (axios.isCancel(error)) {
		// 只提示请求取消有主动填写的消息 如：cancelToken.cancel('xxx')
		if (error.message !== "canceled")
			ElMessage.error(" 🤖 " + error.message + "---" + requestKey);
	} else {
		// 响应失败重试
		retryFailedRequest(error);
		// 不是由请求取消导致的错误
		let errorMessage; // 错误提示变量
		const statusData = error.response?.data; // 错误data数据
		const describeForNameMap = [
			[
				() => error.message.indexOf("timeout") !== -1,
				() => (errorMessage = "网络超时 🤖"),
			],
			[
				() => error.message === "Network Error",
				() => (errorMessage = "网络连接错误 🤪"),
			],

			// 否则 显示错误消息，这里要根据后台返回的数据结构来定
			[() => statusData, () => (errorMessage = statusData.message)],
		];
		// 获取符合条件的子数组
		const getDescribe = describeForNameMap.find((item) => item[0]());
		// 执行子数组中的函数
		getDescribe && getDescribe[1]();
		if (errorMessage) showErrorWithDebounce(errorMessage);
	}
};

const tipError = (value: string, title: string) => {
	ElMessageBox.alert(value, title, {
		confirmButtonText: "重新登录",
		type: "warning",
	}).then(() => {
		Session.clear(); // 清除临时缓存
		// 清除cookie
		document.cookie.split(";").forEach(function (c) {
			document.cookie = c
				.replace(/^ +/, "")
				.replace(
					/=.*/,
					"=;expires=" + new Date().toUTCString() + ";path=/"
				);
		});
		window.location.reload(); // 刷新页面
	});
};

/* function err200(response: AxiosResponse<any, any>) {
	const {
		data,
		data: { code, msg },
	} = response;
	if (code !== 200) {
		if (Object.prototype.toLocaleString.call(data) === "[object Blob]")
			return response;
		if (response.headers["content-type"] == "application/octet-stream")
			return response;
		if (!msg) return ElMessage.error("🤖 响应失败,接口未返回任何内容");
		// 如果后台返回的错误码为 100010016 重复登录、100010011 token过期、100010012 token可能被篡改
		const errArr = [100010016, 100010011, 100010012];
		if (errArr.includes(code)) {
			hideLoading()();
			return tipError(msg, "错误提示");
		}
		ElMessage.error(msg);
		// 需要将错误对象返回，在使用页面调用根据错误码做相应的处理
		return data;
	}
} */
export { hideLoading, showLoading, onProgress, tipError, onResponse, onError };
