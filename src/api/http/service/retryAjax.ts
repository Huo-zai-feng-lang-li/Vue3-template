// 自动重试的方法 hook
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
	// withCredentials: true, // 启用携带cookie
});

// 请求失败自动重试的方法 请求失败时、响应失败时、重试请求会触发
const retryFailedRequest = async (
	error: AxiosError | AxiosResponse
): Promise<any> => {
	const config = error;
	// 如果没有设置重试次数 则直接返回错误
	if (!config || !config.retry) return Promise.reject(config);
	// 设置重试次数阈值达到后不再重试
	if (config.retryCount >= config.retry) return;
	// 设置重试次数关闭阈值
	config.retryCount = config.retryCount || 0;
	// 重试次数自增
	config.retryCount += 1;
	// 设置重试延时
	const delay = config.retryDelay || 1000;
	// 延时处理
	await new Promise<void>((resolve) => {
		setTimeout(() => resolve(), delay);
	});
	// 需要等待上一次重试结束后才能继续执行
	return await Promise.resolve(service(config));
};

export { service, retryFailedRequest };
