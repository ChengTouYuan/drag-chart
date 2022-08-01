<template>
<drag-box ref="dragbox" @resize="resize" :option="dragOption">
  <div ref="chart" class="chart"></div>
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
const chart = ref(null);
let dragOption = ref(null);
const dragbox = ref(null);

let data = {
id: {},
setting: {
  style: {
    title: "标题",
  },
  data: {
    value: [],
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
data.id = chart.value;
setBar(data);
});
const resize = (value) => {
myChart.resize();
};

const setBar = (data) => {
  //echarts图表代码
console.log(data.setting.style.title, "title");
let option = {};
myChart = echarts.init(data.id);
myChart.setOption(option);
};
</script>
<style lang="scss" scoped>
#canvas {
background-color: #fff;
position: relative;
.chart {
  width: 100%;
  height: 100%;
}
}
</style>
