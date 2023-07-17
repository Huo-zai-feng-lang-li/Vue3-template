<template>
  <!-- 封装Dialog子组件 page -->
  <el-dialog
    v-model="visible"
    :title="myTitle"
    :width="myWidth"
    :before-close="handleClose"
    @open="handleOpen"
  >
    <div v-loading="myLoading">
      <span class="my-message">
        <slot name="msg"></slot>
      </span>
      <span class="dialog-footer">
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="define">确定</el-button>
        <slot name="btn" num="我是子组件传到父组件的数据"></slot>
      </span>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
/**
 * @props defineProps
 * @param myTitle {String} 标题 required{true}
 * @param myWidth {String} 宽度
 * @param myVisible {Boolean} 是否显示
 * @param myLoading {Boolean} 是否显示loading
 * @emits defineEmits
 * @param update:modelValue {Boolean} 二次封装Dialog组件
 * @param closeDialog {Function} 关闭弹框事件
 * @param closeDefine {Function} 确定按钮事件
 * @param handleOpen {Function} 弹框打开事件
 * @description 二次封装Dialog组件
 * @author zk
 * @createDate 2023/06/26 16:35:36
 * @lastFixDate 2023/06/26 16:35:36
 */

const props = defineProps({
  myTitle: {
    type: String,
    required: true,
  },
  myWidth: {
    type: String,
    default: "60%",
  },
  myVisible: {
    type: Boolean,
    default: false,
  },
  myLoading: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits([
  "update:modelValue",
  "closeDialog",
  "closeDefine",
  "handleOpen",
]);

// 子组件定义自己的visible
const visible = computed({
  get: () => props.myVisible,
  set: (value) => {
    // console.log('！这里输出 🚀 ==>：', value);
    emits("update:modelValue", value);
  },
});

//取消按钮事件
const cancel = () => {
  emits("closeDialog");
};

// 确定按钮事件
const define = () => {
  emits("closeDefine");
};

// 弹框打开事件
const handleOpen = () => {
  emits("handleOpen");
};

// 关闭之前事件
const handleClose = () => {
  // console.log('！这里输出 🚀 ==>：', '关闭之前事件');
  emits("closeDialog");
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
  background-color: pink;
}
</style>
