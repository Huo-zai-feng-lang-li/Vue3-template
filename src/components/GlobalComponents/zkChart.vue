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
import { emptyEchartHook } from "/@/utils/Hooks/emptyEcharts";

let myChart: echarts.ECharts | null = null; // 定义echarts实例变量
let uid = ref<string>(""); // 定义组件唯一标识符
uid.value = `echarts-uid-${parseInt((Math.random() * 1000).toString())}`; // 生成随机uid
interface Props {
	myStyle: Record<string, any>;
	myOption: Record<string, any>;
	dpr: number;
	renderer: "canvas" | "svg";
}

const props = withDefaults(defineProps<Props>(), {
	dpr: window.devicePixelRatio || 1,
	renderer: "svg",
});

// 初始化图表
function chartInit() {
	const chartDom = <HTMLDivElement>document.getElementById(uid.value);
	if (myChart) myChart.dispose();
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
	myChart = echarts.init(
		chartDom,
		{},
		{
			/**
			 * Tips: 使用svg和canvas渲染的区别及优缺点
			 * 1：它适合绘制大型图表或者需要频繁更新的图表，因为它的性能在处理大量数据或高频更新时更优。
			 * 2：它支持矢量渲染，因此生成的图表会保持清晰的质量，无论屏幕大小或分辨率如何。
			 */
			renderer: props.renderer,
			//只重绘图形中变化部分的优化方法-脏矩形技术（仅在 canvas 渲染器下有效）
			useDirtyRect: true,
			// 确保图表能够充满容器。
			width: chartDom.clientWidth,
			height: chartDom.clientHeight,
			// 设置设备像素比，优化显示效果
			devicePixelRatio: props.dpr,
		}
	);
	myChart?.showLoading({
		text: "图表数据正在努力加载...",
		color: "#007ACC",
		textColor: "#fff",
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
