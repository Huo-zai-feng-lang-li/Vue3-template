<template>
	<div class="ProgressTopBar">
		<p v-for="(item, index) in items" :key="index">
			{{ item }}
		</p>
	</div>
</template>

<!--
	之前写法 
	<script>
		export default { name: "MyMenuItem--------------" };
	</script> 
-->

<script setup lang="ts">
// vue3.2.0+ 之后支持的新特性
defineOptions({
	name: "scrollBar", // 组件名
	inheritAttrs: false, // 是否继承父组件的属性
});
import { ref, inject } from "vue";
const items = ref<string[]>([]);
for (let i = 0; i < 200; i++) items.value.push(`Item ${i + 1}`);

import { scrollKey } from "vue3-progress-scroll";
inject(scrollKey)?.$openScroll();
inject(scrollKey)?.$closeScroll();

onMounted(() => {
	ElMessage.success("请您~尝试滚动页面看看");
});
</script>
