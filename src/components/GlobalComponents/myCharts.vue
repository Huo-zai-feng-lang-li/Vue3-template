<template>
  <div :id="uid" :style="myStyle"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

// 因为是封装的组件，会多次调用，id不能重复，要在初始化之前写，不然会报错dom为定义
let uid = ref<string>("");
uid.value = `echarts-uid-${parseInt((Math.random() * 1000000).toString())}`;

onMounted(() => {
  let myChart = echarts.init(document.getElementById(uid.value) as HTMLElement);

  // 在template中可以直接取props中的值，但是在script中不行，因为script是在挂载之前执行的
  myChart.setOption(props.myOption, {
    notMerge: true, //不和之前的option合并
  });

  // 监听页面的大小
  window.addEventListener("resize", () => {
    setTimeout(() => {
      myChart?.resize({
        animation: {
          duration: 300,
        },
      });
    }, 400);
  });
});

const props = defineProps({
  myStyle: {
    type: Object,
    default: () => ({
      width: "100%",
      height: "100%",
    }),
  },
  myOption: {
    required: true,
    type: Object,
  },
});
</script>
