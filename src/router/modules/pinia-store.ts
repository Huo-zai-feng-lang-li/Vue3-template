export default {
  // 路由分模块 store
  path: "/store",
  name: "store",
  component: () => import("@/views/store-view/store-view.vue"),
};
