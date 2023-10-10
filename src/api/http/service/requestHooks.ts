// 请求之前处理（请求拦截器）Hooks
import { AxiosRequestConfig } from "axios";
import { showLoading, onProgress } from "./errHook";
import { cancelDuplicateRequest } from "./cancelAjax";
import { Session } from "@/utils/storage";

export default function beforeRequestHook(
	config: AxiosRequestConfig<any, any>
) {
	// 在发送请求之前做些什么？
	const token = Session.get("token");
	if (token) config.headers!["token"] = token; // 在请求头中添加 token
	// 取消重复请求
	cancelDuplicateRequest(config);
	showLoading();
	config.onDownloadProgress = (ProgressEvent: any) => {
		const percent = Math.floor(
			(ProgressEvent.loaded / ProgressEvent.total) * 100
		);
		console.log("🤺🤺  🚀 ==>:", percent);
		onProgress()(percent);
	};
}
