/**
* @description 节流指令
    需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。
    思路：
        1、第一次点击，立即调用方法并禁用按钮，等延迟结束再次激活按钮
        2、将需要触发的方法绑定在指令上
    什么是节流：是指在一定时间间隔内，只执行一次函数。当事件频繁触发时，节流会将多次触发的事件合并为一次执行。
* @example :
*    <template>
*        <div class="card content-box">
*            <span class="text">节流指令 🍇🍇🍇🍓🍓🍓</span>
*            <el-button type="primary" v-throttle="throttleClick">节流按钮 (每隔1S秒后执行)</el-button>
*        </div>
*    </template>
*    
*    <script setup lang="ts" name="throttleDirect">
*    import { ElMessage } from "element-plus";
*    const throttleClick = () => {
*        ElMessage.success("我是节流按钮触发的事件 🍍🍓🍌");
*    };
*    </script>
* @author zk
* @createDate 2023/06/26 17:31:09
* @lastFixDate 2023/06/26 17:31:09
*/
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  __handleClick__: () => any;
  disabled: boolean;
}
const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== "function") {
      throw "callback must be a function";
    }
    let timer: NodeJS.Timeout | null = null;
    el.__handleClick__ = function () {
      if (timer) {
        clearTimeout(timer);
      }
      if (!el.disabled) {
        el.disabled = true;
        binding.value();
        timer = setTimeout(() => {
          el.disabled = false;
        }, 1000);
      }
    };
    el.addEventListener("click", el.__handleClick__);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

export default throttle;
