import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
/*  createWebHistory 与 createWebHashHistory 的区别
  createWebHistory：使用 HTML5 History API 的路由模式。注意：这种模式要玩好，还需要后台配置支持。后台不配置你本地开发没问题，一旦部署上线，刷新就会出现 404。
  createWebHashHistory：使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History API 的浏览器。

  详细来说，createWebHistory 是基于 HTML5 History API 的，而 createWebHashHistory 是基于 URL 的 hash 值的。
  在 Vue3 中，你可以通过调用 createWebHistory 或 createWebHashHistory 函数来创建路由。

createWebHistory 监听浏览器的 history.pushState 和 history.replaceState 事件，并使用 HTML5 的 history API 来管理路由。拥有更简单的 URL，不包含 "#" 符号。

createWebHashHistory 使用浏览器的 window.location.hash 属性来管理路由。在 URL 中将使用 "#" 符号，例如：`http://localhost:300/#/about`。变化时无需向服务器发送请求，对于只需要处理前端路由的应用程序来说，使用 Hash 模式足以满足需求。Hash 模式在传输数据量方面更小，而且兼容性最好。

在选择使用哪种模式之前，你应该考虑以下因素：

- **历史访问记录管理**：createWebHistory 可以管理浏览历史记录，使浏览器的后退/前进按钮可用，而 createWebHashHistory 不支持这些功能。
- **URL 文本可读性**：createWebHistory 生成的 URL 更具可读性，不包含任何无用信息，通常比 createWebHashHistory 生成的 URL 更优。
- **部署环境**：如果你的应用程序必须在较旧的浏览器上运行（如 IE 11 等），则应使用 createWebHashHistory。由于旧版浏览器不支持 HTML5 history API，使用 createWebHistory 可能会导致问题。
- **服务器配置**：在使用 createWebHistory 时需要确保你的服务器（例如，Apache 或 Nginx）已正确配置，以避免服务端路由失败的问题。createWebHashHistory 不需要服务器配置，因为 URL 中的哈希符号是在客户端处理的，不会向服务器发送任何请求。

因此，如果你的应用程序仅使用前端路由，无需后退/前进按钮，或者你专注于支持现代浏览器，则应使用 createWebHistory。否则，如果应用程序部署在旧的浏览器上，则应使用 createWebHashHistory。
 */

/* 
  RouteRecordRaw是Vue Router的一个类型定义，它用于描述路由配置的对象。它包含以下属性：
  path：字符串，表示路由的路径。
  name：字符串，表示路由的名称。
  component：组件类型，表示路由所匹配的组件。
  children：子路由配置数组，用于描述嵌套路由。
  meta：对象，用于存储额外的路由元数据，例如需要验证用户权限的信息。
*/
//引入main.ts
import app from "../main";
// 引入路由模块
import noFondPage from "./not-found";
// 测试路由
import test from "./modules/test";
// pinia路由
import pinia from "./modules/pinia-store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      loading: true,
    },
    component: () => import("@/views/home-page/home-page.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      loading: true,
    },
    component: () => import("@/views/about-page/about-page.vue"),
  },
  ...test,
  pinia,
  // 404页面需要放在最后！
  noFondPage,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Vue3 router守卫
// 在路由跳转之前，开启loading，路由跳转之后，关闭loading
router.beforeEach((to, from, next) => {
  if (to.meta.loading) {
    app.config.globalProperties.$loading.showLoading();
    next();
  } else {
    next();
  }
});
router.afterEach((to) => {
  if (to.meta.loading) {
    app.config.globalProperties.$loading.hideLoading();
  }
});
export default router;
