<template>
  <drag-box ref="dragbox" @resize="resize" :option="dragOption">
    <div ref="pipe" class="pipe"></div>
  </drag-box>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import DragBox from "../tools/DragBox.vue";
import * as echarts from "echarts";
import { nextTick, onMounted } from "@vue/runtime-core";
import { defineProps, watch } from "vue";
import { useStore } from "vuex";

//利用drag box组件标识是哪一个组件
let myChart = ref(null);
const pipe = ref(null);
let dragOption = ref(null);

const dragbox = ref(null);

let data = {
  id: {},
  setting: {
    style: {
      title: "标题",
    },
    data: {
      value: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  },
};
const optionSet = (opt) => {
  console.log(opt, "option");
  const { id } = opt;
  dragOption.value = { id: id };
  data.setting.style = { ...data.setting.style, ...opt.setting.style };
  data.setting.data = opt.setting.data ? opt.setting.data : data.setting.data;
  setBar(data);
};

defineExpose({
  optionSet,
});

onMounted(() => {
  data.id = pipe.value;
  setBar(data);
});
const resize = (value) => {
  myChart.resize();
};

const setBar = (data) => {
  console.log(data.setting.style.title, "title");
  let option = {
    title: {
      text: data.setting.style.title,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data.setting.data.value,
      },
    ],
  };
  myChart = echarts.init(data.id);
  myChart.setOption(option);
};
</script>
<style lang="scss" scoped>
#canvas {
  background-color: #fff;
  position: relative;
  .pipe {
    width: 100%;
    height: 100%;
  }
}
</style>
