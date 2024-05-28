<template>
	<template v-if="isOperator">
		<el-button
			size="small"
			@click="addNode"
			type="primary"
			style="margin-left: 2px"
		>
			<SvgIcon name="ant-PlusOutlined"></SvgIcon>
			添加节点</el-button
		>
		<el-button
			size="small"
			@click="removeNode"
			type="danger"
			style="margin-left: 72px"
		>
			<SvgIcon name="ant-ClearOutlined"></SvgIcon>
			删除节点</el-button
		>
		<el-input
			ref="searchInputRef"
			v-model="searchQuery"
			size="small"
			placeholder="搜索菜单"
			class="mb5 mt5"
			style="width: 280px; display: block"
			:maxlength="20"
			show-word-limit
			clearable
		></el-input>
	</template>

	<el-tree
		class="tree"
		ref="treeRef"
		:indent="0"
		node-key="id"
		:data="props.treeData"
		:props="props.defaultProps"
		:check-strictly="checkStrictly"
		:show-checkbox="isShowCheckbox"
		:check-on-click-node="checkOnClickNode"
		:default-expand-all="defaultExpandAll"
		:allow-drag="allowDrag"
		:draggable="isDraggable"
		:allow-drop="allowDrop"
		@node-drag-end="handleDragEnd"
		@node-click="handleNodeClick"
		@node-contextmenu="editNode"
		@check-change="getCheckedAllNodes"
		:filter-node-method="filterNode"
		v-bind="$attrs"
	>
		<template #default="{ node }">
			<!--只有一级节点的时候，节点靠左 -->
			<div :style="nodeContentStyle">
				<SvgIcon :name="checkIconByNodeLevel(node)" class="mr5"></SvgIcon>
				<input
					v-if="showIpt && node.label === curNodLabel && isEditNode"
					ref="inputRef"
					type="text"
					:value="node.label"
					@blur="showIpt = false"
					@keyup.enter="updateNodeLabel($event, node)"
				/>
				<span v-else>
					<el-tooltip
						:content="node.label"
						placement="right"
						v-if="node.label.length > ellipsisLen"
					>
						<span :class="compNodeCustomized(node)">
							{{ ellipsis(node.label, ellipsisLen) }}
						</span>
					</el-tooltip>
					<span :class="compNodeCustomized(node)" v-else>
						{{ node.label }}
					</span>
				</span>
			</div>
		</template>
	</el-tree>
</template>

<script setup lang="ts">
import { nextTick, ref, computed, watch, onMounted } from "vue";
import type Node from "element-plus/es/components/tree/src/model/node";
const showIpt = ref<boolean>(false); // 是否显示输入框
const curNodLabel = ref<string>(); // 记录右键点击的节点
const inputRef = ref(); // 输入框实例
const treeRef = ref(); // 树实例
const searchInputRef = ref(); // 树搜索实例

// 判断节点能否被放置 如果返回 false ，节点不能被放置
const allowDrop = () => true;
// 判断节点能否被拖拽 如果返回 false ，节点不能被拖动
const allowDrag = () => true;

const ellipsis = (value: string, len: number) => {
	if (!value) return "";
	if (value.length > len) return value.slice(0, len) + "...";
};
interface DefaultProps {
	id: string;
	children: string;
	label: string;
	disabled: string;
}
const emits = defineEmits(["eCurNode", "eCheckedNodes", "eSaveNodes"]);
interface Props {
	treeData?: any[]; // 树数据
	checkStrictly?: boolean; // 是否严格模式
	isShowCheckbox?: boolean; // 是否显示复选框
	checkOnClickNode?: boolean; // 点击节点时是否选中复选框
	defaultExpandAll?: boolean; // 是否默认展开所有
	isDraggable?: boolean; // 是否可拖拽
	isOperator?: boolean; // 是否有操作
	isEditNode?: boolean; // 是否可编辑节点
	ellipsisLen?: number; // 文本超出长度
	defaultProps?: DefaultProps; // 默认属性
	treeIcon?: string[]; // 树图标 [0]:最后一级图标;  [1]:展开图标;  [2]:折叠图标;
	/*
	 * 一级节点展开箭头样式
	 * 例如
	 *	:node-content-style="{
	 *			'margin-left': '-27px',
	 *		}"
	 */
	nodeContentStyle: any;
}

