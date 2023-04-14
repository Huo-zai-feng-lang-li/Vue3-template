import { createApp } from "vue";
// 初始化全局样式
import "./style.css";
import App from "./App.vue";
// 引入element-plus并使用中文语言包
import ElementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// 引入路由配置文件
import router from "./router/index.js";

const app = createApp(App);
app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .mount("#app");
