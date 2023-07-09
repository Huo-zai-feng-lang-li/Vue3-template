import { App, defineAsyncComponent } from "vue";
const components = import.meta.glob("./*.vue");
// console.log("😂👨🏾‍❤️‍👨🏼==>：", components);
// console.log("😂👨🏾‍❤️‍👨🏼==>：", Object.entries(components));
export default function install(app: App): void {
  for (const [key, value] of Object.entries(components)) {
    // console.log("😂👨🏾‍❤️‍👨🏼==>：", key);//./CommReport.vue
    // console.log("😂👨🏾‍❤️‍👨🏼==>：", value);
    let name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    // 将大驼峰转为小驼峰
    name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
    // console.log('😂👨🏾‍❤️‍👨🏼==>：name:', name); // CommReport ==> comm-report
    app.component(name, defineAsyncComponent(value as any));
  }
}
