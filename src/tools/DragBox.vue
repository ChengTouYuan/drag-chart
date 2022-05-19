<template>
  <div ref="box" class="box" style="z-index: 1"  v-on:click.right.prevent="rightClick" >
    <div ref="chart" class="slot-canvas">
      <slot></slot>
    </div>
    <span class="r"></span>
    <span class="l"></span>
    <span class="t"></span>
    <span class="b"></span>
    <span class="br"></span>
    <span class="bc"></span>
    <span class="bl"></span>
    <span class="lc"></span>
    <span class="tl"></span>
    <span class="tc"></span>
    <span class="tr"></span>
    <span class="rc"></span>
    <div ref="inner" class="inner"></div>
  </div>
</template>
<script  setup>
import { onMounted, ref, defineEmits, watch,defineExpose } from "vue";
import { useStore } from "vuex";
const props=defineProps({
  option:Object
})
const box = ref(null);
const chart = ref(null);
const inner = ref(null);
const emit = defineEmits(["resize"]);
let returnData = {};
let curr;
let id;
const opt=ref({})

watch(()=>props.option,
(curr,prev)=>{
  console.log(curr,"setBox") 
  if(curr.id){
    opt.value=store.state.allOption.find(item=>{
      return curr.id==item.id;
    })
    setBox();
    emit("resize", {});
  }

})

const store = new useStore();

const getBoundingRect = (w, h, t, l) => {
  returnData["width"] = w;
  returnData["height"] = h;
  returnData["top"] = t;
  returnData["left"] = l;
curr={...opt.value,...returnData};
store.commit("updateO", curr);//更新配置 改变全局
// store.commit("setOption",curr);//点击获取当前配置 setting
store.commit("setCurrId",curr.id)


};

const setBox=()=>{
  let canvas = document.getElementById("canvas");
  let boxs = canvas.querySelectorAll(".box");
  let oDiv = box.value;
  let innerDiv = inner.value;
  // oDiv.style.cssText += `top: ${store.state.option.top}px; 
  // left: ${store.state.option.left}px;
  // width:${store.state.option.width}px;
  // height:${store.state.option.height}px`; 
    oDiv.style.cssText += `top: ${opt.value.top}px; 
  left: ${opt.value.left}px;
  width:${opt.value.width}px;
  height:${opt.value.height}px`; 
  oDiv.setAttribute("id", opt.value.id);
  let canvasRect = canvas.getBoundingClientRect();
  let aSpan = oDiv.getElementsByTagName("span");
  for (let i = 0; i < aSpan.length; i++) {
    dragFn(aSpan[i], oDiv, canvasRect);
  }
  getBoundingRect(
    oDiv.offsetWidth,
    oDiv.offsetHeight,
    oDiv.offsetTop,
    oDiv.offsetLeft
  );
    oDiv.onmousedown = function (ev) {
    var oevent = ev || event;
    oevent.preventDefault();
    var distanceX = oevent["clientX"] - oDiv.offsetLeft;
    var distanceY = oevent["clientY"] - oDiv.offsetTop;
    document.onmousemove = function (ev) {
      var oevent = ev || event;
      if (oevent["clientX"] - distanceX < 0) {
        oDiv.style.left = 0 + "px";
      } else if (
        oevent["clientX"] - distanceX + oDiv.offsetWidth >
        canvasRect.width
      ) {
        oDiv.style.left = canvasRect.width - oDiv.offsetWidth + "px";
      } else {
        oDiv.style.left = oevent["clientX"] - distanceX + "px";
      }

      if (oevent["clientY"] - distanceY < 0) {
        oDiv.style.top = 0 + "px";
      } else if (
        oevent["clientY"] - distanceY + oDiv.offsetHeight >
        canvasRect.height
      ) {
        oDiv.style.top = canvasRect.height - oDiv.offsetHeight + "px";
      } else {
        oDiv.style.top = oevent["clientY"] - distanceY + "px";
      }
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      getBoundingRect(
        oDiv.offsetWidth,
        oDiv.offsetHeight,
        oDiv.offsetTop,
        oDiv.offsetLeft
      );
    };
  };
}

