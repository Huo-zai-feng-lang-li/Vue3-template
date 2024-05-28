<template>
	<div :id="uid" :style="myStyle"></div>
</template>

<script setup lang="ts">
import {
	onActivated,
	onBeforeUnmount,
	onDeactivated,
	onMounted,
	ref,
	watch,
	nextTick,
} from "vue";
import * as echarts from "echarts";
import { emptyEchartHook } from "@/utils/Hooks/emptyEcharts";

let myChart: echarts.ECharts | null = null; // 定义echarts实例变量
let uid = ref<string>(""); // 定义组件唯一标识符
uid.value = `echarts-uid-${parseInt((Math.random() * 1000).toString())}`; // 生成随机uid

const props = defineProps({
	// 定义组件属性
	myStyle: {
		type: Object,
		default: () => ({
			width: "100%",
			height: "100%",
		}),
	},
	myOption: {
		type: Object,
		default: () => ({}),
		required: true,
	},
	dpr: {
		type: Number,
	},
});

// 初始化图表
function chartInit() {
	const chartDom = <HTMLDivElement>document.getElementById(uid.value);
	/*
	 *当父组件开启了keep-alive时，在echarts没有初始化时，快速切换到其他路由，
	 *会导致echarts dom初始化失败，所以需要判断一下
	 **/
	if (chartDom && props.myOption) updateChart();
}
// 更新图表的函数
const updateChart = () => {
	if (myChart) myChart.dispose(); // 如果图表实例存在，则先销毁
	let chartDom = <HTMLDivElement>document.getElementById(uid.value); // 重新获取图表DOM元素
	myChart = echarts.init(chartDom, undefined, {
		devicePixelRatio: props.dpr || window.devicePixelRatio || 2, // 设置设备像素比，优化显示效果
	});
	myChart?.showLoading({
		text: "图表数据正在努力加载...",
		color: "#c23531",
		textColor: "#000",
		maskColor: "rgba(255, 255, 255, 0.2)",
		zlevel: 0,
	});

	// 检查以确保series和data都已定义
	const hasData =
		props.myOption.series &&
		props.myOption.series.length > 0 &&
		props.myOption.series[0].data &&
		props.myOption.series[0].data.length > 0;

	const optionToUse = hasData
		? props.myOption
		: { ...props.myOption, graphic: emptyEchartHook.value.graphic }; // 如果没有数据，则使用空数据（emptyEchartHook）处理钩子函数
	myChart?.setOption(optionToUse, true);
	myChart?.hideLoading();
	myChart.resize({
		animation: {
			duration: 1200,
		},
	});
};

watch(
	() => props?.myOption,
	async () => {
		await nextTick();
		updateChart();
	},
	{ deep: true, immediate: true }
);
window.addEventListener("resize", updateChart, {
	passive: true, // assive属性设置为true，不会阻止默认行为。
});

// 销毁图表
function chartDispose() {
	if (myChart) {
		myChart.dispose();
		myChart = null;
		window.removeEventListener("resize", updateChart);
	}
}
onMounted(chartInit);
onBeforeUnmount(chartDispose);
onDeactivated(chartDispose);
onActivated(() => {
	/* 使用功能keep-alive时，如果图表已经被销毁，才需要重新初始化，否则会
	   There is a chart instance already initialized on the dom.(dom上已经初始化了一个图表实例。)
	 */
	if (!myChart) chartInit();
});

defineExpose({ myChart: () => myChart });
</script>