const props = withDefaults(defineProps<Props>(), {
	treeData: () => [],
	checkStrictly: true,
	isShowCheckbox: true,
	checkOnClickNode: false, // true:不关联，false:关联 （line:105 handleNodeClick做了处理）
	defaultExpandAll: true,
	isDraggable: false,
	isOperator: false,
	isEditNode: false,
	ellipsisLen: 10,
	defaultProps: (): DefaultProps => ({
		id: "strategyId",
		children: "children",
		label: "label",
		disabled: "disabled",
	}),
	treeIcon: () => [
		"FileOutlined",
		"FolderOpenOutlined",
		"MinusSquareOutlined",
	],
});

const searchQuery = ref("");

// 点击节点时触发
const handleNodeClick = (
	data: any,
	node: { data: { disabled: boolean }; checked: boolean }
) => {
	emits("eCurNode", data);
	// 点击该行 如果不是复选框或是禁用的，不勾选
	if (!props.isShowCheckbox || node.data.disabled) return;
	node.checked = !node.checked;
};

// 删除节点
const removeNode = () => {
	const checkedNodes = treeRef.value.getCheckedNodes();
	if (checkedNodes.length === 0) return alert("请至少勾选一项才能删除节点");
	for (const node of checkedNodes) {
		nextTick(() => {
			treeRef.value.remove(node.id, false);
		});
	}
};

// 右击节点时触发
const editNode = (event: MouseEvent, node: Node & DefaultProps) => {
	event.preventDefault();
	curNodLabel.value = node[props.defaultProps.label];
	showIpt.value = true;
	nextTick(() => {
		inputRef.value?.focus();
	});
};

// 更新节点的label
const updateNodeLabel = (e: Event, node: any) => {
	const target = e.target as HTMLInputElement;
	if (isValueInTree(props.treeData, target.value))
		return alert("该节点已存在");
	node = Object.assign({}, node);
	node.data.label = target.value;
	showIpt.value = false;
};

// 使用非递归方式查找树中是否存在某个值
function isValueInTree(data: string | any[], value: string) {
	const stack = [...data];
	while (stack.length) {
		const node = stack.pop();
		if (node.label === value) return true;
		if (Array.isArray(node.children)) {
			stack.push(...node.children);
		}
	}
	return false;
}

// 新增节点
const addNode = () => {
	const checkedNodes = treeRef.value.getCheckedNodes();
	if (checkedNodes.length === 0) return alert("请至少勾选一项才能添加节点");
	const nodeName = prompt("请输入节点名称");
	if (!nodeName) return;

	if (isValueInTree(props.treeData, nodeName)) return alert("该节点已存在");
	for (const parentNode of checkedNodes) {
		const newNode = {
			id: props.treeData.length + 1,
			label: nodeName,
		};
		if (!parentNode.children) {
			parentNode.children = [];
		}
		parentNode.children.push(newNode);
	}
};

// 结束拖拽
const handleDragEnd = (dropNode: Node) => {
	if (!dropNode) return;
	if (props.isDraggable === false) return;
	saveNode();
};

// 保存节点
function saveNode() {
	emits("eSaveNodes", props.treeData);
}

// 复选框改变
const getCheckedAllNodes = (data: any, isSelected: boolean) => {
	if (!props.isShowCheckbox) return;
	const checkedNodes = treeRef.value.getCheckedNodes();
	const halfCheckedNodes = treeRef.value.getHalfCheckedNodes();
	// data: 当前节点的数据
	// isSelected: 当前节点是否被选中
	// checkedNodes: 所有选中的节点
	// halfCheckedNodes: 所有半选中的节点
	emits("eCheckedNodes", data, isSelected, checkedNodes, halfCheckedNodes);
};

