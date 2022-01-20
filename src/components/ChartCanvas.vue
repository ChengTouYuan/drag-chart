

<template>
  <div id="canvas">
    
      <template v-for="(item,index) of components" :key="index">
        <component :is="item.component" ></component>
      </template>
     <!-- <template  v-for="(item,index) of components" :key="index">
        <Pipe1 v-if="item.name=='pipe1'"></Pipe1>
        <Bar1  v-if="item.name=='bar1'"></Bar1>

     </template> -->
  </div>
</template>

<script setup>
import Pipe1 from "../charts/Pipe1.vue";
import Bar1 from "../charts/Bar1.vue"
import { watch ,defineProps, ref,} from "vue"
import { useStore} from "vuex"
import componentsConfig from "../config/componentsConfig";

let components=ref([]);
const store = new useStore();

let count=0;
watch( 
  () => store.state.option,
  (curr, prev) => {
    // debugger
  components.value.push(store.state.option);
  console.log("变化",count++,store.state.option)
  }, 
  {deep: true}
)

// setInterval(()=>{
//  console.error(store.state.finallyConfig)
// },3000)
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
