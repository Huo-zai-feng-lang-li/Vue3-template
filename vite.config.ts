import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // 这里可以添加全局的 Sass 变量、Mixin等。首先你的有这个文件
        // additionalData: `
        //   @import "@/styles/variables.scss";
        //   @import "@/styles/mixins.scss";
        // `,
      },
    },
  },
});
