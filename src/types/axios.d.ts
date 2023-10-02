/* eslint-disable */
import * as axios from "axios";
// 扩展 axios 数据返回类型，可自行扩展

declare module "axios" {
  // 响应的对象
  export interface AxiosResponse<T = any> {
    code: number;
    data: T;
    message: string;
    type?: string;
    /* 
			[key: string]: T; 这段代码是定义了一个索引签名，它表示可以使用任意字符串作为key，并且对应的值的类型是T。
			索引签名允许在对象中使用动态的属性，也就是说，在定义AxiosResponse接口时，除了预定义的code、data、message属性，还可以添
			加其他任意属性，且属性的值的类型是T。
	    */
    [key: string]: T;
  }
  // 请求的对象
  export interface AxiosRequestConfig<T = any> {
    [key: string]: T;
  }

  // 错误类型
  export interface AxiosError<T = any> {
    config: AxiosRequestConfig<T>;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    retry?: number;
    retryDelay?: number;
    retryCount: number;
    cache?: boolean;
    cacheTimestamp?: number;
    [key: string]: T;
  }

  // 取消请求类型
  export interface CancelTokenSource<T = any> {
    token: CancelToken;
    cancel: Canceler;
    isFinished?: boolean;
    [key: string]: T;
  }
}
