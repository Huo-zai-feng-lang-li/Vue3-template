/**
 * 404路由模块
 */
export default {
  // 路由分模块
  // 如果url找不到就会报404,必须放在路由页面最下面
  path: "/:pathMatch(.*)",
  component: () => import("@/views/errors-view/not-found.vue"),
};
