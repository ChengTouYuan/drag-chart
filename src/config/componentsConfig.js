import Pipe1 from "../charts/Pipe1.vue";
import Bar1 from "../charts/Bar1.vue"
const componentsConfig = [
  {
    name: "pipe1",
    mean:"饼图1",
    component: Pipe1,
    width:300,
    height:300
  },{
    name: "bar1",
    mean:"堆叠柱状图",
    component: Bar1,
    width:500,
    height:300
  },
];
export default componentsConfig