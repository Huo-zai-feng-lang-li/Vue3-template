// 路由守卫 用来动态生成路由
import { router, routes } from "./index";
import { RouteRecordRaw } from "vue-router";

//引入main.ts中的app
import app from "../main";

let isRoutesGenerated = false; // 添加一个标志位，用来判断是否已经生成了动态路由
router.beforeEach((to, from, next) => {
  if (to.meta.loading) app.config.globalProperties.$Loading.showLoading();
  //先执行的是 isRoutesGenerated，然后再取反。
  if (!isRoutesGenerated) {
    // 判断是否已经生成了动态路由
    try {
      // 从后台获取菜单 axios.get('/api/menu')
      const menu: Array<RouteRecordRaw> = [
        {
          path: "/test1",
          name: "test1",
          meta: {
            loading: true,
          },
          component: () => import("@/views/dynamic-routing/index-test1.vue"),
        },
        {
          path: "/test2",
          name: "test2",
          meta: {
            loading: true,
          },
          component: () => import("@/views/dynamic-routing/index-test2.vue"),
        },
        {
          path: "/test3",
          name: "test3",
          meta: {
            loading: true,
          },
          component: () => import("@/views/dynamic-routing/index-test3.vue"),
        },
      ];
      //  生成动态路由
      generateRoutes(menu);
      isRoutesGenerated = true; // 设置标志位为true，表示已经生成了动态路由
      // 重新跳转到目标路由
      next({ ...to, replace: true });
    } catch (error) {
      console.error("无法获取菜单数据:", error);
    }
  } else {
    next();
  }
});

// 根据菜单数据动态生成路由
function generateRoutes(menu: any) {
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i];
    const route: any = {
      path: item.path,
      name: item.name,
      meta: {
        loading: item.meta.loading,
      },
      component: item.component,
    };

    // 递归生成子路由
    if (item.children && item.children.length > 0) {
      route.children = generateRoutes(item.children);
    }

    // 追加在404页面前面
    routes.splice(routes.length - 1, 0, route);
    // 在路由中添加新路由
    router.addRoute(route);
  }
  // console.log("！这里输出 🚀 ==>：", routes);
}
router.afterEach((to) => {
  if (to.meta.loading) app.config.globalProperties.$Loading.hideLoading();
});

export default router;
