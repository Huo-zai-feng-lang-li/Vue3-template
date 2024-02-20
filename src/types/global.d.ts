// 申明外部 npm 插件模块
declare module "canvas-confetti";
declare module "crypto-js";
declare module "vue3-encryption-plugin";
declare module "pinia-plugin-persistedstate";
declare module "vue3-loading-plug";
declare module "vue3-directive-tools";
declare module "vue3-progress-scroll";
declare module "sortablejs";
declare module "jsplumb";

// 声明一个模块，防止引入文件时报错
declare module "*.json";
declare module "*.png";
declare module "*.jpg";
declare module "*.scss";
declare module "*.ts";
declare module "*.js";

// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// 加密解密
declare interface EncryptionPlugin {
	encryptData: <T>(data: T) => string;
	decryptData: <T>(encryptedData: string) => T;
}

// 声明文件，定义全局变量
declare interface Window {
	nextLoading: boolean;
}

// 申明路由
/* 
  RouteRecordRaw是Vue Router的一个类型定义，它用于描述路由配置的对象。它包含以下属性：
  path：字符串，表示路由的路径。
  name：字符串，表示路由的名称。
  component：组件类型，表示路由所匹配的组件。
  children：子路由配置数组，用于描述嵌套路由。
  meta：对象，用于存储额外的路由元数据，例如需要验证用户权限的信息。
*/
declare interface RouteItem extends RouteRecordRaw {
	path: string;
	redirect?: string;
	name: string;
	component: () => Promise<typeof import("*.vue")>;
	meta: {
		title: string;
		icon: string;
		loading?: boolean;
		keepAlive?: boolean;
		requiresAuth?: boolean;
		disabled?: boolean;
	};
	children?: ChilType[void];
}
// 声明路由 to from
declare interface RouteToFrom<T = any> extends RouteItem {
	path?: string;
	children?: T[];
}

// 声明 ref
declare type RefType<T = any> = T | null;

// 声明 HTMLElement
declare type HtmlType = HTMLElement | string | undefined | null;

// 申明 children 可选
declare type ChilType<T = any> = {
	children?: T[];
};

// 申明 数组
declare type EmptyArrayType<T = any> = T[];

// 申明 对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T;
};

// 申明 select option
declare type SelectOptionType = {
	value: string | number;
	label: string | number;
};

// 鼠标滚轮滚动类型
declare interface WheelEventType extends WheelEvent {
	wheelDelta: number;
}

// tree
declare interface Tree {
	id: number;
	label: string;
	children?: Tree[];
	[key: string]: any;
}

// new-table
//表头数据类型定义
declare interface TableHeader {
	label: string;
	prop: string;
	align?: string;
	overHidden?: boolean;
	minWidth?: string;
	sortable?: boolean;
	type?: string;
	fixed?: string;
	width?: string | number;
	// isActionColumn?: boolean; // 是否是操作列
	// isCustomizeColumn?: boolean; // 是否是自定义列
	slotKey?: string; // 自定义列的插槽名称
	searchFields?: boolean; // 是否是搜索字段
}

/*
  newForm
 允许任何字符串作为索引
 不然会报错, 使用动态属性名,需要使用索引签名
*/
declare type SearchFormType = {
	[key: string]: string;
};

declare type FormOptions = {
	type: string;
	props: {
		label: string;
	};
	vm: string;
	selectOptions?: {
		value: string | number;
		label: string;
		disabled?: boolean;
	}[];
	cascaderOptions?: any;
};
