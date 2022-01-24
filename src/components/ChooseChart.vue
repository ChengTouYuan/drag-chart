<template>
  <div class="choose-chart">
    <span
      v-for="(item, index) of componentsConfig"
      @click="chooseChart(item.name)"
      :key="index"
      >{{ item.mean }}</span
    >
  </div>
</template>

<script setup>
import componentsConfig from "../config/componentsConfig";
import { useStore } from "vuex";
import randomString from '../tools/help.js'

const store = new useStore();
const getConfig=JSON.parse(localStorage.getItem('chartSetting'));

const chooseChart = (name) => {
    let component = componentsConfig.find((item) => {
      return item.name == name;
    });
    let len = store.state.config.length;
    component = {
      ...component,
      ...{ top: 100 + len * 10, left: 100 + len * 10 ,id:"chart-"+randomString(5)},
    };
    // debugger chart-x重复了
    store.commit("pushConfig",component);
};

if (getConfig) {
  store.commit("setConfig", getConfig); 
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
