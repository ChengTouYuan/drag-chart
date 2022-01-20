

<template>
  <div class="operate">
    <span @click="save">保存</span>
  </div>
</template>

<script setup>
import {ref, watch} from "vue"
import {useStore} from "vuex"
import { message } from 'ant-design-vue';
const store=new useStore();
const config=store.state.finallyConfig;
const success = () => {
      message.success('保存成功！');
    };
const save=()=>{
  config.forEach(item=>{
  delete item.component
})
  console.log(JSON.stringify(config))
  localStorage.setItem("chartSetting",JSON.stringify(config))
  success()
}


</script>
<style lang="scss" scoped>
.operate{
  background-color: #fff;
  padding: 0 10px;
  border-left:1px solid #5470C6 ;
  display: flex;
  justify-content: center;
  align-items: center; 
  >span{
    cursor: pointer;
    color: #1490df;
  }
}
</style>
