<template>
  <div class="choose-chart">
    <span
      v-for="item of components"
      @click="chooseChart(item.name)"
      :key="item.name"
      >{{ item.mean }}</span
    >
  </div>
</template>

<script setup>
import { createApp } from "vue";
import components from "../config/componentsConfig";
import optConfig from "../config/optionsConfig.js";
import { useStore } from "vuex";
import tools from "../tools/help.js";
import { nextTick } from "vue";

const store = new useStore();
const getConfig = JSON.parse(localStorage.getItem("chartSetting"));
const chooseChart = (name, id = "") => {
  const opts = JSON.parse(JSON.stringify(optConfig));

  let component = components.find((item) => {
    return item.name == name;
  });
  if (id) {
    store.commit("pushToAllC", component);
    return;
  }
  let option = opts.find((item) => {
    return item.name == name;
  });

  let len = store.state.allComponent.length;
  component = { ...component, ...{ id: "chart-" + tools.randomString(5) } };
  option = {
    ...option,
    ...{ top: 100 + len * 10, left: 100 + len * 10, id: component["id"] },
  };

  store.commit("pushToAllC", component);
  store.commit("pushToAllO", option); 
};

if (getConfig) {
  //如果是从后端调取，或者从本地取，直接设置allcomponent  记得设置 alloption
  store.commit("setAllO", getConfig);
  // console.log(JSON.stringify(getConfig))
  nextTick(() => { //循环push component  必须使用nextTick
    getConfig.forEach((item) => {
      chooseChart(item.name, item.id);
    });
  });
  //设置allOption
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
