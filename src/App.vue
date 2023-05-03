<template>
  <router-link to="/">首页 </router-link>
  <router-link to="/about">测试axios </router-link>
  <router-link to="/test1">测试1 </router-link>
  <router-link to="/test2">测试2 </router-link>
  <router-link to="/test3">测试3 </router-link>
  <router-link to="/store">store </router-link>
  <el-button type="primary">按钮</el-button>
  <!-- 用了自动注册插件，如果没有生效请检查components.d.ts是否自动导入了组件  -->
  <HelloWorld></HelloWorld>
  <router-view></router-view>
</template>

<script setup lang="ts">
import HelloWorld from "~/HelloWorld.vue";
</script>
<style scoped lang="scss">
// 测试 styleLint
router-link {
  position: fixed;
  color: red;
}
</style>
