<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld />
  <!-- 盛放路由 -->
  <router-view></router-view>
</template>

<style scoped lang="scss">
.logo {
  padding: 1.5em;
  height: 6em;

  /* 
    transition: filter 300ms; 表示当 filter 属性发生变化时，过渡效果的持续时间为 300ms。
    will-change: filter; 表示该元素的 filter 属性将发生变化，并提示浏览器进行优化以获得更好的性能。
  */
  transition: filter 300ms;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
