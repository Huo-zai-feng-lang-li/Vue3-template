<template>
	<div class="workflow-tool">
		<div class="pl15 tools-title">
			<span>系统节点</span>
			<div class="close" @click="changeSlider">
				<zk-icon
					size="16"
					:type="!isChangeSlider ? 'DArrowLeft' : 'DArrowRight'"
				></zk-icon>
			</div>
		</div>

		<div class="workflow-tool-right">
			<div
				class="workflow-tool-icon"
				v-for="(v, k) in state.toolList"
				:key="k"
				:title="v.title"
				@click="onToolClick(v.fnName)"
			>
				<zk-icon :type="v.icon" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="pagesWorkflowTool">
import { reactive, ref } from "vue";
const emit = defineEmits(["tool", "changeSlider"]);

const state = reactive({
	toolList: [
		{ icon: "Help", title: "帮助", fnName: "help" },
		{ icon: "Download", title: "下载", fnName: "download" },
		{ icon: "Check", title: "提交", fnName: "submit" },
		{ icon: "DocumentCopy", title: "复制", fnName: "copy" },
		{ icon: "Delete", title: "删除", fnName: "del" },
		{ icon: "FullScreen", title: "全屏", fnName: "fullscreen" },
	],
});
const isChangeSlider = ref<boolean>(false);

// 顶部工具栏
const onToolClick = (fnName: string) => {
	emit("tool", fnName);
};

const changeSlider = () => {
	emit("changeSlider", (isChangeSlider.value = !isChangeSlider.value));
};
</script>

<style scoped lang="scss">
.workflow-tool {
	display: flex;
	align-items: center;
	height: 35px;
	color: var(--el-text-color-primary);
	border-bottom: 1px solid #ebeef5;

	.tools-title {
		display: flex;
		justify-content: space-between;
		width: 200px;
		height: 35px;
		line-height: 35px;

		span {
			font-size: 14px;
		}

		.close {
			font-size: 20px;
			cursor: pointer;
		}
	}

	.workflow-tool-right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		.workflow-tool-icon {
		}
	}

	&-icon {
		display: flex;
		align-items: center;
		padding: 0 10px;
		height: 35px;
		color: #000;
		cursor: pointer;
		line-height: 35px;

		&:hover {
			background: rgb(0 0 0 / 4%);

			i {
				display: inline-block;
				animation: logoAnimation 0.3s ease-in-out;
			}
		}
	}
}
</style>
