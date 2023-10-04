// vite.config.ts
import {
  defineConfig,
  loadEnv,
} from "file:///D:/%E6%A1%8C%E9%9D%A2/Vue3-template/node_modules/.pnpm/vite@4.2.0_@types+node@18.15.11_sass@1.60.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E6%A1%8C%E9%9D%A2/Vue3-template/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.2.0_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/%E6%A1%8C%E9%9D%A2/Vue3-template/node_modules/.pnpm/unplugin-auto-import@0.15.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/%E6%A1%8C%E9%9D%A2/Vue3-template/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/%E6%A1%8C%E9%9D%A2/Vue3-template/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import viteCompression from "file:///D:/%E6%A1%8C%E9%9D%A2/Vue3-template/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-compression@0.5.1_vite@4.2.0/node_modules/vite-plugin-compression/dist/index.mjs";
import * as path from "path";
var vite_config_default = defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
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
        //plus api 自动引入
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
        //plus 组件 自动引入
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
          drop_console: true,
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
      port: env.VITE_PORT,
      //是否自动打开浏览器
      open: env.VITE_OPEN,
      // 热更新
      hmr: true,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      //自定义代理规则
      proxy: {
        // 选项写法
        "/api": {
          // 1 目标路径 这里相当于公共的地址
          target: "https://restapi.amap.com/v3",
          //2 允许跨域
          changeOrigin: true,
          // 3 重写路径
          rewrite: (path2) => path2.replace(/^\/api/, ""),
        },
      },
    },
  };
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTY4NENcdTk3NjJcXFxcVnVlMy10ZW1wbGF0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU2ODRDXHU5NzYyXFxcXFZ1ZTMtdGVtcGxhdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNiVBMSU4QyVFOSU5RCVBMi9WdWUzLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7Ly8gXHU1QkZDXHU1MTY1IHZpdGUgXHU2M0QyXHU0RUY2XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIENvbmZpZ0VudiB9IGZyb20gXCJ2aXRlXCI7XG4vLyBcdTVCRkNcdTUxNjUgdnVlIFx1NjNEMlx1NEVGNlxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG4vLyBcdTVCRkNcdTUxNjVcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTYzRDJcdTRFRjZcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG4vLyBcdTVCRkNcdTUxNjVcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTdFQzRcdTRFRjZcdTc2ODRcdTYzRDJcdTRFRjZcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xuLy9nemlwIFx1NTNFQVx1NjYyRlx1NTI0RFx1N0FFRlx1NUMwNlx1NTM4Qlx1N0YyOVx1NTQwRVx1NzY4NFx1NjU4N1x1NEVGNlx1NEYyMFx1OEY5M1x1N0VEOVx1NjcwRFx1NTJBMVx1NTY2OFx1RkYwQ1x1OTcwMFx1ODk4MVx1OEJCRVx1N0Y2RVx1NjcwRFx1NTJBMVx1NTY2OFx1NjUyRlx1NjMwMWd6aXBcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XG4vLyBcdTVCRkNcdTUxNjVwYXRoIFx1NzUyOFx1NEU4RVx1OEJCRVx1N0Y2RVx1NTIyQlx1NTQwRFxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKChtb2RlOiBDb25maWdFbnYpID0+IHtcblx0Ly8gXHU1QkZDXHU1MTY1IC5lbnYgXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXG5cdGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZS5tb2RlLCBwcm9jZXNzLmN3ZCgpKTtcblxuXHRyZXR1cm4ge1xuXHRcdC8vIFx1OTE0RFx1N0Y2RVx1NjI1M1x1NTMwNVx1NTQwRVx1NzY4NFx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFxuXHRcdGJhc2U6IFwiLi9cIixcblx0XHQvL1x1OTE0RFx1N0Y2RVx1NTIyQlx1NTQwRFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdC8vIFx1OTcwMFx1ODk4MVx1NTcyOHRzY29uZmlnLmpzb25cdTc2ODRjb21waWxlck9wdGlvbnNcdTRFMkRcdTkxNERcdTdGNkVwYXRoc1xuXHRcdFx0YWxpYXM6IHtcblx0XHRcdFx0XCJAXCI6IHBhdGgucmVzb2x2ZShcIi4vc3JjXCIpLCAvLyBAXHU0RUUzXHU2NkZGc3JjXG5cdFx0XHRcdFwiflwiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9jb21wb25lbnRzXCIpLCAvLyBAXHU0RUUzXHU2NkZGc3JjL2NvbXBvbmVudHNcblx0XHRcdFx0XCItXCI6IHBhdGgucmVzb2x2ZShcIi4vc3JjL2FwaVwiKSwgLy8gQFx1NEVFM1x1NjZGRnNyYy9hcGlcblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdC8vICBwbHVnaW5zXHU2M0QyXHU0RUY2XG5cdFx0cGx1Z2luczogW1xuXHRcdFx0dnVlKCksIC8vdnVlXG5cdFx0XHR2aXRlQ29tcHJlc3Npb24oKSwgLy9nemlwXG5cdFx0XHRBdXRvSW1wb3J0KHtcblx0XHRcdFx0Ly9wbHVzIGFwaSBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcblx0XHRcdFx0cmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcblx0XHRcdFx0Ly9cdTVGMTVcdTUxNjV2dWUgXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDYXBpXHU2M0QyXHU0RUY2XG5cdFx0XHRcdGltcG9ydHM6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJwaW5pYVwiXSwgLy8gXHU5MTREXHU3RjZFXHU5NzAwXHU4OTgxXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3Njg0XHU1RTkzXG5cdFx0XHRcdGR0czogXCIuL3NyYy90eXBlcy9hdXRvLWltcG9ydC5kLnRzXCIsIC8vIFx1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NVx1NzUxRlx1NjIxMGFwaVx1NzY4NFx1NTczMFx1NTc0MFxuXHRcdFx0XHRlc2xpbnRyYzoge1xuXHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkZlc2xpbnRcblx0XHRcdFx0XHRmaWxlcGF0aDogXCIuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uXCIsIC8vIGVzbGludFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NTczMFx1NTc0MFxuXHRcdFx0XHRcdGdsb2JhbHNQcm9wVmFsdWU6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxuXHRcdFx0XHR9LFxuXHRcdFx0fSksXG5cdFx0XHRDb21wb25lbnRzKHtcblx0XHRcdFx0Ly9wbHVzIFx1N0VDNFx1NEVGNiBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcblx0XHRcdFx0cmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcblx0XHRcdFx0Ly8gXHU5MTREXHU3RjZFXHU5NzAwXHU4OTgxXHU1QzA2XHU1NEVBXHU0RTlCXHU1NDBFXHU3RjAwXHU3QzdCXHU1NzhCXHU3Njg0XHU2NTg3XHU0RUY2XHU4RkRCXHU4ODRDXHU4MUVBXHU1MkE4XHU2MzA5XHU5NzAwXHU1RjE1XHU1MTY1XG5cdFx0XHRcdGV4dGVuc2lvbnM6IFtcInZ1ZVwiLCBcIm1kXCJdLFxuXHRcdFx0XHRkdHM6IFwiLi9zcmMvdHlwZXMvY29tcG9uZW50cy5kLnRzXCIsIC8vXHU4MUVBXHU1MkE4XHU1RjE1XHU1MTY1XHU3NTFGXHU2MjEwXHU3Njg0XHU3RUM0XHU0RUY2XHU3Njg0XHU1NzMwXHU1NzQwXG5cdFx0XHR9KSxcblx0XHRcdFxuXHRcdF0sXG5cdFx0Ly8gXHU2MjUzXHU1MzA1XHU5MTREXHU3RjZFXG5cdFx0YnVpbGQ6IHtcblx0XHRcdG91dERpcjogXCJkaXN0XCIsXG5cdFx0XHRhc3NldHNEaXI6IFwiYXNzZXRzXCIsIC8vXHU2MzA3XHU1QjlBXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1QjU4XHU2NTNFXHU4REVGXHU1Rjg0XG5cdFx0XHRzb3VyY2VtYXA6IGZhbHNlLCAvL1x1NjYyRlx1NTQyNlx1Njc4NFx1NUVGQXNvdXJjZSBtYXAgXHU2NTg3XHU0RUY2XG5cdFx0XHRtaW5pZnk6IFwidGVyc2VyXCIsIC8vIFx1NkRGN1x1NkRDNlx1NTY2OFx1RkYwQ3RlcnNlclx1Njc4NFx1NUVGQVx1NTQwRVx1NjU4N1x1NEVGNlx1NEY1M1x1NzlFRlx1NjZGNFx1NUMwRlxuXHRcdFx0dGVyc2VyT3B0aW9uczoge1xuXHRcdFx0XHRjb21wcmVzczoge1xuXHRcdFx0XHRcdC8vXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU2NUY2XHU3OUZCXHU5NjY0Y29uc29sZVxuXHRcdFx0XHRcdGRyb3BfY29uc29sZTogdHJ1ZSxcblx0XHRcdFx0XHRkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0b3V0cHV0OiB7XG5cdFx0XHRcdFx0Y29tcGFjdDogdHJ1ZSxcblx0XHRcdFx0XHRlbnRyeUZpbGVOYW1lczogXCJzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuXHRcdFx0XHRcdGNodW5rRmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG5cdFx0XHRcdFx0YXNzZXRGaWxlTmFtZXM6IFwic3RhdGljL1tleHRdL1tuYW1lXS5bZXh0XVwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdC8vIFx1OERFOFx1NTdERlxuXHRcdHNlcnZlcjoge1xuXHRcdFx0Ly9cdTRGN0ZcdTc1MjhJUFx1ODBGRFx1OEJCRlx1OTVFRVxuXHRcdFx0aG9zdDogXCIwLjAuMC4wXCIsXG5cdFx0XHQvL1x1N0FFRlx1NTNFM1x1NTNGN1xuXHRcdFx0cG9ydDogZW52LlZJVEVfUE9SVCBhcyB1bmtub3duIGFzIG51bWJlcixcblx0XHRcdC8vXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XG5cdFx0XHRvcGVuOiBlbnYuVklURV9PUEVOIGFzIHVua25vd24gYXMgYm9vbGVhbixcblx0XHRcdC8vIFx1NzBFRFx1NjZGNFx1NjVCMFxuXHRcdFx0aG1yOiB0cnVlLFxuXHRcdFx0Ly9cdThCQkVcdTRFM0EgdHJ1ZSBcdTY1RjZcdTgyRTVcdTdBRUZcdTUzRTNcdTVERjJcdTg4QUJcdTUzNjBcdTc1MjhcdTUyMTlcdTRGMUFcdTc2RjRcdTYzQTVcdTkwMDBcdTUxRkFcdUZGMENcdTgwMENcdTRFMERcdTY2MkZcdTVDMURcdThCRDVcdTRFMEJcdTRFMDBcdTRFMkFcdTUzRUZcdTc1MjhcdTdBRUZcdTUzRTNcblx0XHRcdHN0cmljdFBvcnQ6IGZhbHNlLFxuXHRcdFx0Ly9cdTgxRUFcdTVCOUFcdTRFNDlcdTRFRTNcdTc0MDZcdTg5QzRcdTUyMTlcblx0XHRcdHByb3h5OiB7XG5cdFx0XHRcdC8vIFx1OTAwOVx1OTg3OVx1NTE5OVx1NkNENVxuXHRcdFx0XHRcIi9hcGlcIjoge1xuXHRcdFx0XHRcdC8vIDEgXHU3NkVFXHU2ODA3XHU4REVGXHU1Rjg0IFx1OEZEOVx1OTFDQ1x1NzZGOFx1NUY1M1x1NEU4RVx1NTE2Q1x1NTE3MVx1NzY4NFx1NTczMFx1NTc0MFxuXHRcdFx0XHRcdHRhcmdldDogXCJodHRwczovL3Jlc3RhcGkuYW1hcC5jb20vdjNcIixcblx0XHRcdFx0XHQvLzIgXHU1MTQxXHU4QkI4XHU4REU4XHU1N0RGXG5cdFx0XHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxuXHRcdFx0XHRcdC8vIDMgXHU5MUNEXHU1MTk5XHU4REVGXHU1Rjg0XG5cdFx0XHRcdFx0cmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIiksXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGNBQWMsZUFBMEI7QUFFakQsT0FBTyxTQUFTO0FBRWhCLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBRXBDLE9BQU8scUJBQXFCO0FBRTVCLFlBQVksVUFBVTtBQUN0QixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxTQUFvQjtBQUVoRCxRQUFNLE1BQU0sUUFBUSxLQUFLLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFFNUMsU0FBTztBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLFNBQVM7QUFBQTtBQUFBLE1BRVIsT0FBTztBQUFBLFFBQ04sS0FBVSxhQUFRLE9BQU87QUFBQTtBQUFBLFFBQ3pCLEtBQVUsYUFBUSxrQkFBa0I7QUFBQTtBQUFBLFFBQ3BDLEtBQVUsYUFBUSxXQUFXO0FBQUE7QUFBQSxNQUM5QjtBQUFBLElBQ0Q7QUFBQTtBQUFBLElBR0EsU0FBUztBQUFBLE1BQ1IsSUFBSTtBQUFBO0FBQUEsTUFDSixnQkFBZ0I7QUFBQTtBQUFBLE1BQ2hCLFdBQVc7QUFBQTtBQUFBLFFBRVYsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUE7QUFBQSxRQUVqQyxTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQTtBQUFBLFFBQ3RDLEtBQUs7QUFBQTtBQUFBLFFBQ0wsVUFBVTtBQUFBLFVBQ1QsU0FBUztBQUFBO0FBQUEsVUFDVCxVQUFVO0FBQUE7QUFBQSxVQUNWLGtCQUFrQjtBQUFBO0FBQUEsUUFDbkI7QUFBQSxNQUNELENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQTtBQUFBLFFBRVYsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUE7QUFBQSxRQUVqQyxZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUEsUUFDeEIsS0FBSztBQUFBO0FBQUEsTUFDTixDQUFDO0FBQUEsSUFFRjtBQUFBO0FBQUEsSUFFQSxPQUFPO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUE7QUFBQSxNQUNYLFdBQVc7QUFBQTtBQUFBLE1BQ1gsUUFBUTtBQUFBO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDZCxVQUFVO0FBQUE7QUFBQSxVQUVULGNBQWM7QUFBQSxVQUNkLGVBQWU7QUFBQSxRQUNoQjtBQUFBLE1BQ0Q7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNkLFFBQVE7QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2pCO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBO0FBQUEsTUFFUCxNQUFNO0FBQUE7QUFBQSxNQUVOLE1BQU0sSUFBSTtBQUFBO0FBQUEsTUFFVixNQUFNLElBQUk7QUFBQTtBQUFBLE1BRVYsS0FBSztBQUFBO0FBQUEsTUFFTCxZQUFZO0FBQUE7QUFBQSxNQUVaLE9BQU87QUFBQTtBQUFBLFFBRU4sUUFBUTtBQUFBO0FBQUEsVUFFUCxRQUFRO0FBQUE7QUFBQSxVQUVSLGNBQWM7QUFBQTtBQUFBLFVBRWQsU0FBUyxDQUFDQSxVQUFpQkEsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQ3JEO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
