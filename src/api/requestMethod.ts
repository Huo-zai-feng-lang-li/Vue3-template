import { axios } from "./service";
/* 
    post请求: 传参数没有明确规定使用params接受参数就是要使用data请求体接受,get请求要使用params接受
    put 也相当与post请求,如果报参数错误,就是接受参数的请求体错了post/put用data,get请求用params 
    POST请求，参数是通过URL传递的，你需要使用params来接收参数。而如果参数是通过请求体传递的，则需要使用data来接收参数。
 */
type method = "GET" | "POST" | "PUT" | "DELETE";

interface requestConfig {
  method?: method;
  url: string;
  data?: object;
  params?: object;
}

function request({
  method = "GET",
  url,
  data = {},
  params = {},
}: requestConfig) {
  return axios({
    method,
    url,
    data,
    params,
  });
}

export default request;
