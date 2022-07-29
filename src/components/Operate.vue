

<template>
  <div class="operate">
    <span @click="save">保存</span>
      |
     <span @click="downLoadAsHtml">下载</span>
  </div>
</template>

<script setup>
import {ref, watch} from "vue"
import {useStore} from "vuex"
import { message } from 'ant-design-vue';
import downLoadHtml from "../save-as-html/dowonLoad"
const store=new useStore();
const config=ref(store.state.allOption);
const success = () => {
      message.success('保存成功！');
    };

const save=()=>{
//   config.forEach(item=>{
//   delete item.component
// })
 const confStr=JSON.stringify(config.value);
  localStorage.setItem("chartSetting",confStr);
  success();

  return confStr;
}

const downLoadAsHtml=()=>{
  let configStr=save();
  let str = downLoadHtml(configStr);
  download( +new Date()+".html", str);
}

 const download=(filename, text) =>{
    let pom = document.createElement("a");
    pom.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    pom.setAttribute("download", filename);
    if (document.createEvent) {
      let event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
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
    margin:0 5px;
  }
}
</style>
