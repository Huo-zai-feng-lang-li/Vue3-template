import { App } from "vue";
import copy from "./copy";
import waterMarker from "./waterMarker";
import draggable from "./draggable";
import debounce from "./debounce";
import throttle from "./throttle";
import longpress from "./longpress";
 
const directivesList: any = {
	copy,
	waterMarker,
	draggable,
	debounce,
	throttle,
	longpress
};
 
const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach(key => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);
		});
	}
};
 
export default directives;
 
