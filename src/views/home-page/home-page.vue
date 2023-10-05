<template>
  <div
    class="container w100 h100"
    v-waterMarker="{
      text: '版权所有',
      textColor: 'rgba(180, 180, 180, 0.4)',
    }"
  >
    测试keepAline:<input type="text" />
    <el-button @click="handClick('我是参数')" type="success" class="ml10"
      >点我测试tools工具函数</el-button
    >
    <!-- 庆祝彩蛋 -->
    <zk-confetti-canvas />

    <!-- 静态 例子 -->
    <zk-chart
      ref="refChart"
      :myOption="chartLineData2"
      :myStyle="{ width: '100%', height: '280px' }"
    ></zk-chart>

    <!-- 模拟接口 例子 -->
    <zk-chart
      ref="refChart"
      :myOption="chartLineData"
      :myStyle="{ width: '100%', height: '280px' }"
      v-if="Flag"
    ></zk-chart>
    <!-- 骨架屏   -->
    <el-skeleton
      v-else
      :rows="5"
      :animated="true"
      style="margin: 10px auto; width: 90%; height: 500px"
    />
  </div>
</template>

<script setup lang="ts">
// 工具插件
import { debounceRest, isEvenOrOdd, isType } from "vue3-directive-tools";
// 加密插件
const encryptionPlugin = inject("encryptionPlugin") as EncryptionPlugin;
// 彩蛋函数
import { showConfetti } from "@/utils/confetti/confetti";

// 模拟接口、静态ECharts数据
import { chartLineData, chartLineData2 } from "./part-components/chart-line";
//接口是否请求完（ 等待接口请求完毕在传值到子组件）防止白屏
const Flag = ref<boolean>(false);

const getCurveData = () => {
  // 正式接口
  // service({
  //   url: "/api/curve",
  //   method: "get",
  // }).then((res) => {
  //   chartLineData.xAxis.data = res.data.xAxis;
  //   chartLineData.series[0].data = res.data.series;
  //   Flag.value = true;
  // });

  // 模拟接口 一秒钟后直接赋值给ECharts
  setTimeout(() => {
    chartLineData.xAxis.data = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];
    chartLineData.series[0].data = [820, 932, 901, 934, 1290, 1330, 1320];
    chartLineData.title.text = "折线图模拟接口数据";
    Flag.value = true;
    setTimeout(() => {
      showConfetti(4, { x: 0.9, y: 0.6 });
    }, 1000);
  }, 1000);
};

const handClick = debounceRest((varStr: string) => {
  const encryptedData = encryptionPlugin.encryptData("1334132303@qq.com"); // 加密
  const decryptedData = encryptionPlugin.decryptData(encryptedData); // 解密
  console.log("加密 🚀 ==>:", encryptedData);
  console.log("解密 🚀 ==>:", decryptedData);
  console.log("防抖 🚀 ==>:", varStr);
  console.log("判断奇数偶数 🚀 ==>:", isEvenOrOdd(-0.3));
  console.log("判断类型 🚀 ==>:", isType({}));
}, 250);

onMounted(() => getCurveData());
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  box-sizing: border-box;
}
</style>
