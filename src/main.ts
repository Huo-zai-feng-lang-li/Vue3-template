import { createApp } from "vue";
import App from "./App.vue";
// 引入element-plus并使用中文语言包
import ElementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// 引入路由配置文件
import router from "./router/index";
// 按需引入element-plus只引入了需要的组件，但是样式文件是全局的，
import "element-plus/dist/index.css";

console.log("😂👨🏾‍❤️‍👨🏼==>： ", import.meta.env.VITE_API_URL);

const app = createApp(App);
app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .mount("#app");
