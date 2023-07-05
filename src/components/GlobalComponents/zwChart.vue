<template>
	<div :id="uid" :style="myStyle"></div>
</template>

<script setup lang="ts" name="zwEcharts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import * as echarts from 'echarts';

const uid = ref<string>('');
uid.value = `echarts-uid-${parseInt((Math.random() * 1000000).toString())}`;

/**
 * 防止resize事件频繁触发，使用防抖函数
 * @method debounce
 * @param fn {  function }  回调函数
 * @param delay { number }  延迟时间
 * @example debounce((...args: any[]) => console.log('输入的值：', args), 500)(
	'Hello',
	'World',
	'ZK'
);
 * @author zk
 * @createDate 2023/06/30 10:21:32
 * @lastFixDate 2023/06/30 10:21:32
 */
const debounce = <T extends any[]>(
	fn: (...args: T) => void,
	delay: number = 300
) => {
	let timer: number | null = null;
	// 不使用箭头函数，this指向调用者
	return function (...args: T) {
		if (timer !== null) clearTimeout(timer);
		// 使用箭头函数，this指向最近一级作用域
		timer = setTimeout(() => {
			fn.apply(fn, args);
			// console.log('👨🏾‍❤️‍👨🏼==>：防抖函数参数：', args);
			timer = null;
		}, delay);
	};
};

onMounted(() => {
	const myChart = echarts.init(
		document.getElementById(uid.value) as HTMLElement
	);

	watch(
		() => props.myOption,
		() => {
			myChart.setOption(props.myOption, {
				notMerge: true,
			});
		},
		{
			deep: true,
			immediate: true,
		}
	);

	function chartResize() {
		myChart.resize({
			animation: {
				duration: 300,
			},
		});
	}

	const resizeHandler = debounce(chartResize, 500);
	window.addEventListener('resize', resizeHandler);
	onBeforeUnmount(() => {
		window.removeEventListener('resize', resizeHandler);
		myChart.dispose();
	});
});

const props = defineProps({
	myStyle: {
		type: Object,
		default: () => ({
			width: '100%',
			height: '100%',
		}),
	},
	myOption: {
		type: Object,
		default: () => ({}),
		required: true,
	},
});
</script>
