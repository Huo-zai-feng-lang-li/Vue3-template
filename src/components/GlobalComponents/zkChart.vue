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
} from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils/debounce";
let myChart: echarts.ECharts | null = null;
let uid = ref<string>("");
uid.value = `echarts-uid-${parseInt((Math.random() * 1000).toString())}`;
// 初始化图表
function chartInit() {
	let chartDom = document.getElementById(uid.value) as HTMLElement;
	// 当父组件开启了keep-alive时，在echarts没有初始化时，快速切换到其他路由，
	// 会导致echarts dom初始化失败，所以需要判断一下
	if (chartDom && props.myOption) {
		myChart = echarts.init(chartDom);
		myChart.setOption(props.myOption);
	}
}

// 销毁图表
function chartDispose() {
	if (myChart) {
		myChart.dispose();
		myChart = null;
		window.removeEventListener("resize", resizeHandler);
	}
}

const props = defineProps({
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
});

watch(
	() => props.myOption,
	() => {
		myChart?.setOption(props.myOption);
	},
	{
		deep: true,
		immediate: true,
	}
);

// 使用防抖功能重新设置图表大小，在窗口大小改变时，图表自适应
function chartResize() {
	myChart?.resize({
		animation: {
			duration: 300,
		},
	});
}
const resizeHandler = debounce(chartResize, 300);
window.addEventListener("resize", resizeHandler);

onMounted(() => {
	chartInit();
});
onBeforeUnmount(() => {
	// 组件销毁时，销毁图表
	chartDispose();
});

onActivated(() => {
	/* 使用功能keep-alive时，如果图表已经被销毁，才需要重新初始化，否则会
	   There is a chart instance already initialized on the dom.(dom上已经初始化了一个图表实例。)
	 */
	if (!myChart) chartInit();
});
onDeactivated(() => {
	chartDispose();
});

// 抛出myChart实例
function chartsInstance() {
	return myChart;
}
defineExpose({ chartResize, chartsInstance });
</script>
