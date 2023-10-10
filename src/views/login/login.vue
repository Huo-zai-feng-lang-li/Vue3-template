<script setup lang="ts">
import { cacheRequest, cancelAllRequest, cancelCurrentRequest } from "-/http";
import { ElMessage } from "element-plus";
import { getWeather, getLocation } from "-/login";

// 发起 chat
const getA = async () => {
	// 缓存函数，如果在接口开启了cache: true,需要在请求前调用此函数
	await cacheRequest("get-/ip?key=33f7405fa0049ff120947b37a12567b2", 1)
		.then((res) => {
			if (!res) return;
			const abCode = JSON.parse(res).adcode;
			ElMessage.success("✈️ 本地数据请求成功市区编码----" + abCode);
		})
		.catch(() => {
			// 真正接口
			getLocation().then((res: any) => {
				if (!res) return;
				const abCode = res.city;
				ElMessage.success("🤖 接口数据当前市区位置-----" + abCode);
			});
		});
};

// 取消 chat
const cancelA = () => {
	// 在适当的时机调用取消请求（例如点击取消按钮）,不传参数默认取消最后一条请求
	cancelCurrentRequest("get-/ip?key=33f7405fa0049ff120947b37a12567b2");
};

// 发起 getWeather
const getB = () => {
	getWeather({
		city: "110000",
		key: "33f7405fa0049ff120947b37a12567b2",
	}).then((res) => {
		if (!res) return;
		ElMessage.success("🤖 接口数据查询天气-----" + res?.lives[0]?.weather);
	});
};

// 取消 history
const cancelB = () => {
	cancelCurrentRequest("get-/weather/weatherInfo");
};

// 取消所有请求
function cancelAll() {
	cancelAllRequest();
}

// https://cn.vuejs.org/api/composition-api-lifecycle.html
onBeforeMount(() => {
	console.log("onBeforeMount");
});
onMounted(() => {
	console.log("onMounted");
});
onBeforeUpdate(() => {
	console.log("onBeforeUpdate");
});
onUpdated(() => {
	console.log("onUpdated");
});
onBeforeUnmount(() => {
	console.log("onBeforeUnmount");
});
onUnmounted(() => {
	console.log("onUnmounted");
});
onActivated(() => {
	console.log("onActivated");
});
onDeactivated(() => {
	console.log("onDeactivated");
});
onErrorCaptured(() => {
	console.log("onErrorCaptured");
});
</script>

<template>
	<div>
		<h1>登录页</h1>
		测试keepAline:<input type="text" />
		<!-- 发起 -->
		<el-button type="primary" @click="getA" class="btnTop">发起A</el-button>
		<!-- 取消 -->
		<el-button type="danger" @click="cancelA" class="btnTop">取消A</el-button>
		<!-- 发起 -->
		<el-button type="primary" @click="getB" class="btnTop">发起B</el-button>
		<!-- 取消 -->
		<el-button type="danger" @click="cancelB" class="btnTop">取消B</el-button>
		<el-button type="danger" @click="cancelAll" class="btnTop"
			>取消所有请求</el-button
		>
	</div>
</template>

<style lang="scss" scoped>
.btnTop {
	position: relative;
	z-index: 99999;
}
</style>
