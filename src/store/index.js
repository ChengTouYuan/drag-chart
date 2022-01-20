import { createStore } from "vuex";

export default createStore({
  // 声明变量
  state: {
    config: [], //用于起初控制渲染
    option: {}, //中转option
    finallyConfig: [], //用于保存最终保存结果时候的数据
  },
  //
  // 修改变量（state不能直接赋值修改，只能通过mutations）
  mutations: {
    // 参数一：state，参数二：新值
    pushConfig(state, value) {
      if (value) {
        state.config = value;
      } else {
        state.config.push(state.option);
      }
    },
    pushFinally(state, newValue) {
      state.finallyConfig.push(newValue);
    },
    updateFinally(state, newValue) {
      let index = state.finallyConfig.findIndex((item) => {
        return item.id == newValue.id;
      });
      if (index != -1) {
        state.finallyConfig[index] = {
          ...state.finallyConfig[index],
          ...newValue,
        };
      } else {
        state.finallyConfig.push(newValue);
      }
    },
    setOption(state, newValue) {
      state.option = { ...state.option, ...newValue };
    },
    setNewOption(state, newValue) {
      state.option = {};
      state.option = { ...state.option, ...newValue };
    },
  },
  // mutations的值由actions传入
  actions: {},
  modules: {},
});
