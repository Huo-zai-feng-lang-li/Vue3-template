<template>
	<div
		class="container w100 h100"
		id="home-page"
		v-waterMarker="{
			text: '版权所有',
			textColor: 'rgba(180, 180, 180, 0.4)',
		}"
	>
		测试keepAline:<input type="text" />
		<el-button @click="handClick('我是参数')" type="success" class="ml10"
			>点我测试tools工具函数</el-button
		>
		<!-- 庆祝彩蛋 -->
		<zk-confetti-canvas />

		<!-- 静态 例子 -->
		<zk-chart
			ref="refChart"
			:myOption="chartLineData2"
			:myStyle="{
				width: '100%',
				height: '280px',
			}"
		></zk-chart>

		<!-- 模拟接口 例子 -->
		<zk-chart
			ref="refChart"
			:myOption="chartLineData"
			:myStyle="{
				width: '100%',
				height: '280px',
			}"
		></zk-chart>
	</div>
</template>

<script setup lang="ts">
// 工具插件
import { debounceRest, isEvenOrOdd, isType } from "vue3-directive-tools";
// 加密插件
const encryptionPlugin = inject("encryptionPlugin") as EncryptionPlugin;
// 彩蛋函数
import { showConfetti } from "@/utils/confetti/confetti";
import autofit from "autofit.js";
onMounted(() => {
	autofit.init();
});
// 模拟接口、静态ECharts数据
import { chartLineData, chartLineData2 } from "./part-components/chart-line";

const getCurveData = () => {
	// 正式接口
	// service({
	//   url: "/api/curve",
	//   method: "get",
	// }).then((res) => {
	//   chartLineData.xAxis.data = res.data.xAxis;
	//   chartLineData.series[0].data = res.data.series;
	// });

	// 模拟接口 一秒钟后直接赋值给ECharts
	setTimeout(() => {
		chartLineData.value.xAxis.data = [
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun",
		] as never;
		chartLineData.value.series[0].data = [
			820, 932, 901, 934, 1290, 1330, 1320,
		] as never;
		chartLineData.value.title.text = "折线图模拟接口数据";
		setTimeout(() => {
			showConfetti(4, {
				x: 0.9,
				y: 0.6,
			});
		}, 1000);
	}, 1000);
};
// Evil.js
const arr = [1, 2, 3, 4, 5, 6, 7];
const arr1 = [1, 2, 3, 4, 5, 6];
console.log(arr.includes(1)); //false
console.log(arr1.includes(1)); //true

const handClick = debounceRest((varStr: string) => {
	ElMessage.success("请打开控制台查看");
	const encryptedData = encryptionPlugin.encryptData("1334132303@qq.com"); // 加密
	const decryptedData = encryptionPlugin.decryptData(encryptedData); // 解密
	console.log("加密后 🚀 ==>:", encryptedData);
	console.log("解密后 🚀 ==>:", decryptedData);
	console.log("我是防抖payload参数 🚀 ==>:", varStr);
	console.log("判断奇数偶数 🚀 ==>:", isEvenOrOdd(-0.3));
	console.log("判断类型 🚀 ==>:", isType({}));
}, 250);

onMounted(() => getCurveData());
</script>

<style scoped lang="scss">
// @import "./index.scss";

.container {
	position: relative;
	padding: 10px;
	box-sizing: border-box;
}
</style>
