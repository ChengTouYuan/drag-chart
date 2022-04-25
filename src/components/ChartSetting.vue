

<template>
  <div class="setting">
   <div v-for="(value,keys,index) in config" :key="index" >
     <span>{{keys}}</span>
      <div v-for="(v,k,index) in value" :key="index" class="item">
         <span>{{k}}:</span>
         <!-- <input  v-model="value[k]" /> -->
          <a-textarea
      v-model:value="value[k]"
      placeholder="JSON"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
         </div>
      </div>

      <!-- <a-button  @click="change">确定</a-button> -->
  </div>
</template>
<script  setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
//点击图表。将component传入，然后在这边配置参数，弄好后再返回component
//让画布去渲染
//  const config =ref( {
//    data:{
//      name:"",
//      value:""
//    },
//    style:{
//      title:""
//    }
//  })

const store =new  useStore();
let config=ref(null);

watch(()=>store.state.option,
(curr,prev)=>{
  console.log(store.state.option,"settingWatch");
  // let data=store.state.option.setting.data;
  // for(let key of Object.keys(data)){
  //   data[key]=JSON.stringify(data[key]);
  // }
  config.value=store.state.option.setting;
  
},{
  deep:true
}
)
// debugger
// const change=(e)=>{
 
//   store.commit("updateConfig",store.state.option)
//    console.log(store.state.option,"change,commit",store.state.config)
//   // store.commit("setOption",config.value)
// }


</script>

<style lang="scss" scoped>
.setting{
  background-color: #fff;
}
</style>
