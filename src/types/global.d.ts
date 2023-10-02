// 申明外部 npm 插件模块
declare module "canvas-confetti";
declare module "crypto-js";
declare module "vue3-encryption-plugin";
declare module "pinia-plugin-persistedstate";
declare module "vue3-loading-plug";
declare module "vue3-directive-tools";

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
declare interface RouteItem {
  path: string;
  name: string;
  meta: {
    loading?: boolean;
    keepAlive?: boolean;
    isRelease?: boolean;
  };
  component: () => Promise<typeof import("*.vue")>;
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
