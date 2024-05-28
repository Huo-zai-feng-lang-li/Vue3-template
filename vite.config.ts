// 导入 vite 插件
import { defineConfig, loadEnv, ConfigEnv } from "vite";
// 导入 vue 插件
import vue from "@vitejs/plugin-vue";
// 导入自动导入插件
import AutoImport from "unplugin-auto-import/vite";
// 导入自动注册组件的插件
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
//gzip 只是前端将压缩后的文件传输给服务器，需要设置服务器支持gzip
import viteCompression from "vite-plugin-compression";
// 导入path 用于设置别名
import * as path from "path";
import { randomLetterPlugin } from "./vite-plugins/random-letter-plugin";

export default defineConfig((mode: ConfigEnv) => {
	// 导入 .env 环境变量
	const env = loadEnv(mode.mode, process.cwd());

	return {
		// 配置打包后的相对路径
		base: "./",
		//配置别名
		resolve: {
			// 需要在tsconfig.json的compilerOptions中配置paths
			alias: {
				"@": path.resolve("./src"), // @代替src
				"~": path.resolve("./src/components"), // @代替src/components
				"-": path.resolve("./src/api"), // @代替src/api
			},
			extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
		},

		//  plugins插件
		plugins: [
			vue(), //vue
			viteCompression(), //gzip
			randomLetterPlugin(), // 定制插件
			AutoImport({
				//plus api 自动引入
				resolvers: [ElementPlusResolver()],
				//引入vue 自动注册api插件
				imports: ["vue", "vue-router", "pinia"], // 配置需要自动导入的库
				dts: "./src/types/auto-import.d.ts", // 自动引入生成api的地址
				eslintrc: {
					enabled: false, // 是否开启eslint
					filepath: "./.eslintrc-auto-import.json", // eslint配置文件地址
					globalsPropValue: true, // 是否开启全局变量
				},
			}),
			Components({
				//plus 组件 自动引入
				resolvers: [ElementPlusResolver()],
				// 配置需要将哪些后缀类型的文件进行自动按需引入
				extensions: [".js", ".ts", ".tsx", ".jsx"],
				dts: "./src/types/components.d.ts", //自动引入生成的组件的地址
			}),
		],
		// 打包配置
		build: {
			outDir: "dist",
			assetsDir: "assets", //指定静态资源存放路径
			sourcemap: false, //是否构建source map 文件
			minify: "terser", // 混淆器，terser构建后文件体积更小
			terserOptions: {
				compress: {
					//生产环境时移除console
					drop_console: true,
					drop_debugger: true,
					pure_funcs: ["console.log"],
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
			port: env.VITE_PORT as unknown as number,
			//是否自动打开浏览器
			open: env.VITE_OPEN as unknown as boolean,
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
					rewrite: (path: string) => path.replace(/^\/api/, ""),
				},
			},
		},
	};
});
