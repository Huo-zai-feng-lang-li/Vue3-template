<template>
	<div>
		<!-- 
			需求： 顶部展示一级二级菜单，点击顶部二级菜单，
			如果有三级就在左侧展示二级剩余菜单，使用element-plus 
		-->
		<!-- 顶部菜单 -->
		<el-menu
			default-active="1"
			class="el-menu-vertical-demo"
			mode="horizontal"
			background-color="#eee"
			router
		>
			<template v-for="item in menuObj">
				<!-- 如果有二级菜单使用 el-sub-menu，如果没有使用  el-menu-item-->
				<el-sub-menu
					:key="item.path"
					:index="item.path"
					:disabled="item.disabled"
					v-if="item.children && item.children.length > 0"
				>
					<template #title>
						<i :class="item.meta.icon"></i>
						<span>{{ item.meta.title }}</span>
					</template>

					<el-menu-item
						v-for="item2 in item.children"
						:key="item2.path"
						:index="item2.path"
						@click="handleClick2(item2)"
						:disabled="item.disabled"
					>
						<i :class="item2.meta.icon"></i>
						<div class="text2-icon">
							<span>
								{{ item2.meta.title }}
							</span>
							<el-icon v-if="item2.children" :size="15" class="icon">
								V
							</el-icon>
						</div>
					</el-menu-item>
				</el-sub-menu>

				<!--不使用 el-sbu-menu 独立一级-->
				<el-menu-item v-else :index="item.path" :key="item.meta.title">
					<i :class="item.meta.icon"></i>
					<span>{{ item.meta.title }}</span>
				</el-menu-item>
			</template>
		</el-menu>

		<!-- 左侧二级剩余所有菜单 leftMenu-->
		<!-- 递归组件 -->
		<div class="left-box" v-if="flag">
			<menu-tree :menuList="leftMenu"></menu-tree>
		</div>
	</div>
</template>
<script setup lang="ts">
// 引入递归组件
import MenuTree from "./MenuTree.vue";

//所有菜单数据
let menuObj = ref<RouteItem[]>([
	{
		path: "/home",
		name: "Home",
		meta: {
			title: "首页",
			icon: "iconfont icon-24gl-fileEmpty",
		},
	},
	{
		path: "/about",
		name: "About",
		meta: {
			title: "关于",
			icon: "iconfont icon-wenjianzhankai",
		},
		children: [
			{
				path: "/about1",
				name: "About1",
				meta: {
					title: "关于1",
					icon: "iconfont icon-jian",
				},
			},
			{
				path: "/about2",
				name: "About2",
				disabled: true,
				meta: {
					title: "关于2",
					icon: "",
				},
			},
			{
				path: "/about3",
				name: "About3",
				meta: {
					title: "关于3",
					icon: "iconfont icon-24gl-fileEmpty",
				},
			},
		],
	},
	{
		path: "/user",
		name: "User",
		meta: {
			title: "用户",
			icon: "iconfont icon-24gl-fileEmpty",
		},
		children: [
			{
				path: "",
				name: "User1",
				meta: {
					title: "用户1",
					icon: "iconfont icon-24gl-fileEmpty",
				},
				children: [
					{
						path: "/user11",
						name: "User11",
						meta: {
							title: "用户1-1",
							icon: "iconfont icon-24gl-fileEmpty",
						},
					},
				],
			},
			{
				path: "",
				name: "User2",
				meta: {
					title: "用户2",
					icon: "iconfont icon-24gl-fileEmpty",
				},
				children: [
					{
						path: "/user21",
						name: "User21",
						meta: {
							title: "用户2-1",
							icon: "iconfont icon-24gl-fileEmpty",
						},
						children: [
							{
								path: "/user22",
								name: "User22",
								meta: {
									title: "用户2-2",
									icon: "iconfont icon-24gl-fileEmpty",
								},
								children: [
									{
										path: "/scroll",
										name: "scroll",
										component: () =>
											import("@/views/scroll/index.vue"),
										meta: {
											title: "滚动进度条",
											icon: "iconfont icon-24gl-fileEmpty",
										},
									},
								],
							},
						],
					},
				],
			},
			{
				path: "",
				name: "User3",
				meta: {
					title: "用户3",
					icon: "iconfont icon-24gl-fileEmpty",
				},
				children: [
					{
						path: "/user31",
						name: "User31",
						meta: {
							title: "用户3-1",
							icon: "iconfont icon-24gl-fileEmpty",
						},
						children: [
							{
								path: "/user32",
								name: "User31",
								meta: {
									title: "用户3-2",
									icon: "iconfont icon-24gl-fileEmpty",
								},
							},
						],
					},
				],
			},
		],
	},
]);

// 三级菜单数据
let leftMenu = ref<RouteItem[]>();
// 是否显示三级菜单（左侧的显示时机）
let flag = ref(false);
// 点击二级菜单展示左侧菜单
const handleClick2 = (item: any) => {
	if (item.children && item.children.length > 0) {
		leftMenu.value = item.children;
		flag.value = true;
	} else {
		leftMenu.value = [];
		flag.value = false;
	}
	// console.log("点击的二级菜单当前项", item);
};
</script>

<style lang="scss" scoped>
.left-box {
	width: 200px;
	height: calc(100vh - 58.4px);
	color: #fff;
	background-color: #545c64;
	animation: fold linear 0.1s;
}

@keyframes fold {
	0% {
		width: 0;
	}

	50% {
		width: 100px;
	}

	100% {
		width: 200px;
	}
}

.text2-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	color: #929396;

	.icon {
		position: absolute;
		right: 10px;
	}
}
</style>
