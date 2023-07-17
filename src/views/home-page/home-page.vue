<template>
  <div
    class="container"
    v-waterMarker="{
      text: '版权所有',
      textColor: 'rgba(180, 180, 180, 0.4)',
    }"
  >
    <!-- 静态 例子 -->
    <zw-chart
      :myOption="chartLineData2"
      :myStyle="{ width: '100%', height: '280px' }"
    ></zw-chart>

    <!-- 接口例子 -->
    <zw-chart
      :myOption="chartLineData"
      :myStyle="{ width: '100%', height: '280px' }"
      v-if="Flag"
    ></zw-chart>

    <!-- 骨架屏 element-plus -->
    <el-skeleton
      v-else
      :rows="5"
      :animated="true"
      style="margin: 10px auto; width: 90%; height: 500px"
    />
  </div>
</template>

<script setup lang="ts">
// 封装好的 axios
// import service from "@/utils/request";

// 引入封装的chart组件

// import myChart from "~/myCharts.vue";

// 引入图表数据
import { chartLineData, chartLineData2 } from "./part-components/chart-line";
// console.log("😂👨🏾‍❤️‍👨🏼==>：", chartLineData, chartLineData2);

//接口是否请求完（ 等待接口请求完毕在传值到子组件）防止白屏
const Flag = ref<boolean>(false);

/* 获取数据并将接口的数据放置 chartLineData*/
const getCurveData = () => {
  // 接口 例子
  // service({
  //   url: "/api/curve",
  //   method: "get",
  // }).then((res) => {
  //   chartLineData.xAxis.data = res.data.xAxis;
  //   chartLineData.series[0].data = res.data.series;
  //   Flag.value = true;
  // });
  //
  // 静态例子模拟接口赋值操作
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
  }, 1000);
};

onMounted(() => {
  getCurveData();
});
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
./part-components/chart-line
