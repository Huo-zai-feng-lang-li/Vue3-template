// 导入axios实例中的AxiosResponse泛型接口
import { AxiosResponse } from "axios";
//导入封装的axios请求方法
import request from "../requestMethod";

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

/**
 * GET/POST测试接口
 * @method getDataText
 * @param { object } params - 查询参数
 * @description 模拟调用，如果是post请求，但是参数是在url上的，那么就要使用params接受参数，否则使用data接受参数
 * @request GET/POST:/delivery
 * @returns { Promise } 返回一个Promise对象
 * @example
 * > 1：引入 import { getDataText } from '@/api/login';
 * > 2：调用 await getDataText({text:'参数'});
 * @createDate 2023/07/04 15:18:14
 * @lastFixDate 2023/07/04 15:18:14
 */

export const getDataText = (params: object): Promise<AxiosResponse<any, any>> =>
  request({
    method: "POST",
    url: "/ai/chat",
    params,
  });

// 如何在组件使用
/* 
// post请求
import { login } from "@/api/api";
const { data: res } = await login(loginForm);
if (res.meta.status !== 200) return ELMessage.error("登录失败！");
ELMessage.success("登录成功！");
// 保存token
localStorage.setItem("token", res.data.token);
// 跳转到首页
router.push("/");
// 获取用户信息
getUserInfoList();


// get请求
import { getUserList } from "@/api/api";
const { data: res } = await getUserList({ pageNum: 1, pagesize: 2 });
if (res.meta.status !== 200) return ELMessage.error("获取分类列表失败！");
editCateForm = res.data;
editCateDialogVisible.value = true;

// put请求
import { getEdit } from "@/api/api";
const { data: res } = await getEdit({
  uid: row.uid,
  type: row.mg_state,
});
if (res.meta.status !== 200) return ELMessage.error("修改状态失败！");
ELMessage.success("修改状态成功！");
getUserList();

*/
