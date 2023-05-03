import request from "./request";
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

// 获取文本
export const getText = (params?: unknown) => request({ url: "/text", params });

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
