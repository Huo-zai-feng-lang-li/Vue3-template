<template>
  <div>
    <el-button @click="addNode" type="primary">添加节点</el-button>
    <el-button @click="removeNode" type="danger">删除节点</el-button>
    <div class="tree-container">
      <el-tree
        class="tree-line"
        ref="treeRef"
        :indent="0"
        node-key="id"
        :data="treeData"
        :props="defaultProps"
        :check-strictly="checkStrictly"
        :show-checkbox="isShowCheckbox"
        :check-on-click-node="checkOnClickNode"
        :default-expand-all="defaultExpandAll"
        :draggable="isDraggable"
        :allow-drag="allowDrag"
        :allow-drop="allowDrop"
        @node-drag-end="handleDragEnd"
        @node-click="handleNodeClick"
        @node-contextmenu="editNode"
        @check-change="getCheckedAllNodes"
      >
        <template #default="{ node }">
          <i :class="checkIconByNodeLevel(node)" />
          <input
            v-if="showIpt && node.label === curNodLabel"
            ref="inputRef"
            type="text"
            :value="node.label"
            @blur="showIpt = false"
            @keyup.enter="updateNodeLabel($event, node)"
          />
          <span v-else>{{ node.label }}</span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import type Node from "element-plus/es/components/tree/src/model/node";
const showIpt = ref<boolean>(false); // 是否显示输入框
const curNodLabel = ref<string>(); // 记录右键点击的节点
const inputRef = ref(); // 输入框实例

const treeRef = ref(); // 树实例
// 默认配置
const defaultProps = {
  children: "children",
  label: "label",
};
// 判断节点能否被放置 如果返回 false ，节点不能被放置
const allowDrop = () => true;
// 判断节点能否被拖拽 如果返回 false ，节点不能被拖动
const allowDrag = () => true;

// 子组件事件发送
const emits = defineEmits(["eCurNode", "eCheckedNodes", "eSaveNodes"]);

// 接受父组件传递过来的数据
const props = defineProps({
  // 树型数据
  treeData: {
    type: Array,
    default: () => [],
  },
  // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
  checkStrictly: {
    type: Boolean,
    default: () => false,
  },
  // 是否显示复选框
  isShowCheckbox: {
    type: Boolean,
    default: () => true,
  },
  // 选中节点时是否选中复选框
  checkOnClickNode: {
    type: Boolean,
    default: () => true,
  },
  // 是否默认展开所有节点
  defaultExpandAll: {
    type: Boolean,
    default: () => true,
  },
  // 是否开启拖拽节点功能
  isDraggable: {
    type: Boolean,
    default: () => false,
  },
});

// 点击节点时触发
const handleNodeClick = (data: any) => {
  // console.log('点击节点时触发 🚀 ==>：', data);
  emits("eCurNode", data);
};

// 删除节点
const removeNode = () => {
  const checkedNodes = treeRef.value.getCheckedNodes();
  if (checkedNodes.length === 0) return alert("请至少勾选一项才能删除节点");
  for (const node of checkedNodes) {
    // 根据节点的id删除节点
    nextTick(() => {
      treeRef.value.remove(node.id, false);
      // 根据接口重新获取树型数据
    });
  }
};

// 右击节点时触发
const editNode = (event: MouseEvent, node: Node) => {
  event.preventDefault();
  curNodLabel.value = node.label;
  showIpt.value = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

// 更新节点的label
const updateNodeLabel = (e: Event, node: { data: { label: string } }) => {
  const target = e.target as HTMLInputElement;
  // 递归树 如果target.value有重复的label，就不允许修改
  if (isValueInTree(props.treeData, target.value)) return alert("该节点已存在");
  // 浅拷贝只会影响引用类型的属性，而不会影响基本类型的属性。当浅拷贝一个对象时，基本类型的属性会被复制而不是引用
  // 浅拷贝只有是引用类型才会 两个对象相互影响，如果是基本类型不会互相影响
  node = Object.assign({}, node);
  node.data.label = target.value;
  showIpt.value = false;
};
function isValueInTree(data: string | any[], value: string) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].label === value) {
      return true; // 如果找到匹配项，则返回 true
    }
    // 如果当前节点有子节点，则递归调用遍历子节点
    if (Array.isArray(data[i].children)) {
      if (isValueInTree(data[i].children, value)) {
        return true; // 如果在子节点中找到匹配项，则返回 true
      }
    }
  }
  return false; // 如果遍历完所有节点都没有找到匹配项，则返回 false
}

