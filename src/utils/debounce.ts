/**
 * 防抖函数，用于限制某个函数在一段时间内只能被调用一次
 * @param  A 函数的参数
 * @param  R 函数的返回值
 * @param { function } fn 要执行的函数
 * @param { number } delay 延迟的时间，以毫秒为单位
 * @example
 * 1: <el-button type="success" @click="onDbo(666)">测试防抖</el-button>
 * 2: import { debounce } from "@/utils/debounce";
 * 3：const onDbo = debounce( (num: number) {
 *     console.log("😂👨🏾‍❤️‍👨🏼==>：", "测试防抖", num);
 *    }, 250);
 * @returns {(...args: A) => void} 返回一个新的函数，该函数具有防抖效果 !!!
 */
export function debounce<A extends any[], R>(
  fn: (...args: A) => R,
  delay = 250
) {
  let timer: NodeJS.Timeout | null = null;

  /**
   * 新的函数，具有防抖效果
   * @param args 函数的参数
   * Q: 为什么要使用箭头函数？
   * A: 箭头函数没有自己的this，所以箭头函数中的this就是外层代码块的this
   */
  return function (...args: A) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(fn, args), delay);
  };
}
