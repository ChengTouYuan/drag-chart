

<template>
  <div class="setting">
   <div v-for="(value,key,index) in config" :key="index" >
     <span>{{key}}</span>
      <div v-for="(v,k,index) in value" :key="index" class="item">
         <span>{{k}}:</span><a-input  v-model="value[key]" /></div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
//点击图表。将component传入，然后在这边配置参数，弄好后再返回component
//让画布去渲染
 const value1 = ref<string>('0571');
 const config =ref( {
   data:{
     name:"",
     value:""
   },
   style:{
     title:""
   }
 })

</script>

<style lang="scss" scoped>
.setting{
  background-color: #fff;
}
</style>
