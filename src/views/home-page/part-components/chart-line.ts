// 引入interface
import { ChartLineData, ChartLineData2 } from "./interface-chart";

// 模拟接口数据
export const chartLineData: ChartLineData = {
	tooltip: {
		trigger: "axis",
	},
	title: {
		text: "我的线性图",
	},
	grid: {
		left: "3%",
		right: "2%",
		bottom: "9%",
		containLabel: true,
	},
	xAxis: {
		type: "category",
		// 这里从接口获取
		data: [],
		axisLabel: {
			interval: 0,
		},
	},
	yAxis: {
		type: "value",
		minInterval: 1,
		axisLabel: {
			formatter: "{value} 人",
		},
	},
	series: [
		{
			// 这里从接口获取
			data: [],
			type: "line",
			smooth: true,
		},
	],
};

// 静态数据
export const chartLineData2: ChartLineData2 = {
	tooltip: {
		trigger: "axis",
	},
	title: {
		text: "我的线性图",
	},
	xAxis: {
		type: "category",
		data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
	},
	yAxis: {
		type: "value",
	},
	series: [
		{
			data: [120, 200, 150, 80, 70, 110, 130],
			type: "line",
			smooth: true,
		},
	],
};
