<template>
	<el-menu
		v-for="menu in menuList"
		:key="menu.name"
		class="el-menu-demo menu-left"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b"
		@select="handleSelect(menu.path)"
		:unique-opened="true"
		:default-openeds="openeds"
	>
		<!-- 如果当前有子菜单，则显示 el-sub-menu ，在el-sub-menu 里调用 递归组件 -->
		<el-sub-menu
			v-if="menu.children && menu.children.length > 0"
			:index="menu.name"
		>
			<template #title>
				<i :class="menu.meta.icon"></i>
				&emsp;
				{{ menu.name }}
			</template>
			<!-- 调用自身  此处是[重点] !!! -->
			<MenuTree :menuList="menu.children"></MenuTree>
		</el-sub-menu>
		<!-- 如果没有子菜单，则显示el-menu-item -->
		<el-menu-item v-else :index="menu.path" :key="menu.path">
			<i :class="menu.meta.icon"></i>
			{{ menu.meta.title }}
		</el-menu-item>
	</el-menu>
	<!--注意项
	1.这里的MenuTree 是vue的递归组件，实际上就是组件自己调用自己,这里组件中调用自己的组件名字是name属性。
	2.一点要在递归组件中加上判断条件，否则可能会造成爆栈。
	3.这里的属性名字请根据自己后端传递的数据字段名字改变。 -->
</template>

<script>
export default {
	name: "MenuTree",
};
</script>

<script setup>
const props = defineProps({
	menuList: {
		type: Array,
		default: () => [],
	},
});

// 菜单点击事件
const handleSelect = (Path) => {
	window.open("/#" + Path, "_blank"); // 打开新的窗口(跳转路径，跳转类型);
};

// 动态获取子菜单的index和父级名称，用于默认展示所有子菜单
const openeds = computed(() => {
	const arr = [];
	props.menuList.forEach((item) => {
		arr.push(item.name);
		if (item.children && item.children.length > 0) {
			item.children.forEach((item) => {
				arr.push(item.name);
			});
		}
	});
	return arr;
});
// console.log('！这里输出 🚀 ==>：', openeds.value);
</script>

<style lang="scss" scoped>
.menu-left {
	:deep(.el-menu-item.is-active) {
		color: #fff !important;

		&:hover {
			color: #409eff !important;
		}
	}
}
</style>
