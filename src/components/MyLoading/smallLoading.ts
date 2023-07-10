import { App, createApp } from "vue";
import smallLoading from "./smallLoading.vue";

export default {
  smallLoading: null as any,

  install(app: App) {
    if (this.smallLoading)
      return (app.config.globalProperties.$smallLoading = this.smallLoading);

    const instance = createApp(smallLoading);
    const div = document.createElement("div");
    const body = document.body;
    body.appendChild(div);
    this.smallLoading = instance.mount(div);
    app.config.globalProperties.$smallLoading = {
      showLoading: this.smallLoading.showLoading,
      hideLoading: this.smallLoading.hideLoading,
    };
  },
};
