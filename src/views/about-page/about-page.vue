<template>
  <div>
    <!-- about page -->
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <p>性别：{{ sex }}</p>
    <!-- 发起 -->
    <el-button type="primary" @click="handleClick">发起axios</el-button>
    <!-- 取消 -->
    <el-button type="danger" @click="handleCancel">取消</el-button>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/store/user";
import { ElMessage } from "element-plus";
const store = useUsersStore();
const { name, age, sex } = store;

import { getDataText } from "-/login";
import { cancelToken } from "-/service";

const handleClick = async () => {
  let text = "张坤";
  await getDataText({ text })
    .then((res) => {
      ElMessage.success(res.result.displayText);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleCancel = () => {
  // 在适当的时机调用取消请求（例如点击取消按钮）
  if (cancelToken) {
    cancelToken.cancel("取消请求");
  }
};
</script>
