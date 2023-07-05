import { createApp } from "vue";
import App from "./App.vue";
// 引入element-plus并使用中文语言包
import ElementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// 按需引入element-plus只引入了需要的组件，但是样式文件是全局的，
import "element-plus/dist/index.css";
// 引入全局组件
import componentRegister from "~/GlobalComponents/componentRegister";
// 自定义loading组件
import Loading from "@/components/MyLoading/index";

// 引入路由配置文件
import router from "./router/index";
// 引入全局重置样式文件
import "./assets/css/reset.css";

// 引入pinia
import { createPinia } from "pinia";
// 创建pinia实例
const pinia = createPinia();

// 打印环境变量，可以看到VITE_API_URL的值，需要在vite.config.ts，注释掉 drop_console: true
// console.log("😂👨🏾‍❤️‍👨🏼==>： ", import.meta.env.VITE_API_URL);

const app = createApp(App);
app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(componentRegister)
  .use(pinia)
  .use(Loading)
  .use(router)
  .mount("#app");
export default app; // 这里导出app的目的，是为了在后面 ts文件中使用插件
