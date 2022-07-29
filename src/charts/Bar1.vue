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
//利用统一的配置，来更改option
// const props = defineProps({
//   option: Object,
// });
let myChart = ref(null);
const pipe = ref(null);
/**
 * interface option{
 *  id:string,
 * height:number,
 * left:number,
 * top:number,
 * width:number
 * }
 */
let dragOption = ref(null);

const dragbox = ref(null);

// let a=JSON.stringify(data);
// let setOption = props.option["setting"];

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
  // if(!dragOption.value){
  const { id } = opt;
  dragOption.value = { id: id };
  // }else{
  data.setting.style = { ...data.setting.style, ...opt.setting.style };
  data.setting.data = opt.setting.data ? opt.setting.data : data.setting.data;
  setBar(data);
  // }

  // store.commit("setOption",opt);
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
  let x = [];
  let y = [];
  data.setting.data.value.forEach((item) => {
    x.push(item.name);
    y.push(item.value);
  });
  let option = {
    title: {
      text: data.setting.style.title,
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
      data: x,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: y,
        type: "bar",
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