// 根据节点层级显示不同的图标
const checkIconByNodeLevel = computed(() => {
	return (node: { childNodes: []; expanded: boolean }) => {
		if (node.childNodes.length === 0) return `ant-${props.treeIcon[0]}`;
		return node.expanded
			? `ant-${props.treeIcon[1]}`
			: `ant-${props.treeIcon[2]}`;
	};
});

// 根据id || disabled 控制节点颜色变化
const compNodeCustomized = computed(() => {
	// const customizedIds = [1]; // 指定需要自定义的节点id数组

	return (node: { data: { id: number; disabled: boolean } }) => {
		if (node.data.disabled) return "node-customized";
		// return customizedIds.includes(node.data.id) ? 'node-customized' : '';
	};
});

// 数据搜索
const filterNode = (value: string, data: any) => {
	if (!value) return true;
	return data.label.includes(value);
};
watch(searchQuery, (newVal) => {
	treeRef.value?.filter(newVal);
});
onMounted(() => setTimeout(() => searchInputRef.value?.focus(), 1000));
defineExpose({
	treeRef,
	removeNode,
	addNode,
});
</script>

<style lang="scss" scoped>
.tree {
	border-radius: 5px;
	// background-color: #d30808;
	padding: 15px;
	width: 280px;
	height: 100%;

	// height: calc(100vh - 115px);
	// min-height: 750px;
	padding-bottom: 10px;
	overflow-x: hidden;
	overflow-y: auto;
	border-radius: var(--el-card-border-radius);
	border: 1px solid var(--el-border-color-light);
	background-color: #fff;
	overflow: hidden;
	color: var(--el-text-color-primary);
	transition: var(--el-transition-duration);
	border-radius: 4px;
	&:hover {
		&:hover {
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		}
	}
	transition: box-shadow 0.3s ease-in-out;

	:deep(.el-tree-node) {
		position: relative;
	}
	:deep(.el-tree-node__children) {
		padding-left: 16px;
	}
	:deep(.el-tree-node::before) {
		content: "";
		width: 22px;
		height: 20px;
		position: absolute;
		left: -12px;
		top: 1px;
		border-width: 1px;
		border-left: 1px dashed #ccc;
	}
	:deep(.el-tree-node:last-child::before) {
		height: 38px;
	}
	:deep(.el-tree-node::after) {
		content: "";
		width: 22px;
		height: 20px;
		position: absolute;
		left: -3px;
		top: 11px;
		border-width: 1px;
		border-top: 1px dashed #ccc;
	}
	& > :deep(.el-tree-node::after) {
		border-top: none;
	}
	& > :deep(.el-tree-node::before) {
		border-left: none;
	}
	:deep(.el-tree-node__expand-icon) {
		font-size: 16px;
		:deep(&.is-leaf) {
			color: transparent;
			display: none;
		}
	}
	.node-customized {
		color: #c4bbb3;
	}
	// 一级不显示复选框其余内层都显示
	// :deep(.el-checkbox .el-checkbox__inner) {
	// 	display: none;
	// }

	// :deep(div[role='group']) {
	// 	.el-checkbox .el-checkbox__inner {
	// 		display: inline-block;
	// 	}
	// }

	// :deep(.el-tree-node__content) {
	// 	:deep(.el-checkbox .el-checkbox__inner) {
	// 		display: none;
	// 	}
	// }

	// 只有最后一级显示复选框
	// :deep(.el-tree-node) {
	// 	.is-leaf + .el-checkbox .el-checkbox__inner {
	// 		display: inline-block;
	// 	}
	// 	.el-checkbox .el-checkbox__inner {
	// 		display: none;
	// 	}
	// }
	/* 隐藏所有复选框 
	-----------------------------------------------------------*/
	// :deep(.el-checkbox .el-checkbox__inner) {
	// 	display: none;
	// }

	/* 只在三级菜单中显示复选框 
	-----------------------------------------------------------*/
	// :deep(div[role='group'] div[role='group'] .el-checkbox .el-checkbox__inner) {
	// 	display: inline-block;
	// }
}
:deep(.el-input__wrapper, .el-input__wrapper.is-focus) {
	width: 100%;
}
</style>
