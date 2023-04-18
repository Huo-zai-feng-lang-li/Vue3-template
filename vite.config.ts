// 导入 vite 插件
import { defineConfig } from "vite";
// 导入 vue 插件
import vue from "@vitejs/plugin-vue";
// 导入自动导入插件
import AutoImport from "unplugin-auto-import/vite";
// 导入自动注册组件的插件
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import * as path from "path";

export default defineConfig({
  // 配置打包后的相对路径
  base: "./",
  //配置别名
  resolve: {
    // 需要在tsconfig.json的compilerOptions中配置paths
    alias: {
      "@": path.resolve("./src"), // @代替src
      "~": path.resolve("./src/components"), // @代替src/components
    },
  },
  // 配置全局样式
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
  //  plugins插件
  plugins: [
    vue(), //vue
    AutoImport({
      //plus按需引入
      resolvers: [ElementPlusResolver()],
      //引入vue 自动注册api插件
      imports: ["vue", "vue-router", "pinia"], // 配置需要自动导入的库
      dts: "auto-import.d.ts", // 自动引入生成api的地址
      eslintrc: {
        enabled: false, // 是否开启eslint
        filepath: "./.eslintrc-auto-import.json", // eslint配置文件地址
        globalsPropValue: true, // 是否开启全局变量
      },
    }),
    Components({
      //plus按需引入
      resolvers: [ElementPlusResolver()],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ["vue", "md"],
      dts: "components.d.ts", //自动引入生成的组件的地址
    }),
  ],
  // 打包配置
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // 跨域
  server: {
    //使用IP能访问
    host: "0.0.0.0",
    port: 8888,
    // 热更新
    hmr: true,
    //自定义代理规则
    proxy: {
      // 选项写法
      "/api": {
        // target: "https://admin.ccc.com",
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
