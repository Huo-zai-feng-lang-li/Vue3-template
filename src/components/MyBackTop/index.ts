import { App, createApp, ComponentPublicInstance } from "vue";
import BackTop from "./backtop.vue";

export default {
	BackTop: null as ComponentPublicInstance | null,
	install(app: App) {
		if (this.BackTop) {
			app.config.globalProperties.$BackTop = this.BackTop;
			return;
		}
		const instance = createApp(BackTop);
		const div = document.createElement("div");
		const body = document.body;
		body.appendChild(div);
		this.BackTop = instance.mount(div);
		app.config.globalProperties.$BackTop = this.BackTop;
	},
};
