<template>
  <el-button :plain="true" @click="open2">success</el-button>
  <el-button :plain="true" @click="open3">warning</el-button>
  <el-button :plain="true" @click="open1">message</el-button>
  <el-button :plain="true" @click="open6">error</el-button>
  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";

const currentPage4 = ref(4);
const pageSize4 = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
const open1 = () => {
  ElMessage("this is a message.");
};
const open2 = () => {
  ElMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  ElMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open6 = () => {
  ElMessage.error("Oops, this is a error message.");
};
</script>
