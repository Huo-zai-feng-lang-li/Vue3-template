<template>
	<div class="wrap">
		<h1>state</h1>
		<p>姓名：{{ name }}</p>
		<p>年龄：{{ age }}</p>
		<p>性别：{{ sex }}</p>
		<button @click="changeName">修改姓名</button>
		<button @click="reset">重置store</button>
		<button @click="patchStore">批量修改数据</button>
		<br />
		<h1>getters</h1>
		<!-- 当我们点击批量修改数据按钮时，页面上的新年龄字段也会跟着变化。计算属性 -->
		<p>新年龄：{{ store.getAddAge(100) }}</p>
		<p>调用其它getter：{{ store.getNameAndAge }}</p>

		<h1>actions</h1>
		<button @click="saveName">调用actions</button>
		<button @click="onGetter">调用getter</button>
	</div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/store/user";
const store = useUsersStore();
import { storeToRefs } from "pinia";
const { name, age, sex } = storeToRefs(store);

// 修改名字
const changeName = () => {
	store.name = "卡拉米";
};

// 批量修改数据
const patchStore = () => {
	store.$patch({
		name: "小美",
		age: 100,
		sex: "女",
	});
};

// 调用actions
const saveName = () => {
	store.saveName("小帅");
};

// 调用getter getAddAge
const onGetter = () => {
	console.log(store.getAddAge(100));
};

// 直接调用store的$reset()方法即可重置store
const reset = () => {
	store.$reset();
};
</script>

<style scoped lang="scss">
.wrap {
	// 居中
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(to right, #f7f0ac, #acf7f0, #f0acf7);
	flex-direction: column;
}
</style>
