<template>
  <router-link to="/">首页 </router-link>
  <router-link to="/about">关于我们 </router-link>
  <router-link to="/test1">测试1 </router-link>
  <router-link to="/test2">测试2 </router-link>
  <router-link to="/test3">测试3 </router-link>
  <el-button type="primary">按钮</el-button>
  <router-view></router-view>
</template>

<script setup lang="ts">
// 占位
</script>

<style scoped lang="scss">
// 测试 styleLint
router-link {
  position: fixed;
  color: red;
}
</style>
