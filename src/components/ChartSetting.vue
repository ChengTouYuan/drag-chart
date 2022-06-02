<template>
  <div class="setting">
    <div v-for="(value, keys, index) in config" :key="index">
      <span>{{ keys }}</span>
      <div v-for="(v, k, index) in value" :key="index" class="item">
        <span>{{ k }}:</span>
        <!-- <input  v-model="value[k]" /> -->
        <a-textarea
          v-if="getType(value[k]) == 'String'"
          v-model:value="value[k]"
          placeholder="JSON"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
        <div v-if="getType(value[k]) == 'Array'" class="arr-box">
          <div v-for="(m, index) of value[k]" :key="m" class="grid-control">
            <!-- <span @click="showInput=!showInput" v-show="!showInput">{{m.name}}:</span> -->
            <a-input v-model:value="m.name" />
            <a-input v-model:value="m.value" />
            <delete-outlined
              class="delete-icon"
              @click="deleteControl(k, index)"
            />
          </div>
          <plus-circle-outlined class="add-icon" @click="addControl(k)" />
        </div>
      </div>
    </div>

    <!-- <a-button  @click="change">确定</a-button> -->
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import tools from "../tools/help";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
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

const store = new useStore();
let config = ref(null);
const getType = tools.getType;

// let index=store.state.allOption.findIndex(item=>{
//   return item.id==curr.id;
// })
// store.state.componentInstance[index].optionSet(curr);

// watch(()=>config,()=>{

// })

let currInstance = ref(null);
let currOption = ref(null);
const deleteControl = (key, deleteindex) => {
  config.value.data[key].splice(deleteindex, 1);
};
const addControl=(key)=>{
  config.value.data[key].push({value:"",name:""});
}
watch(
  () => store.state.currId,
  (curr, prev) => {
    console.log(curr, "settingWatch");
    // let data=store.state.option.setting.data;
    // for(let key of Object.keys(data)){
    //   data[key]=JSON.stringify(data[key]);
    // }
    let index = store.state.allOption.findIndex((item) => {
      return item.id == curr;
    });
    currOption = store.state.allOption[index];
    config.value = currOption.setting;
    currInstance = store.state.componentInstance[index];
  },
  {
    deep: true,
  }
);

watch(
  () => config,
  (curr, prev) => {
    currInstance.optionSet(currOption);
  },
  {
    deep: true,
  }
);
// debugger
// const change=(e)=>{

//   store.commit("updateConfig",store.state.option)
//    console.log(store.state.option,"change,commit",store.state.config)
//   // store.commit("setOption",config.value)
// }
</script>

<style lang="scss" scoped>
.setting {
  background-color: #fff;
}
.arr-box {
  display: flex;
  flex-direction: column;
  .grid-control {
    display: grid;
    grid-template-columns: 100px 1fr 10px;
    align-items: center;
    padding: 5px 10px;
    text-align: right;
    column-gap: 5px;
    .delete-icon {
      cursor: pointer;
      color: #ff4d4f;
    }
  }
  .add-icon {
    color: #409eff;
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
