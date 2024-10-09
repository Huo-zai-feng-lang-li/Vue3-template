import { createApp } from "vue";
import App from "./App.vue";
// 虽使用了按需导入，还需要将css 引入
import "element-plus/dist/index.css";
import "element-plus-utils"; //Evile-utils
import "./assets/css/index.scss"; // 全局样式文件
import componentRegister from "~/GlobalComponents/componentRegister"; // 引入全局组件

// loading、加密插件、自定义指令、返回顶部组件、滚动进度条
import Loading from "vue3-loading-plug";
import EncryptionPlugin from "vue3-encryption-plugin";
import { directives } from "vue3-directive-tools";
import { useScroll } from "vue3-progress-scroll";
import MyBackTop from "~/MyBackTop/index";

// 引入动态路由配置文件
import router from "./router/route-guard";
import { createPinia } from "pinia"; // 引入 pinia
import SecureLS from "secure-ls"; // 加密 pinia
// 创建 SecureLS 实例
export const ls = new SecureLS({
	encodingType: "aes",
	isCompression: false,
});

const pinia = createPinia(); // 创建 pinia 实例
// 引入 pinia 插件(持久化)
import piniaPersist from "pinia-plugin-persistedstate";

// 打印环境变量，可以看到VITE_API_URL的值，需要在vite.config.ts，注释掉 drop_console: true
// console.log("😂👨🏾‍❤️‍👨🏼==>： ", import.meta.env.MODE);
const app = createApp(App);

app.use(componentRegister)
	.use(MyBackTop)
	.use(EncryptionPlugin)
	.use(Loading)
	.use(directives)
	.use(router)
	.use(pinia)
	.use(useScroll)
	.mount("#app");
pinia.use(piniaPersist);
// 在 Pinia 中注册插件
pinia.use(({ store }) => {
	// 加密状态并存储到 SecureLS 中
	const encryptAndStoreState = () => {
		ls.set(store.$id, store.$state);
	};

	store.$subscribe(encryptAndStoreState); // 在每次状态变更时调用加密函数
});

export default app; // 这里导出app的目的，是为了在后面 ts文件中使用插件
