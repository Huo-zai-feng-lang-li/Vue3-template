<template>
	<div style="position: relative; z-index: 999; margin-top: 5px">
		<router-link class="link" to="/">首页 </router-link>
		<router-link class="link" to="/login">登录页测试axios </router-link>
		<router-link class="link" to="/test1">(动态路由1-🔒) </router-link>
		<router-link class="link" to="/test2">(动态路由2-🔒)</router-link>
		<router-link class="link" to="/test3">(动态路由3-🔒)</router-link>
		<router-link class="link" to="/store">store </router-link>
		<router-link class="link" to="/menu">多级联动菜单</router-link>
		<router-link class="link" to="/scroll">css 滚动进度展示</router-link>
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

<style lang="scss" scoped>
.link {
	margin-right: 20px;
	color: #6071c5;
}
</style>
