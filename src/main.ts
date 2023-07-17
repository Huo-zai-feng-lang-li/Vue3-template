import { createApp } from "vue";
import App from "./App.vue";

// 使用中文语言包并引入element-plus全局样式
import ElementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/dist/index.css";

import "./assets/css/index.scss"; // 全局样式文件

import componentRegister from "~/GlobalComponents/componentRegister"; // 引入全局组件
// 自定义loading组件、返回顶部组件
import Loading from "~/MyLoading/loading";
import smallLoading from "~/MyLoading/smallLoading";
import MyBackTop from "~/MyBackTop/index";

import router from "./router/route-guard"; // 引入路由配置文件

import { createPinia } from "pinia"; // 引入pinia
const pinia = createPinia(); // 创建pinia实例

// 自定义指令注册
import directives from "@/directive/index";

// 打印环境变量，可以看到VITE_API_URL的值，需要在vite.config.ts，注释掉 drop_console: true
// console.log("😂👨🏾‍❤️‍👨🏼==>： ", import.meta.env);
const app = createApp(App);

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(componentRegister)
  .use(pinia)
  .use(Loading)
  .use(smallLoading)
  .use(MyBackTop)
  .use(router)
  .use(directives)
  .mount("#app");

export default app; // 这里导出app的目的，是为了在后面 ts文件中使用插件
