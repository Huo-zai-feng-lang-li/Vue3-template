<template>
  <div>
    <!-- about page -->
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <p>性别：{{ sex }}</p>
    <el-button type="primary" @click="getAxios">调用axios</el-button>
  </div>
</template>

<script setup lang="ts">
import { getText } from "@/api/api";
import { useUsersStore } from "@/store/user";
import { ElMessage } from "element-plus";
const store = useUsersStore();
const { name, age, sex } = store;

//  调用axios
const getAxios = async () => {
  const { data: res } = await getText({ text: "你是谁" });
  // console.log("res", res);
  if (res.code !== 200) return ElMessage.error(res.msg);
  ElMessage.success(res.result);
};
</script>
