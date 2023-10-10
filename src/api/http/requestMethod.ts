import { AxiosRequestConfig } from "axios";
import { serviceAxios } from "./index";
// post使用data接受参数，get使用params接受参数
// 如果是post请求，但是参数是在url上的，那么就要使用params接受参数，否则使用data接受参数
// put 也相当与post请求,如果报参数错误,就是接受参数的请求体错了post/put用data,get请求用params

type Method = "GET" | "POST" | "PUT" | "DELETE";
interface BaseConfig {
	method: Method;
	retry?: number;
	retryDelay?: number;
	cache?: boolean;
}
type Config = BaseConfig & AxiosRequestConfig;
/**
 *  request 配置
 * @param { string }  method 请求方法
 * @param { object }  headers - 请求头
 * @param { string }  responseType 响应类型 比如文件流、json
 * @param { string }  url   请求地址
 * @param { object }  data| params 请求参数
 * @param { number }  retry  重试次数
 * @param { number }  retryDelay 重试延迟
 * @param { boolean }   cache 是否缓存
 * @returns { Promise } Promise
 * @createDate 2023/08/09 13:12:08
 * @lastFixDate 2023/08/09 13:12:08
 */
function request({
	method = "GET",
	headers = {
		"Content-Type": "application/json;charset=UTF-8",
	},
	responseType,
	url,
	data = {},
	params = {},
	retry,
	retryDelay,
	cache,
}: Config): Promise<any> {
	return serviceAxios({
		method,
		headers,
		responseType,
		url,
		data,
		params,
		retry,
		retryDelay,
		cache,
	});
}

export default request;
