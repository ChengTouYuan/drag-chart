<template>
  <div id="canvas">
    <!-- <template v-for="(item,index) of store.state.allNull" :key="index">
        <component :is="item.component" ></component>
      </template> -->
    <template v-for="item of components" :key="item.id">
      <Pipe1 v-if="item.name == 'pipe1'" :option="item"></Pipe1>
      <Bar1 v-if="item.name == 'bar1'" :option="item"></Bar1>
    </template>
  </div>
</template>

<script setup>
import Pipe1 from "../charts/Pipe1.vue";
import Bar1 from "../charts/Bar1.vue";
import { watch, defineProps, ref, nextTick, onMounted } from "vue";
import { useStore } from "vuex";

const store = new useStore(); 
let components = ref(store.state.config);

// watch(()=>store.state.config,
// (curr,prev)=>{
//   components.value = store.state.config;
//   console.log(store.state.config,"chartCanvas")
  
// },{
//   deep:true
// }
// )
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