const rightClick=(e)=>{
  //右键选项添加 hook 待添加！！！
  // debugger
  console.log(curr.id,e.target)
  store.commit("updateO", {...curr,...{delete:true}});

}

onMounted(() => {
// setBox();
});

function dragFn(obj, oDiv, canvasRect) {
  obj.onmousedown = function (ev) {
    let oEv = ev || event;
    oEv.stopPropagation();
    let oldWidth = oDiv.offsetWidth;
    let oldHeight = oDiv.offsetHeight;
    let oldX = oEv["clientX"];
    let oldY = oEv["clientY"];
    let oldLeft = oDiv.offsetLeft;
    let oldTop = oDiv.offsetTop;

    document.onmousemove = function (ev) {
      let oEv = ev || event;
      let disY = oldTop + (oEv["clientY"] - oldY),
        disX = oldLeft + (oEv["clientX"] - oldLeft);
      if (disX > oldLeft + oldWidth) {
        disX = oldLeft + oldWidth;
      }
      if (disY > oldTop + oldHeight) {
        disY = oldTop + oldHeight;
      }
      if (obj.className == "tl") {
        oDiv.style.width =
          disX < 0 ? oldWidth : oldWidth - (oEv["clientX"] - oldX) + "px";
        oDiv.style.height =
          disY < 0 ? oldHeight : oldHeight - (oEv["clientY"] - oldY) + "px";

        oDiv.style.left = disX < 0 ? 0 : disX + "px";
        oDiv.style.top = disY < 0 ? 0 : disY + "px";
      } else if (obj.className == "bl") {
        oDiv.style.width =
          disX < 0 ? oldWidth : oldWidth - (oEv["clientX"] - oldX) + "px";
        // oDiv.style.height = oldHeight + (oEv['clientY'] - oldY) + 'px';

        if (oldTop + oldHeight + (oEv["clientY"] - oldY) > canvasRect.height) {
          oDiv.style.height = canvasRect.height - oldTop + "px";
        } else {
          oDiv.style.height = oldHeight + (oEv["clientY"] - oldY) + "px";
        }
        oDiv.style.left = disX < 0 ? 0 : disX + "px";
        oDiv.style.bottom = oldTop + (oEv["clientY"] + oldY) + "px";
      } else if (obj.className == "tr") {
        // oDiv.style.width = oldWidth + (oEv['clientX'] - oldX) + 'px';
        if (oldLeft + oldWidth + (oEv["clientX"] - oldX) > canvasRect.width) {
          oDiv.style.width = canvasRect.width - oldLeft + "px";
        } else {
          oDiv.style.width = oldWidth + (oEv["clientX"] - oldX) + "px";
        }
        oDiv.style.height =
          disY < 0 ? oldHeight : oldHeight - (oEv["clientY"] - oldY) + "px";
        oDiv.style.right = oldLeft - (oEv["clientX"] - oldX) + "px";
        oDiv.style.top = disY < 0 ? 0 : disY + "px";
      } else if (obj.className == "br") {
        //左边距+（原始宽度 + （屏幕的X点 - 原先的X轴，得到增加的宽度）
        if (oldLeft + oldWidth + (oEv["clientX"] - oldX) > canvasRect.width) {
          oDiv.style.width = canvasRect.width - oldLeft + "px";
        } else {
          oDiv.style.width = oldWidth + (oEv["clientX"] - oldX) + "px";
        }

        if (oldTop + oldHeight + (oEv["clientY"] - oldY) > canvasRect.height) {
          oDiv.style.height = canvasRect.height - oldTop + "px";
        } else {
          oDiv.style.height = oldHeight + (oEv["clientY"] - oldY) + "px";
        }
        oDiv.style.right = oldLeft - (oEv["clientX"] - oldX) + "px";
        oDiv.style.bottom = oldTop + (oEv["clientY"] + oldY) + "px";
      } else if (obj.className == "tc") {
        oDiv.style.height =
          disY < 0 ? oldHeight : oldHeight - (oEv["clientY"] - oldY) + "px";

        oDiv.style.top = disY < 0 ? 0 : disY + "px";
      } else if (obj.className == "bc") {
        // oDiv.style.height = oldHeight + (oEv['clientY'] - oldY) + 'px';
        if (oldTop + oldHeight + (oEv["clientY"] - oldY) > canvasRect.height) {
          oDiv.style.height = canvasRect.height - oldTop + "px";
        } else {
          oDiv.style.height = oldHeight + (oEv["clientY"] - oldY) + "px";
        }
        oDiv.style.bottom = disY + "px";
      } else if (obj.className == "lc") {
        oDiv.style.height = oldHeight + "px";
        oDiv.style.width =
          disX < 0 ? oldWidth : oldWidth - (oEv["clientX"] - oldX) + "px";
        oDiv.style.left = disX < 0 ? 0 : disX + "px";
      } else if (obj.className == "rc") {
        oDiv.style.height = oldHeight + "px";
        // oDiv.style.width = oldWidth + (oEv['clientX'] - oldX) + 'px';
        if (oldLeft + oldWidth + (oEv["clientX"] - oldX) > canvasRect.width) {
          oDiv.style.width = canvasRect.width - oldLeft + "px";
        } else {
          oDiv.style.width = oldWidth + (oEv["clientX"] - oldX) + "px";
        }
        oDiv.style.right = disX + "px";
      }
      emit("resize", {});
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      getBoundingRect(
        oDiv.offsetWidth,
        oDiv.offsetHeight,
        oDiv.offsetTop,
        oDiv.offsetLeft
      );
    };
    return false;
  };
}
</script>
<style lang="scss" scoped>
.box {
  position: absolute;
  cursor: move;
  .slot-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  /*四边*/
  .t,
  .b,
  .l,
  .r {
    position: absolute;
    z-index: 1;
    background: #666;
  }

  .l,
  .r {
    width: 1px;
    height: 100%;
    /* cursor: col-resize; */
  }
  .t,
  .b {
    width: 100%;
    height: 1px;
    /* cursor: row-resize; */
  }
  .t {
    top: 0;
  }
  .b {
    bottom: 0;
  }
  .l {
    left: 0;
  }
  .r {
    right: 0;
  }
  /*四角*/
  .tl,
  .bl,
  .br,
  .tr,
  .lc,
  .tc,
  .rc,
  .bc {
    width: 10px;
    height: 10px;
    position: absolute;
    background: #fff;
    border: 1px solid #666;
    z-index: 2;
  }
  .tl,
  .bl,
  .br,
  .tr {
    cursor: nwse-resize;
  }
  .tc,
  .bc {
    cursor: n-resize;
    left: calc(50% - 5px);
  }
  .tc {
    top: -5px;
  }
  .bc {
    bottom: -5px;
  }
  .lc,
  .rc {
    cursor: e-resize;
    top: calc(50% - 5px);
  }
  .lc {
    left: -5px;
  }
  .rc {
    right: -5px;
  }

  .tl,
  .bl {
    left: -5px;
  }
  .tr,
  .br {
    right: -5px;
  }
  .br,
  .bl {
    bottom: -5px;
  }
  .tl,
  .tr {
    top: -5px;
  }
  .tr,
  .bl {
    cursor: nesw-resize;
  }

  /*内核*/
  .inner {
    width: 100%;
    height: 100%;
    // position: absolute;
  }
}

#canvas {
  position: relative;
  width: 90vw;
  height: 90vh;
  border: 1px solid #000;
  margin: 10px;
}
.value {
  position: absolute;
}
</style>
