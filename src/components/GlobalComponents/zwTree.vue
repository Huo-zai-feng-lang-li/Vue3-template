<template>
  <!-- 
	ref="treeRef" 用于获取树型组件的实例
	:check-strictly="checkStrictly" 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
	:indent="0" 树节点的缩进距离，设为0即取消缩进。
	:show-checkbox="props.isShowCheckbox" 是否显示复选框，通过 props.isShowCheckbox 来控制。
	:default-expand-all="props.expandAll" 是否默认展开所有节点，通过 props.expandAll 来控制
	:default-checked-keys="props.checkedKeys" 默认选中的节点的 key 的数组
	:data="props.treeData" 展示数据 树的数据源，通过 props.treeData 来控制
	:props="defaultProps" 配置选项，设置树节点的属性，通过 defaultProps 来控制。
	:accordion="props.accordion" 是否每次只展开一个子树节点(手风琴)，通过 props.accordion 来控制。
	node-key="id" 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
	@node-click="onCurAllNodes" 点击树节点触发的事件 onCurAllNodes 是该函数的名称。
	@node-expand="onHandleExpand" 节点被展开的事件 onHandleExpand 是该函数的名称。
	@check-change="getCheckedAllNodes" 勾选状态发生变化时的事件回调函数，getCheckedNodes 是该函数的名称。
	check-on-click-node 点击节点时选中节点，默认值为 false。

	<i :class="checkIconByNodeLevel(node)" />：根据节点的层级来动态设置节点前面的图标样式。
	{{ node.label }}：显示节点的标签文本。需要根据实际的数据结构来获取。props="defaultProps" 、数据源、node.label 三者需要保持一致。
	示例：
			<template>
				<zw-tree
					:treeData="treeData"
					@onCurAllNodes="onCurAllNodes"
					@getCheckedAllNodes="getCheckedAllNodes"
					@onHandleExpand="onHandleExpand"
				/>
			</template>

		<script setup lang="ts" name="Tree">
		import { ref } from 'vue';
		const treeData = ref([{}]);

		const onCurAllNodes = (data: object) => {
			console.log('当前节点下所有节点：', data);
		};

		const onHandleExpand = (data: object) => {
			console.log('展开节点时触发：', data);
		};
		const getCheckedAllNodes = (data: object) => {
			console.log('复选框改变：', data);
		};
		</script>

 -->
  <el-tree
    ref="treeRef"
    class="tree-line"
    :check-strictly="checkStrictly"
    :indent="0"
    :show-checkbox="props.isShowCheckbox"
    :default-expand-all="props.expandAll"
    :default-checked-keys="props.checkedKeys"
    :data="props.treeData"
    :props="defaultProps"
    :accordion="props.accordion"
    node-key="id"
    @node-click="onCurAllNodes"
    @node-expand="onHandleExpand"
    @check="getCheckedAllNodes"
    check-on-click-node
  >
    <template #default="{ node }">
      <i :class="checkIconByNodeLevel(node)" /> {{ node.label }}
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { defineExpose, ref } from "vue";
// 默认配置
const defaultProps = {
  children: "children",
  label: "label",
};

interface Tree {
  label: string;
  children?: Tree[];
}

const treeRef = ref();

const props = defineProps({
  // 树型数据
  treeData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  // 是否全部展开
  expandAll: {
    type: Boolean,
    default: () => {
      return true;
    },
  },
  // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
  checkStrictly: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  checkedKeys: {
    type: Array,
    default: () => {
      return [];
    },
  },
  isShowCheckbox: {
    type: Boolean,
    default: () => {
      return true;
    },
  },
  accordion: {
    type: Boolean,
    default: () => {
      false;
    },
  },
});

// 根据节点层级显示不同的图标
const checkIconByNodeLevel = (node: {
  childNodes: [];
  expanded: boolean;
  data: { id: number };
}) => {
  if (node.childNodes.length == 0) {
    return "iconfont icon-24gl-fileEmpty";
  } else {
    if (node.expanded) {
      return "iconfont icon-wenjianzhankai";
    }
    return "iconfont icon-jian";
  }
};

// 定义事件
const emits = defineEmits([
  "onCurAllNodes",
  "getCheckedAllNodes",
  "onHandleExpand",
]);

// 点击事件
const onCurAllNodes = (data: Tree) => {
  emits("onCurAllNodes", data);
};
// 复选框改变事件
const getCheckedAllNodes = (data: Tree, isCurrentSelected: Tree) => {
  emits("getCheckedAllNodes", data, isCurrentSelected);
};
// 展开事件
const onHandleExpand = (data: Tree) => {
  emits("onHandleExpand", data);
};

defineExpose({
  treeRef,
});
</script>

<style lang="scss" scoped>
@import url("/@/myIcon/iconfont.css");
</style>
