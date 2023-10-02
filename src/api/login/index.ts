// 导入axios实例中的AxiosResponse泛型接口
import { AxiosResponse } from "axios";
//导入封装的axios请求方法
import request from "-/http/requestMethod";

//  如果是get请求不需要写method，post请求使用data请求体 默认封装的get
// post示例
//  export const login = (data) => request({ method: "post", url: '/login', data: data });

// get示例
//  export const getUserList = (params) => request({ url: '/users', params });

// put示例
//     export const getEdit = (data) => request({
//      method: "put",
//      data,
//      url: "users/" + data.uid + "/state/" + data.type,
//    })

// 获取位置
export const getLocation = (): Promise<AxiosResponse<any, any>> =>
  request({
    method: "GET",
    url: "/ip?key=33f7405fa0049ff120947b37a12567b2",
    cache: true,
    retry: 1,
    // headers: {
    // 	"Content-Type":
    // 		"application/vnd.openxmlformats-officedocument.wordprocessingml.document ",
    // },
    // responseType: 'blob',
  });

/**
 * @name  获取天气
 * @param { object }  params 请求参数
 * @description 接口缓存、重试3次（请求、响应失败时）
 * @author zk
 * @createDate 2023/08/14 14:57:20
 * @lastFixDate 2023/08/14 14:57:20
 */
export const getWeather = (params: object): Promise<AxiosResponse<any, any>> =>
  request({
    method: "GET",
    url: "/weather/weatherInfo",
    retry: 1,
    params,
  });
