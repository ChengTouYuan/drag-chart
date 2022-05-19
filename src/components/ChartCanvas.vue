<template>
  <div id="canvas" >
    <template v-for="(item,index) of components"  :key="index" >
          <component :is="item.component" :ref="(el) => setrefsFun(el, index)" ></component>
      </template>
    <!-- <template v-for="item of components" :key="item.id">
      <Pipe1 v-if="item.name == 'pipe1'" :option="item" ></Pipe1>
      <Bar1 v-if="item.name == 'bar1'" :option="item"></Bar1>
    </template> -->
    <!-- <Pipe1 v-if="components.length!==0" :option="components[0]" ref="pieDom"></Pipe1> -->
  </div>
</template>

<script setup>
import { watch, defineProps, ref, nextTick, onMounted,reactive } from "vue";
import { useStore } from "vuex";


const store = new useStore(); 

let components = ref(store.state.allComponent);

let refBtns = reactive({});
const setrefsFun = (el, item) => {
        if (el) {
          refBtns[item] = el;
          store.commit('setCompInstance', [item,el])
          // debugger
          // console.log(el.optionSet({"title":"服气"}));//调用子组件内部方法
          
          console.log( refBtns,"setRef")
          // debugger
          //  console.log(refBtns[0].optionSet({"zzzxx":"yyzxzx"}));

          //  console.log("look")
          //  refBtns[0].__vnode.children[0].component.setupState.optionSet({"xx":"yy"})
          //  console.log(refBtns[0].__vnode.children[0].component.devtoolsRawSetupState.optionSet,"look")
        }
      }
      
// .children[0].component.devtoolsRawSetupState

  
watch(()=>refBtns,
(curr,prev)=>{
  // console.log(curr,prev)
  // console.log(components.value.length)
  // debugger
  const stackTop=components.value.length-1;
  curr[stackTop].optionSet(store.state.allOption[stackTop])
  // debugger
  //  for(let i=0;i<components.value.length;i++){
  //           curr[i].optionSet(store.state.allOption[i])
  //     }
},{deep:true})


watch(()=>store.state.allComponent,
(curr,prev)=>{
  components.value = store.state.allComponent;

  console.log(store.state.allComponent,"allComponent")
  // debugger 
  // const childc=store.state.config[0].component;
  // let a=childc.setup.fatherSet;
  // debugger
  // childc.setup().fatherSet({xx:"sdsd"})
  // debugger
  
},{
  deep:true 
}
)

watch(()=>store.state.allOption, 
(curr,prev)=>{
  console.log(curr,"allOption")
  
},{
  deep:true 
}
)

watch(()=>store.state.componentInstance, 
(curr,prev)=>{
  console.log(curr,"componentInstance")
  
},{
  deep:true 
}
)

// watch(()=>store.state.option, 
// (curr,prev)=>{
  
//   let index=store.state.allOption.findIndex(item=>{
//     return item.id==curr.id;
//   })
//   // debugger
//    console.log(curr,"globalOption")
//   // refBtns[index].optionSet(curr);
 
  
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
