export default {
	// 路由分模块 store
	path: "/scroll",
	name: "scroll",
	meta: {
		loading: true,
		keepAlive: true,
	},
	component: () => import("@/views/scroll/index.vue"),
};
