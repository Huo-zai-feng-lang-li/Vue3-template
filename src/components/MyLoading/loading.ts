import { App, createApp } from "vue";
import Loading from "./loading.vue";

export default {
  loading: null as any,

  install(app: App) {
    if (this.loading) {
      app.config.globalProperties.$Loading = this.loading;
      return;
    }

    const instance = createApp(Loading);
    const div = document.createElement("div");
    const body = document.body;
    body.appendChild(div);
    this.loading = instance.mount(div);
    app.config.globalProperties.$Loading = {
      showLoading: this.loading.showLoading,
      hideLoading: this.loading.hideLoading,
    };
  },
};
