/**
 * @description 防抖指令
 * @param {function} value - 回调函数
 * @description 按钮防抖指令，可自行扩展至input,
 * 什么是防抖：在一定时间间隔内，只执行最后一次触发的函数。当事件频繁触发时，防抖会取消之前的触发操作，只执行最后一次触发的操作。与节流不同的是，防抖只会执行最后一次触发的操作。节流则一定时间间隔内，只执行一次函数。
 * @example <el-button type="primary" v-debounce="debounceClick">防抖按钮 (0.5秒后执行)</el-button>
            <el-input
                v-debounce="debounceInput"
                v-model.trim="iptVal"
                placeholder="防抖输入框 (0.5秒后执行)"
                style="width: 200px"
            />
 * @author zk
 * @createDate 2023/06/26 17:20:44
 * @lastFixDate 2023/06/26 17:51:44
 */
import type { Directive, DirectiveBinding } from 'vue';
interface ElType extends HTMLElement {
	__handleClick__: () => any;
}
const debounce: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		if (typeof binding.value !== 'function') {
			throw 'callback must be a function';
		}
		let timer: number | null = null;
		el.__handleClick__ = function () {
			if (timer) {
				clearInterval(timer);
			}
			timer = setTimeout(() => {
				binding.value();
			}, 500);
		};
		el.addEventListener('click', el.__handleClick__);
		el.addEventListener('input', el.__handleClick__);
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener('click', el.__handleClick__);
		el.removeEventListener('input', el.__handleClick__);
	},
};

export default debounce;
