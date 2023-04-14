import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
/* 
  RouteRecordRaw是Vue Router的一个类型定义，它用于描述路由配置的对象。它包含以下属性：
  path：字符串，表示路由的路径。
  name：字符串，表示路由的名称。
  component：组件类型，表示路由所匹配的组件。
  children：子路由配置数组，用于描述嵌套路由。
  meta：对象，用于存储额外的路由元数据，例如需要验证用户权限的信息。
*/

// 引入路由模块
import noFondPage from "./noFond";
import test from "./modules/test";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/index-home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index-about.vue"),
  },
  ...test,
  noFondPage,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
