import { App, defineAsyncComponent } from "vue";
const components = import.meta.glob("./*.vue"); // 异步方式
// console.log("😂👨🏾‍❤️‍👨🏼==>：", components);
// console.log("😂👨🏾‍❤️‍👨🏼==>：", Object.entries(components));
export default function install(app: App): void {
  for (const [key, value] of Object.entries(components)) {
    // console.log("😂👨🏾‍❤️‍👨🏼==>：", key);//./CommReport.vue
    // console.log("😂👨🏾‍❤️‍👨🏼==>：", value);

    let name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    name = name
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .slice(1);
    // console.log("😂👨🏾‍❤️‍👨🏼==>：name:", name);// CommReport ==> comm-report

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.component(name, defineAsyncComponent(value as any));
  }
}
