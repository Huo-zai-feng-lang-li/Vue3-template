<template>
  <div class="loading" v-show="visible">
    <!-- 小圆圈 loading page-->
    <div class="loading-spinner"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "smallLoading",
  setup() {
    // 控制组件的状态
    let visible = ref(false);

    // 显示组件
    let showLoading = () => {
      visible.value = true;
    };
    // 隐藏组件
    let hideLoading = () => {
      visible.value = false;
    };

    return { visible, showLoading, hideLoading };
  },
});
</script>

<style scoped>
.loading {
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 80%);
  inset: 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
