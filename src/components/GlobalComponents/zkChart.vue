<template>
  <div :id="uid" :style="myStyle"></div>
</template>

<script setup lang="ts" name="zwEcharts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils/debounce";

const uid = ref<string>("");
uid.value = `echarts-uid-${parseInt((Math.random() * 1000000).toString())}`;

onMounted(() => {
  const myChart = echarts.init(
    document.getElementById(uid.value) as HTMLElement
  );

  watch(
    () => props.myOption,
    () => {
      myChart.setOption(props.myOption, {
        notMerge: true,
      });
    },
    {
      deep: true,
      immediate: true,
    }
  );

  function chartResize() {
    myChart.resize({
      animation: {
        duration: 300,
      },
    });
  }

  const resizeHandler = debounce(chartResize, 300);
  window.addEventListener("resize", resizeHandler);
  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
    myChart.dispose();
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
    type: Object,
    default: () => ({}),
    required: true,
  },
});
</script>
