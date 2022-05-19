import { createStore } from "vuex";

export default createStore({
  // 声明变量
  state: {
    allComponent:[],
    allOption:[],
    config: [], //用于起初控制渲染
    option: {}, //中转option  一次性渲染页面时，这就是确定当前option个的位置
    componentInstance:[],
    currId:""
  },
  //
  // 修改变量（state不能直接赋值修改，只能通过mutations）
  mutations: {
    // 参数一：state，参数二：新值
    pushToAllC(state, value) {
      state.allComponent.push(value);
    },
    pushToAllO(state, value) {
      state.allOption.push(value);
    },
    setAllC(state, value) {
      state.allComponent = value;
    },
    setAllO(state, value) {
      state.allOption = value;
    },
    updateO(state, value) {
      let index = state.allOption.findIndex((item) => {
        return item.id == value.id;
      });
      if (!value["delete"]) {
        // let newV={...state.allOption[index],...value};
        // state.allOption.splice(index, 1, newV);
        state.allOption[index]={...state.allOption[index],...value}
      } else {
        state.allOption.splice(index, 1);
        state.allComponent.splice(index, 1);//删除的话，把组件也同步删除了
      }
    },

    setOption(state,value){
      state.option=value;
    },
    setCompInstance(state,value){
      state.componentInstance[value[0]]=value[1]
    },
    setCurrId(state,value){
      state.currId=value;
    },
  },
  // mutations的值由actions传入
  actions: {},
  modules: {},
});
