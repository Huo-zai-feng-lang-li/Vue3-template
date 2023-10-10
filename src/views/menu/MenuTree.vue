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
				&nbsp;
				{{ menu.name }}
			</template>
			<!-- 调用自身  此处是[重点] !!! -->
			<MenuTree :menuList="menu.children"></MenuTree>
		</el-sub-menu>
		<!-- 如果没有子菜单，则显示el-menu-item -->
		<el-menu-item v-else :index="menu.path" :key="menu.path">
			<i :class="menu.meta.icon"></i>&nbsp;
			{{ menu.meta.title }}
		</el-menu-item>
	</el-menu>
</template>

<script setup lang="ts">
defineOptions({
	name: "MenuTree", // 组件名
	inheritAttrs: false, // 是否继承父组件的属性
});
const props = defineProps({
	menuList: {
		type: Array<RouteItem>,
		default: () => [],
	},
});

// 菜单点击事件
const handleSelect = (Path: string) => {
	window.open("/#" + Path, "_blank"); // 打开新的窗口(跳转路径，跳转类型);
};

// 获取name，用于默认展示所有子菜单
const openeds = computed(() => props.menuList.map((item) => item.name));
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
