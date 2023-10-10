<template>
	<!--  el-tooltip 全局子组件 page 省略号文字显示不全鼠标放在文字弹框显示所有详情-->
	<el-tooltip :show-after="200">
		<template #content>
			<div
				v-html="content"
				class="text"
				:style="{
					width: myWidth,
				}"
			></div>
		</template>
		<slot name="slotView" :str="str"></slot>
	</el-tooltip>
</template>

<script setup lang="ts" name="Tooltip">
let str = "我是子组件的内容,可以传递数据到父组件";
/**
 * @description Tooltip global component
 * @example
 * <my-tooltip :content="htmlStr" my-width="700px">
 *     <template v-slot:slotView="({ slotProps })">
 *         <el-button type="success">Button - 1 - {{ slotProps }}</el-button>
 *     </template>
 * </my-tooltip>
 *
 *  <script setup lang="ts" name="Tooltip"> let htmlStr = "xxxxxxxxxx"; ……
 * @author zk
 * @createDate 2023/06/26 16:19:19
 * @lastFixDate 2023/06/26 16:19:19
 */
defineProps({
	content: {
		type: String,
		default: "",
	},
	myWidth: {
		type: String,
		default: "",
	},
});
</script>

<style lang="scss" scoped>
.text {
	color: #fff;
	word-break: break-all;
	word-spacing: 2px;
	letter-spacing: 2px;
	line-height: 1.5;
	font-style: 14px;
}
</style>
