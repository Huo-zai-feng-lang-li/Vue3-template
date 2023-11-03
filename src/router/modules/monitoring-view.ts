export default {
	// 分类监控视图
	path: "/monitoringView",
	name: "monitoringView",
	component: () => import("@/views/monitoringView/index.vue"),
	meta: {
		title: "分类监控视图",
		icon: "",
		loading: true,
	},
};