// 新增节点
const addNode = () => {
  const checkedNodes = treeRef.value.getCheckedNodes();

  if (checkedNodes.length === 0) {
    return alert("请至少勾选一项才能添加节点");
  }

  const nodeName = prompt("请输入节点名称");
  if (!nodeName) {
    return;
  }

  if (isValueInTree(props.treeData, nodeName)) {
    return alert("该节点已存在");
  }

  checkedNodes.forEach(
    (parentNode: { children: { id: number; label: string }[] }) => {
      const newNode = {
        id: props.treeData.length + 1,
        label: nodeName,
      };
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(newNode);
    }
  );
};

// 结束拖拽
const handleDragEnd = (dropNode: Node) => {
  if (!dropNode) return;
  if (props.isDraggable === false) return;
  // 保存节点
  saveNode();
};

function saveNode() {
  emits("eSaveNodes", props.treeData);
}

// 复选框改变
const getCheckedAllNodes = (data: any, isSelected: boolean) => {
  if (!props.isShowCheckbox) return;
  // 获取所有选中的节点
  const checkedNodes = treeRef.value.getCheckedNodes();
  // 获取所有半选中的节点
  const halfCheckedNodes = treeRef.value.getHalfCheckedNodes();
  // data: 当前节点的数据
  // isSelected: 当前节点是否被选中
  // checkedNodes: 所有选中的节点
  // halfCheckedNodes: 所有半选中的节点
  emits("eCheckedNodes", data, isSelected, checkedNodes, halfCheckedNodes);
};

// 根据节点层级显示不同的图标
const checkIconByNodeLevel = (node: {
  childNodes: [];
  expanded: boolean;
  data: { id: number };
}) => {
  if (node.childNodes.length === 0) return "iconfont icon-24gl-fileEmpty";
  return node.expanded ? "iconfont icon-wenjianzhankai" : "iconfont icon-jian";
};

defineExpose({
  treeRef,
  removeNode,
  addNode,
});
</script>

<style lang="scss" scoped>
.tree-container {
  overflow-y: auto;
  width: 20%;
  height: calc(100vh - 130px);
  background-color: #fff;
}
// 树样式
.tree-line {
  ::v-deep(.el-tree-node) {
    position: relative;
    // padding-left: 10px; // 缩进量
  }

  ::v-deep(.el-tree-node__children) {
    padding-left: 16px; // 缩进量
  }
  // 竖线
  ::v-deep(.el-tree-node::before) {
    position: absolute;
    top: -28px;
    left: -3px;
    width: 22px;
    height: 100%;
    border-width: 1px;
    content: "";
    border-left: 1px dashed #ccc;
  }
  // 当前层最后⼀个节点的竖线⾼度固定
  ::v-deep(.el-tree-node:last-child::before) {
    height: 38px; // 可以⾃⼰调节到合适数值
  }
  // 横线
  ::v-deep(.el-tree-node::after) {
    position: absolute;
    top: 11px;
    left: -3px;
    width: 22px;
    height: 20px;
    border-width: 1px;
    content: "";
    border-top: 1px dashed #ccc;
  }
  // 去掉最顶层的虚线，放最下⾯样式才不会被上⾯的覆盖了
  & > ::v-deep(.el-tree-node::after) {
    border-top: none;
  }

  & > ::v-deep(.el-tree-node::before) {
    border-left: none;
  }
  // 展开关闭的icon
  ::v-deep(.el-tree-node__expand-icon) {
    font-size: 16px;
    // 叶⼦节点（⽆⼦节点）
    ::v-deep(&.is-leaf) {
      display: none;
      color: transparent;
    }
  }
}
</style>
