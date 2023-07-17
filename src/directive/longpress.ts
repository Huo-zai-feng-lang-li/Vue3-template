/**
 * @description  长按指令
 * @param {function} value - 回调函数
 * @example :
 *   <template>
 *   	<div class="card content-box">
 *   		<span class="text">长按指令 🍇🍇🍇🍓🍓🍓</span>
 *   		<el-button type="primary" v-longpress="longpress">长按2秒触发事件</el-button>
 *   	</div>
 *   </template>
 *
 *   <script setup lang="ts" name="longpressDirect">
 *   import { ElMessage } from "element-plus";
 *   const longpress = () => {
 *   	ElMessage.success("长按事件触发成功 🎉🎉🎉");
 *   };
 *   </script>
 * @author zk
 * @createDate 2023/06/26 17:34:03
 * @lastFixDate 2023/06/26 17:34:03
 */
import type { Directive, DirectiveBinding } from "vue";

const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof binding.value !== "function") {
      throw "callback must be a function";
    }
    // 定义变量
    let pressTimer: any = null;
    // 创建计时器（ 2秒后执行函数 ）
    const start = (e: any) => {
      if (e.button) {
        if (e.type === "click" && e.button !== 0) {
          return;
        }
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler(e);
        }, 1000);
      }
    };
    // 取消计时器
    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    // 运行函数
    const handler = (e: MouseEvent | TouchEvent) => {
      binding.value(e);
    };
    // 添加事件监听器
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    // 取消计时器
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  },
};

export default directive;
