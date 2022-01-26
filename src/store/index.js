import { createStore } from "vuex";

export default createStore({
  // 声明变量
  state: {
    config: [], //用于起初控制渲染
    option: {}, //中转option  一次性渲染页面时，这就是确定当前option个的位置
  },
  //
  // 修改变量（state不能直接赋值修改，只能通过mutations）
  mutations: {
    // 参数一：state，参数二：新值
    pushConfig(state, value) {
      state.config.push(value);
    },
    setConfig(state, value) {
      state.config = value;
    },
    updateConfig(state, value) {
      let index = state.config.findIndex((item) => {
        return item.id == value.id;
      });
      if (!value["delete"]) {
        state.config.splice(index, 1, value);
      } else {
        state.config.splice(index, 1);
      }
    },

    setOption(state,value){
      state.option=value;
    },
    
  },
  // mutations的值由actions传入
  actions: {},
  modules: {},
});
