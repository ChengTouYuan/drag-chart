<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import DragCharts from './components/DragCharts.vue'
</script>

<template>
  <drag-charts></drag-charts>
</template>

<style>
#app{
  background-color: #ccc;
  height: 100%;
  width: 100%; 
}

/* 整个滚动条 */
::-webkit-scrollbar {
    /* 对应纵向滚动条的宽度 */
    width: 10px;
    /* 对应横向滚动条的宽度 */
    height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: #E4E6EB;
    border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #FFFFFF;
    border-radius: 32px;
}

</style>
