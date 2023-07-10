// vite.config.ts
import { defineConfig } from "file:///C:/Users/13341/Desktop/Vite--Ts--Vue3---template/node_modules/.pnpm/vite@4.2.0_@types+node@18.15.11_sass@1.60.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/13341/Desktop/Vite--Ts--Vue3---template/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.2.0_vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/13341/Desktop/Vite--Ts--Vue3---template/node_modules/.pnpm/unplugin-auto-import@0.15.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/13341/Desktop/Vite--Ts--Vue3---template/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/Users/13341/Desktop/Vite--Ts--Vue3---template/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import viteCompression from "file:///C:/Users/13341/Desktop/Vite--Ts--Vue3---template/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-compression@0.5.1_vite@4.2.0/node_modules/vite-plugin-compression/dist/index.mjs";
import * as path from "path";
var vite_config_default = defineConfig({
  // 配置打包后的相对路径
  base: "./",
  //配置别名
  resolve: {
    // 需要在tsconfig.json的compilerOptions中配置paths
    alias: {
      "@": path.resolve("./src"),
      // @代替src
      "~": path.resolve("./src/components"),
      // @代替src/components
      "-": path.resolve("./src/api"),
      // @代替src/api
    },
  },
  //  plugins插件
  plugins: [
    vue(),
    //vue
    viteCompression(),
    //gzip
    AutoImport({
      //plus按需引入
      resolvers: [ElementPlusResolver()],
      //引入vue 自动注册api插件
      imports: ["vue", "vue-router", "pinia"],
      // 配置需要自动导入的库
      dts: "./src/types/auto-import.d.ts",
      // 自动引入生成api的地址
      eslintrc: {
        enabled: false,
        // 是否开启eslint
        filepath: "./.eslintrc-auto-import.json",
        // eslint配置文件地址
        globalsPropValue: true,
        // 是否开启全局变量
      },
    }),
    Components({
      //plus按需引入
      resolvers: [ElementPlusResolver()],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ["vue", "md"],
      dts: "./src/types/components.d.ts",
      //自动引入生成的组件的地址
    }),
  ],
  // 打包配置
  build: {
    outDir: "dist",
    assetsDir: "assets",
    //指定静态资源存放路径
    sourcemap: false,
    //是否构建source map 文件
    minify: "terser",
    // 混淆器，terser构建后文件体积更小
    terserOptions: {
      compress: {
        //生产环境时移除console
        // drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        compact: true,
        entryFileNames: "static/js/[name]-[hash].js",
        chunkFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name].[ext]",
      },
    },
  },
  // 跨域
  server: {
    //使用IP能访问
    host: "0.0.0.0",
    //端口号
    port: 8888,
    // 热更新
    hmr: true,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //自定义代理规则
    proxy: {
      // 选项写法
      "/api": {
        // 1 目标路径 这里相当于公共的地址
        target: "https://api.oioweb.cn/api",
        //2 允许跨域
        changeOrigin: true,
        // 3 重写路径
        rewrite: (path2) => path2.replace(/^\/api/, ""),
      },
    },
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxMzM0MVxcXFxEZXNrdG9wXFxcXFZpdGUtLVRzLS1WdWUzLS0tdGVtcGxhdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDEzMzQxXFxcXERlc2t0b3BcXFxcVml0ZS0tVHMtLVZ1ZTMtLS10ZW1wbGF0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMTMzNDEvRGVza3RvcC9WaXRlLS1Ucy0tVnVlMy0tLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7Ly8gXHU1QkZDXHU1MTY1IHZpdGUgXHU2M0QyXHU0RUY2XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuLy8gXHU1QkZDXHU1MTY1IHZ1ZSBcdTYzRDJcdTRFRjZcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuLy8gXHU1QkZDXHU1MTY1XHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU2M0QyXHU0RUY2XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuLy8gXHU1QkZDXHU1MTY1XHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDXHU3RUM0XHU0RUY2XHU3Njg0XHU2M0QyXHU0RUY2XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcbi8vZ3ppcFxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gXHU5MTREXHU3RjZFXHU2MjUzXHU1MzA1XHU1NDBFXHU3Njg0XHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XG4gIGJhc2U6IFwiLi9cIixcbiAgLy9cdTkxNERcdTdGNkVcdTUyMkJcdTU0MERcbiAgcmVzb2x2ZToge1xuICAgIC8vIFx1OTcwMFx1ODk4MVx1NTcyOHRzY29uZmlnLmpzb25cdTc2ODRjb21waWxlck9wdGlvbnNcdTRFMkRcdTkxNERcdTdGNkVwYXRoc1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmNcIiksIC8vIEBcdTRFRTNcdTY2RkZzcmNcbiAgICAgIFwiflwiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9jb21wb25lbnRzXCIpLCAvLyBAXHU0RUUzXHU2NkZGc3JjL2NvbXBvbmVudHNcbiAgICAgIFwiLVwiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9hcGlcIiksIC8vIEBcdTRFRTNcdTY2RkZzcmMvYXBpXG4gICAgfSxcbiAgfSxcblxuICAvLyAgcGx1Z2luc1x1NjNEMlx1NEVGNlxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksIC8vdnVlXG4gICAgdml0ZUNvbXByZXNzaW9uKCksIC8vZ3ppcFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgLy9wbHVzXHU2MzA5XHU5NzAwXHU1RjE1XHU1MTY1XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgLy9cdTVGMTVcdTUxNjV2dWUgXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDYXBpXHU2M0QyXHU0RUY2XG4gICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCIsIFwicGluaWFcIl0sIC8vIFx1OTE0RFx1N0Y2RVx1OTcwMFx1ODk4MVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NzY4NFx1NUU5M1xuICAgICAgZHRzOiBcIi4vc3JjL3R5cGVzL2F1dG8taW1wb3J0LmQudHNcIiwgLy8gXHU4MUVBXHU1MkE4XHU1RjE1XHU1MTY1XHU3NTFGXHU2MjEwYXBpXHU3Njg0XHU1NzMwXHU1NzQwXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGZXNsaW50XG4gICAgICAgIGZpbGVwYXRoOiBcIi4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25cIiwgLy8gZXNsaW50XHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU1NzMwXHU1NzQwXG4gICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxuICAgICAgfSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIC8vcGx1c1x1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OTcwMFx1ODk4MVx1NUMwNlx1NTRFQVx1NEU5Qlx1NTQwRVx1N0YwMFx1N0M3Qlx1NTc4Qlx1NzY4NFx1NjU4N1x1NEVGNlx1OEZEQlx1ODg0Q1x1ODFFQVx1NTJBOFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVxuICAgICAgZXh0ZW5zaW9uczogW1widnVlXCIsIFwibWRcIl0sXG4gICAgICBkdHM6IFwiLi9zcmMvdHlwZXMvY29tcG9uZW50cy5kLnRzXCIsIC8vXHU4MUVBXHU1MkE4XHU1RjE1XHU1MTY1XHU3NTFGXHU2MjEwXHU3Njg0XHU3RUM0XHU0RUY2XHU3Njg0XHU1NzMwXHU1NzQwXG4gICAgfSksXG4gIF0sXG4gIC8vIFx1NjI1M1x1NTMwNVx1OTE0RFx1N0Y2RVxuICBidWlsZDoge1xuICAgIG91dERpcjogXCJkaXN0XCIsXG4gICAgYXNzZXRzRGlyOiBcImFzc2V0c1wiLCAvL1x1NjMwN1x1NUI5QVx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NUI1OFx1NjUzRVx1OERFRlx1NUY4NFxuICAgIHNvdXJjZW1hcDogZmFsc2UsIC8vXHU2NjJGXHU1NDI2XHU2Nzg0XHU1RUZBc291cmNlIG1hcCBcdTY1ODdcdTRFRjZcbiAgICBtaW5pZnk6IFwidGVyc2VyXCIsIC8vIFx1NkRGN1x1NkRDNlx1NTY2OFx1RkYwQ3RlcnNlclx1Njc4NFx1NUVGQVx1NTQwRVx1NjU4N1x1NEVGNlx1NEY1M1x1NzlFRlx1NjZGNFx1NUMwRlxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIC8vXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU2NUY2XHU3OUZCXHU5NjY0Y29uc29sZVxuICAgICAgICAvLyBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGNvbXBhY3Q6IHRydWUsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcInN0YXRpYy9bZXh0XS9bbmFtZV0uW2V4dF1cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgLy8gXHU4REU4XHU1N0RGXG4gIHNlcnZlcjoge1xuICAgIC8vXHU0RjdGXHU3NTI4SVBcdTgwRkRcdThCQkZcdTk1RUVcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAvL1x1N0FFRlx1NTNFM1x1NTNGN1xuICAgIHBvcnQ6IDg4ODgsXG4gICAgLy8gXHU3MEVEXHU2NkY0XHU2NUIwXG4gICAgaG1yOiB0cnVlLFxuICAgIC8vXHU4QkJFXHU0RTNBIHRydWUgXHU2NUY2XHU4MkU1XHU3QUVGXHU1M0UzXHU1REYyXHU4OEFCXHU1MzYwXHU3NTI4XHU1MjE5XHU0RjFBXHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBXHVGRjBDXHU4MDBDXHU0RTBEXHU2NjJGXHU1QzFEXHU4QkQ1XHU0RTBCXHU0RTAwXHU0RTJBXHU1M0VGXHU3NTI4XHU3QUVGXHU1M0UzXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gICAgLy9cdTgxRUFcdTVCOUFcdTRFNDlcdTRFRTNcdTc0MDZcdTg5QzRcdTUyMTlcbiAgICBwcm94eToge1xuICAgICAgLy8gXHU5MDA5XHU5ODc5XHU1MTk5XHU2Q0Q1XG4gICAgICBcIi9hcGlcIjoge1xuICAgICAgICAvLyAxIFx1NzZFRVx1NjgwN1x1OERFRlx1NUY4NCBcdThGRDlcdTkxQ0NcdTc2RjhcdTVGNTNcdTRFOEVcdTUxNkNcdTUxNzFcdTc2ODRcdTU3MzBcdTU3NDBcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vYXBpLm9pb3dlYi5jbi9hcGlcIixcbiAgICAgICAgLy8yIFx1NTE0MVx1OEJCOFx1OERFOFx1NTdERlxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIC8vIDMgXHU5MUNEXHU1MTk5XHU4REVGXHU1Rjg0XG4gICAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxTQUFTO0FBRWhCLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBRXBDLE9BQU8scUJBQXFCO0FBQzVCLFlBQVksVUFBVTtBQUV0QixJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLE1BQU07QUFBQTtBQUFBLEVBRU4sU0FBUztBQUFBO0FBQUEsSUFFUCxPQUFPO0FBQUEsTUFDTCxLQUFVLGFBQVEsT0FBTztBQUFBO0FBQUEsTUFDekIsS0FBVSxhQUFRLGtCQUFrQjtBQUFBO0FBQUEsTUFDcEMsS0FBVSxhQUFRLFdBQVc7QUFBQTtBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUE7QUFBQSxJQUNKLGdCQUFnQjtBQUFBO0FBQUEsSUFDaEIsV0FBVztBQUFBO0FBQUEsTUFFVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQTtBQUFBLE1BRWpDLFNBQVMsQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBO0FBQUEsTUFDdEMsS0FBSztBQUFBO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUE7QUFBQSxRQUNULFVBQVU7QUFBQTtBQUFBLFFBQ1Ysa0JBQWtCO0FBQUE7QUFBQSxNQUNwQjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBO0FBQUEsTUFFVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQTtBQUFBLE1BRWpDLFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxNQUN4QixLQUFLO0FBQUE7QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBQ1gsV0FBVztBQUFBO0FBQUEsSUFDWCxRQUFRO0FBQUE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQTtBQUFBO0FBQUEsUUFHUixlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFFBQVE7QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLEtBQUs7QUFBQTtBQUFBLElBRUwsWUFBWTtBQUFBO0FBQUEsSUFFWixPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVE7QUFBQTtBQUFBLFFBRU4sUUFBUTtBQUFBO0FBQUEsUUFFUixjQUFjO0FBQUE7QUFBQSxRQUVkLFNBQVMsQ0FBQ0EsVUFBaUJBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
