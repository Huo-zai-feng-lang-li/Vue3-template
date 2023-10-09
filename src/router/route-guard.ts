// 路由守卫 用来动态生成路由
import { router, routes } from "./index";
import { getLocalKey } from "@/utils/storage";
//引入main.ts中的app
import app from "../main";
const hideLoading = () => app.config.globalProperties.$Loading?.hideLoading;
const showLoading = () => app.config.globalProperties.$Loading?.showLoading();
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

let isRoutesGenerated = false; // 添加一个标志位，用来判断是否已经生成了动态路由

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.loading) showLoading();
  /**
   *  token 是登录成功得到的。如果用户本地模拟token，也会调用接口，如果token过期或者被非法篡改，会在axios的拦截器中进行处理。
   */
  if (to.path === "/login") return next();

  if (getLocalKey("token")) {
    addRouters(next, to);
  } else {
    // 没token不是权限页面
    if (!to.meta.isRelease) {
      addRouters(next, to);
    } else {
      next({
        path: "/login",
        replace: true,
      });
    }
  }
});

// 调用接口获取数据，动态生成路由
function addRouters(next: NavigationGuardNext, to: RouteLocationNormalized) {
  //先执行的是 isRoutesGenerated，默认false，然后再取反。第一次进来是true，所以会执行里面的代码
  if (!isRoutesGenerated) {
    // 判断是否已经生成了动态路由
    try {
      // 从后台获取菜单 axios.get('/api/menu')
      const menu: RouteItem[] = [
        {
          path: "/test1",
          name: "test1",
          meta: {
            loading: true,
            keepAlive: true,
            isRelease: true,
          },
          component: () => import("@/views/dynamic-routing/index-test1.vue"),
        },
        {
          path: "/test2",
          name: "test2",
          meta: {
            loading: true,
            keepAlive: true,
            isRelease: true,
          },
          component: () => import("@/views/dynamic-routing/index-test2.vue"),
        },
        {
          path: "/test3",
          name: "test3",
          meta: {
            loading: true,
            keepAlive: true,
            isRelease: true,
          },
          component: () => import("@/views/dynamic-routing/index-test3.vue"),
        },
        {
          path: "/menu",
          name: "menu",
          meta: {
            loading: true,
            keepAlive: true,
            // isRelease: true,
          },
          component: () => import("@/views/menu/index.vue"),
        },
      ];
      //  生成动态路由
      generateRoutes(menu);
      isRoutesGenerated = true; // 设置标志位为true，表示已经生成了动态路由
      //解决动态路由刷新页面后，404  next()是放行，next({path:to.path,replace:true})是重定向
      next({
        path: to.path,
        replace: true,
      });
    } catch (error) {
      hideLoading()();
      new Error(error as string);
    }
  } else {
    next();
  }
}

// 根据菜单数据动态生成路由
function generateRoutes(menu: string | any[]): void {
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i];
    const {
      path,
      name,
      meta: { loading, keepAlive, isRelease },
      component,
    } = item;
    const route: RouteItem = {
      path: path,
      name: name,
      meta: {
        loading: loading,
        keepAlive: keepAlive,
        isRelease: isRelease,
      },
      component: component,
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
}

router.afterEach((to) => {
  if (to.meta.loading) hideLoading()(1000); // 第二个参数为关闭loading的时间，无参即是根据上下文环境300ms关闭
});

export default router;
