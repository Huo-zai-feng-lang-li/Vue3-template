import { ElMessage } from "element-plus";
let lastErrorMessage = "";
let lastErrorTime = 0;
/**
 * 该函数用于显示错误信息，具有防抖动功能，即在3秒内相同错误信息不会重复提示。
 * @displayName showErrorWithDebounce
 * @param { string } errorMessage
 * @param { number } debounceTime
 */
const showErrorWithDebounce = (errorMessage: string, debounceTime = 3000) => {
	const currentTime = new Date().getTime();
	if (
		errorMessage !== lastErrorMessage ||
		currentTime - lastErrorTime > debounceTime
	) {
		ElMessage.error(errorMessage);
		lastErrorMessage = errorMessage;
		lastErrorTime = currentTime;
	}
};

export { showErrorWithDebounce };
