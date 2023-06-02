import { ComponentPublicInstance, createApp } from "vue";
import Loading from "./loading.vue";

type MyGlobalProperties = {
  $loading: ComponentPublicInstance<unknown> | null;
};

export default {
  loading: null as ComponentPublicInstance<unknown> | null,

  install(app: { config: { globalProperties: MyGlobalProperties } }) {
    if (this.loading) {
      app.config.globalProperties.$loading = this.loading;
      return;
    }

    const instance = createApp(Loading);
    const div = document.createElement("div");
    const body = document.body;
    body.appendChild(div);
    this.loading = instance.mount(div);
    app.config.globalProperties.$loading = this.loading;
  },
};
