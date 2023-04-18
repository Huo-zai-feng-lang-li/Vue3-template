<template>
  <div>
    <!-- about page -->
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <p>性别：{{ sex }}</p>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/store/user";
const store = useUsersStore();
const { name, age, sex } = store;
</script>
