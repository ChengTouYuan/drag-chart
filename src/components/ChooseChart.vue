<template>
  <div class="choose-chart">
    <span
      v-for="(item, index) of componentsConfig"
      @click="chooseChart(item.name, true)"
      :key="index"
      >{{ item.mean }}</span
    >
  </div>
</template>

<script setup>
import { defineEmits, watch, ref, nextTick } from "vue";
import componentsConfig from "../config/componentsConfig";
import { useStore } from "vuex";
// const componentsConfig = [
//   {
//     name: "pipe1",
//     mean:"饼图1",
//     component: Pipe1,
//   },
// ];

// const emit = defineEmits(["getConfig"]);
let config = [];
const store = new useStore();
const getConfig = JSON.parse(localStorage.getItem("chartSetting"));
const chooseChart = (type, isNew) => {
  if (isNew) {
    let component = componentsConfig.find((item) => {
      return item.name == type;
    });
    let len = store.state.config.length;
    component = {
      ...component,
      ...{ top: 100 + len * 10, left: 100 + len * 10 },
    };
    // debugger
    // setTimeout(()=>{
      store.commit("setOption", component);
      store.commit("pushConfig");
    // })
    // emit("getConfig", component);
  } else {
    setTimeout(()=>{
      store.commit("setNewOption", type);
    })
    // store.state.option;
    // // debugger
    // emit("getConfig", type);
  }
};

if(getConfig){
  getConfig.forEach((item) => {
  componentsConfig.forEach((e) => {
    if (item.name == e.name) {
      item["component"] = e["component"];
      chooseChart(item);
    }
  });
});
store.commit("pushConfig", getConfig);
}
</script>

<style lang="scss" scoped>
.choose-chart {
  background-color: #fff;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    color: #1490df;
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>
