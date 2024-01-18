<template>
	<div class="menu">
		<router-link to="/">首页 </router-link>
		<router-link to="/login">登录页测试axios </router-link>
		<router-link to="/test1">(动态路由1-🔒) </router-link>
		<router-link to="/test2">(动态路由2-🔒)</router-link>
		<router-link to="/test3">(动态路由3-🔒)</router-link>
		<router-link to="/store">store </router-link>
		<router-link to="/menu">多级联动菜单</router-link>
		<router-link to="/monitoringView">分类监控视图</router-link>
		<router-link to="/scroll">css 滚动进度展示</router-link>
		<router-link to="/form-table">表单表格封装</router-link>
	</div>

	<el-config-provider :locale="locale">
		<!-- 这是vue3的写法，与vue2的写法有所区别，如果这里使用vue2.x写法，会有警告 -->
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component
					:is="Component"
					:key="$route.name"
					v-if="$route.meta.keepAlive"
				/>
			</keep-alive>
			<component
				:is="Component"
				:key="$route.name"
				v-if="!$route.meta.keepAlive"
			/>
		</router-view>
	</el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 刷新|超时清除缓存
import isLocalCache from "./utils/isLocalCache";
export default defineComponent({
	name: "App",
	components: {
		ElConfigProvider,
	},
	setup() {
		isLocalCache();
		//global.d.ts定义的全局变量
		// window.nextLoading = false;
		// console.log("🤺🤺 全局变量 🚀 ==>:", window.nextLoading);
		return {
			locale: zhCn,
		};
	},
});
</script>

<style lang="scss">
.menu {
	overflow: hidden;
	position: relative;
	z-index: 999;
	margin-top: 5px;
	width: 100%;
	height: 35px;
	text-align: center;
	color: var(--el-color-white);
	background-color: var(--el-bg-primary);
	line-height: 35px;
	a {
		margin: 0 10px;
		color: var(--el-color-white);
	}
}
@media screen and (max-width: 1396px) {
	html {
		font-size: 58px !important;
	}
}
</style>
