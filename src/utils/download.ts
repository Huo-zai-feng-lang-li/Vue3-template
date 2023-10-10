import { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
interface Navigator {
	msSaveBlob: (blob: Blob, defaultName?: string) => boolean;
}
declare const navigator: Navigator;
/**
 * 用于下载脱敏接口清单模版文件文件的工具函数
 * @name downloadFile
 * @param { AxiosResponse<any> } res - 请求返回的文件数据
 * @param { string } fileName - 文件名称
 * @param { string } fileType - 文件类型
 * @returns { void } - 无返回值
 * @description
 * @fileType word：application/msword
 * @fileType pdf：application/pdf;chartset=UTF-8;
 * @fileType excel：application/vnd.ms-excel
 * @fileType ppt：application/vnd.ms-powerpoint
 * @fileType gif：image/gif
 * @fileType jpg：image/jpeg
 * @fileType png：image/png
 * @fileType txt：text/plain
 * @fileType zip：application/zip
 * @fileType tdsp：application/octet-stream
 * @example
 * > import { downloadFile } from '/@/utils/download'
 * > downloadFile()
 * @author zk
 * @createDate 2023/08/23 11:29:40
 * @lastFixDate 2023/08/23 11:29:40
 */
export function downloadFile(
	res: AxiosResponse<any>,
	fileName = "download",
	fileType = "application/msword"
): void {
	try {
		const blob = new Blob([res.data], {
			type: fileType,
		});

		if ("download" in document.createElement("a")) {
			const elink = document.createElement("a");
			elink.download = fileName;
			elink.style.display = "none";
			elink.href = URL.createObjectURL(blob);
			document.body.appendChild(elink);
			elink.click();
			URL.revokeObjectURL(elink.href);
			document.body.removeChild(elink);
			setTimeout(() => {
				ElMessage.success("下载成功");
			}, 800);
		} else {
			// Internet Explorer浏览器（版本10及以上）的情况下使用
			navigator.msSaveBlob(blob, fileName);
		}
	} catch (error) {
		throw new Error(error as string);
	}
}
