

<template>
  <div class="main">
   <div class="top">
     <choose-chart></choose-chart>
       <operate></operate>
   </div>
    
    <div class="canvas-setting">
      <chart-canvas></chart-canvas>
      <chart-setting></chart-setting>
    </div>
  </div>
</template>

<script setup>
import ChooseChart from "./ChooseChart.vue";
import ChartCanvas from "./ChartCanvas.vue";
import ChartSetting from "./ChartSetting.vue";
import Operate from "./Operate.vue";

import {ref, watch} from "vue"
const inConfig = ref([])




</script>
<style lang="scss" scoped>
.main{
  width: 100%;
  height: 100%;
  .top{
      display: grid;
    grid-template-columns: 1fr 300px;
  }
  .canvas-setting{
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 5px;
    margin-top: 10px;
    height: calc(100% - 55px);
  }
}
</style>
