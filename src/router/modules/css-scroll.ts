export default {
	// 路由分模块 store
	path: "/scroll",
	name: "scroll",
	component: () => import("@/views/scroll/index.vue"),
	meta: {
		title: "css滚动进度条",
		icon: "",
		loading: true,
		keepAlive: true,
	},
};
