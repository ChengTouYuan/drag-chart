

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

  // let index=store.state.allOption.findIndex(item=>{
  //   return item.id==curr.id;
  // })
  // store.state.componentInstance[index].optionSet(curr);

// watch(()=>config,()=>{


// })

let currInstance=ref(null);
let currOption=ref(null)

watch(()=>store.state.currId,
(curr,prev)=>{
  console.log(curr,"settingWatch");
  // let data=store.state.option.setting.data;  
  // for(let key of Object.keys(data)){
  //   data[key]=JSON.stringify(data[key]);
  // }
 let index=store.state.allOption.findIndex(item=>{
    return item.id==curr;
  })
  currOption=store.state.allOption[index];
  config.value=currOption.setting;
  currInstance=store.state.componentInstance[index]
},{
  deep:true
}
)

watch(()=>config,(curr,prev)=>{
currInstance.optionSet(currOption)
},
{
  deep:true,
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
