

<template>
    <drag-box  @resize="resize" >
      <div ref="pipe" class="pipe"></div>
    </drag-box>
</template>

<script  setup>
import { ref } from "@vue/reactivity"
import DragBox from "../tools/DragBox.vue"
import * as echarts from 'echarts'
import { onMounted } from "@vue/runtime-core";
import {defineProps} from "vue"
import { useStore } from  'vuex'

//利用drag box组件标识是哪一个组件
//利用统一的配置，来更改option
const props=defineProps({
  data: String
})
// const store=new useStore();
// console.log(store.state.option); 
// debugger

let myChart=ref(null);
const pipe=ref(null);

onMounted(()=>{
  setBar();
})
const resize=(value)=>{
  myChart.resize()
}


function setBar(){
	let option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};
myChart=echarts.init(pipe.value)
myChart.setOption(option)
}	
</script>
<style lang="scss" scoped>
#canvas{
  background-color: #fff;
  position: relative;
 .pipe{
   width: 100%;
   height: 100%;
 }
}
</style>
