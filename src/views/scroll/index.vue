<template>
	<div class="ProgressTopBar">
		<p v-for="(item, index) in 200" :key="index">
			{{ item }}
		</p>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: "scrollBar", // 组件名
	inheritAttrs: false, // 是否继承父组件的属性
});

import { scrollKey } from "vue3-progress-scroll";
inject<typeof scrollKey>(scrollKey).$openScroll();
inject<typeof scrollKey>(scrollKey).$closeScroll();

onMounted(() => {
	ElMessage.success("请您~尝试滚动页面看看");
});
</script>
