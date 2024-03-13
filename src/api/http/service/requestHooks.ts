// 请求之前处理（请求拦截器）Hooks
import { AxiosRequestConfig } from "axios";
import { showLoading, onProgress } from "./errHook";
import { cancelDuplicateRequest } from "./cancelAjax";
import { Local } from "@/utils/storage";
// 伪进度条开始
let intervalRef: ReturnType<typeof setInterval> | null = null; // 保存定时器引用,动态地获取并使用函数的返回类型

export const startFakeProgress = () => {
	if (intervalRef !== null) {
		clearInterval(intervalRef);
		intervalRef = null;
	}

	let fakeProgress = 0;
	intervalRef = setInterval(() => {
		if (fakeProgress < 99) {
			fakeProgress += 1;
			onProgress()(fakeProgress);
		} else {
			clearInterval(intervalRef as any);
			intervalRef = null;
		}
	}, 100);

	return intervalRef;
};
export default function beforeRequestHook(
	config: AxiosRequestConfig<any, any>
) {
	handleTokenFromUrl();
	// 在发送请求之前做些什么？
	const token = Local.get("token");
	if (token) config.headers!["token"] = token; // 在请求头中添加 token
	startFakeProgress();
	// 取消重复请求
	cancelDuplicateRequest(config);
	showLoading();
}
function handleTokenFromUrl() {
	const currentUrl = window.location.href;
	const url = new URL(currentUrl);
	const token = url.searchParams.get("token");

	if (token) {
		Local.set("token", token);
		// 移除URL中的查询参数部分(xx?xx=xx),保留URL的哈希值（#后面的部分）
		window.location.href = url.origin + url.pathname + url.hash;
	}
}
