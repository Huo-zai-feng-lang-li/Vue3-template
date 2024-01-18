<img src="icon.png" align="right" style="margin-left: 10px;" width="80px" height="100px" />

# 🌈 Awesome README [![Awesome](https://cdn.jsdelivr.net/gh/sindresorhus/awesome@d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome#readme)

> 这是一个使用 Vue3 和 TypeScript 作为主要技术栈的模板 **轻** 架子，您可以拿来直接作为项目模板，也可作为学习参考。

> 该项目主要是为了方便快速搭建一个基于 Vue3 的项目，并且详细记录了搭建每一步，详尽的注释加 Api 直达链接。

> 该项目集成了 eslint、prettier、stylelint、husky、router、pinia 和 高级封装的 axios、动态路由、组件、及一系列常用工具函数。使用 Vite 作为构建工具，使用 pnpm 作为包管理工具的项目。

<div style=color:#0b0909;>

-  该项目中所有的代码均经过精心的注释，以便于理解和学习。
-  该项目中所有的 NPM 包均已上传至 npm 仓库，Api 均在[docs](https://zhang-kun8888.gitee.io/vue3-tools-docs/) 及 [Github-Source](https://github.com/huozaifenlangli/vue3-directive-tool--NPM) 可查阅

</div>

#### 🏭 技术栈说明

-  Vue3：一款流行的前端框架，使用 Composition API 和 Tree-Shaking 技术提高开发效率和性能。
-  TypeScript：一种 JavaScript 的超集，增加了静态类型检查和面向对象编程等特性，提高代码的可读性和可维护性。
-  Vite：一个快速的 Web 开发构建工具，利用 ES Modules 和浏览器原生的 import 机制实现了快速的开发和构建速度。
-  pnpm：一个快速、可靠的包管理工具，支持多种包管理方式，如局部安装、全局安装、本地缓存等。
-  eslint：JavaScript 代码检查工具，用于检查代码风格和语法错误。
-  prettier：一款代码格式化工具，用于统一代码风格，提高代码的可读性。
-  stylelint：CSS 代码检查工具，用于检查 CSS 代码风格和语法错误。
-  husky：一个 Git 钩子管理工具，用于在 Git 操作前或后执行一些自定义的任务。
-  router：Vue3 官方提供的路由管理工具，用于实现页面之间的跳转和参数传递。
-  pinia：Vue3 官方提供的状态管理工具，用于管理全局状态和数据流。
-  axios：一款基于 Promise 的 HTTP 库，用于发送 AJAX 请求和处理响应数据。
-  vue-router：Vue3 官方提供的路由管理工具，用于实现页面之间的跳转 和 参数传递。

</div>

<p align="center">
<a href="https://img.shields.io/badge/npm-v9.6.6-2081C1"><img src="https://img.shields.io/badge/npm-v9.6.6-2081C1" alt="npm package"></a>
  <a href="https://github.com/InhiblabCore/vue-hooks-plus/actions/workflows/node-ci.yml"><img src="https://github.com/InhiblabCore/vue-hooks-plus/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>
    <a href="#badge"><img src="https://img.shields.io/github/languages/top/InhiblabCore/vue-hooks-plus" alt="language"></a>
<a href="https://img.shields.io/badge/pnpm-v8.5.1-F37E42"><img src="https://img.shields.io/badge/pnpm-v8.5.1-F37E42" alt="npm package"></a>
<a href="https://img.shields.io/badge/node-v20.2.0-416634"><img src="https://img.shields.io/badge/node-v20.2.0-416634" alt="npm package"></a>
<a href="https://github.com/InhiblabCore/vue-hooks-plus/blob/master/LICENSE"><img src="https://img.shields.io/github/license/InhiblabCore/vue-hooks-plus" alt="LICENSE"></a>

</p>

<div align="center">

# VueHooks Plus

简体中文 | [灵活英文](./README.en-CN.md) | [依赖说明](./PACKAGE_README.md)

High performance & Simplicity Vue3 Hooks library

</div>

## ✨ Features

-  [x] **axios 包含以下功能**：
-  [x] 🏄🏼‍♂️ 1.取消重复请求：完全相同的接口在上一个 pending 状态时，自动取消下一个请求
-  [x] 🔋 2.请求失败自动重试: 接口请求后台异常时候,自动重新发起多次请求,直到达到所设次数
-  [x] 🛸 3.请求接口数据缓存: 接口在设定时间内不会向后台获取数据,而是直接拿会话存储本地缓存,（关闭当前进程也就是页签就会自动清除）
-  [x] 🏟️ 4.父页面单独取消当前请求
-  [x] 🦾 5.父页面取消所有请求
-  [x] 🎪 6.请求进度条
       <br />
-  [x] **功能函数指令 包含以下功能**：
-  [x] 🎯 01.防篡改水印
-  [x] 🪄 02.防抖
-  [x] 🤺 03.节流
-  [x] 🔐 04.深拷贝
-  [x] 🔑 05.复制
-  [x] 🎉 06.拖拽
-  [x] 🚩 07.时间格式化
-  [x] 🛠️ 08.长按
-  [x] ⛑️ 09.判断奇偶
-  [x] 🔖 10.判断是否是空对象
-  [x] 🔍 11.判断是否是空数组
       <br />
-  [x] **脚手架 包含以下功能**：
-  [x] ✂️ 01.自动导入 Api
-  [x] 🧩 02.自动注册组件
-  [x] 💊 03.自动注册指令
-  [x] 🏔 04.返回顶部
-  [x] 🌐 05.loading 加载进度条 （路由跳转及发起请求是不同定制的 loading）
-  [ ] 等等...

### 📦 项目预览

[Click Preview](https://zhang-kun8888.gitee.io/vite--ts--vue3---template/#/home)

#### 🤩 对应博客（0-1 所有搭建步骤）

[@CSDN-从零搭建 Vue3 + VIte + Ts 项目 —— 并集成 eslint 、prettier、stylelint、husky、lint-staged、pinia、axios、loding、动态路由…](https://blog.csdn.net/m0_57904695/article/details/129950163?spm=1001.2014.3001.5502)

#### 🤹‍♀️ 项目 npm 文档

[Click Docs & NPM](https://zhang-kun8888.gitee.io/vue3-tools-docs/)

#### 💒 代码仓库

```base
# 国内
https://gitee.com/zhang-kun8888/Vite--Ts--Vue3---template.git

# 国外
https://github.com/huozaifenlangli/Vue3-template.git
```

####

## 🪴 Project Activity

![Alt](https://repobeats.axiom.co/api/embed/35dbca2274542c0144993be92cc51762227543d9.svg "Repobeats analytics image")

#### ⚡ 使用说明

```base
# 克隆项目
git clone https://gitee.com/zhang-kun8888/Vite--Ts--Vue3---template.git

# 进入项目
cd Vite--Ts--Vue3---template

# 安装依赖
pnpm install
pnpm install -g concurrently // 同时运行多个依赖

# 运行项目
pnpm run dev

# 打包发布
pnpm run build
```

#### 🏭 环境支持

| Edge                                                                     | last 2 versions                                                                   | last 2 versions                                                                | last 2 versions                                                                |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| ![Edge](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) | ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) |

> 由于 Vue3 不再支持 IE11，故而 ElementPlus 也不支持 IE11 及之前版本。

#### 📚 文档链接

-  <a href="https://shields.io/badges" target="_blank">README Icon 图标大全</a>

-  <a href="https://www.webfx.com/tools/emoji-cheat-sheet/" target="_blank">emoji 特殊符号大全 </a>

#### ⛱️ 项目结构

```
├── .husky
│   ├── commit-msg // 获取提交信息，保证规范格式提交
│   ├── pre-commit // 提交之前
├── public
│   ├── index.html
├── .vscode
│   ├── settings.json
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── router
│   ├── store
│   ├── utils
│   ├── views
│   ├── App.vue
│   ├── main.ts
│   ├── projectReset.scss
├── .eslintrc.cjs
├── .husky
├── .prettierrc.cjs
├── .stylelintrc.cjs
├── package.json
├── tsconfig.node.json
├── pnpm-lock.yaml
├── README.md
├── vite.config.ts
```

-  **1** `public`：此目录包含静态文件，这些文件将原样提供给客户端。index.html 文件是应用程序的入口点。
-  **2** `.vscode`：这个目录包含 Visual Studio Code (eslint 、prettier、stylelint) 的设置文件，例如 settings.json。
-  **3** `src`：这个目录是项目的主要源代码目录，包含了 API、组件、路由、存储、工具和视图等文件夹，以及 App.vue 和 main.ts 等文件。
   -  **3-1** `api`：这个目录包含与后端通信的 API 文件（axios）。
   -  **3-2** `assets`：这个目录包含项目中使用的图像、样式表和其他资源。
   -  **3-3** `components`：这个目录包含可重用的 Vue.js 组件，例如按钮、输入框等。
   -  **3-4** `router`：这个目录包含 Vue.js 路由器的配置文件。
   -  **3-5** `store`：这个目录包含 pinia 状态管理器的配置文件。
   -  **3-6** `utils`：这个目录包含与项目中的其他文件共享的通用 JavaScript 工具函数。
   -  **3-7** `views`：这个目录包含项目中的视图文件，例如登录页面、主页等。
   -  **3-8** `App.vue`：这个文件是 Vue.js 应用程序的根组件。
   -  **3-9** `main.ts`：这个文件是应用程序的入口点，它创建了 Vue.js 实例并将其挂载到 DOM 中。
   -  **3-10** `projectReset.scss`：这个文件包含项目的全局样式，例如重置默认样式、颜色等。
-  **4** `.eslintrc.cjs`：这个文件是 ESLint 配置文件，用于保持代码风格的一致性和代码质量。
-  **5** `.husky`：这个目录包含 Husky 钩子的配置文件，用于在 Git 操作前后时运行脚本。
-  **6** `.prettierrc.cjs`：这个文件是 Prettier 配置文件，用于自动格式化代码。
-  **7** `.stylelintrc.cjs`：这个文件是 Stylelint 配置文件，用于保持 CSS 代码风格的一致性和代码质量。
-  **8** `package.json`：这个文件包含项目的依赖项和脚本命令等信息，是项目的 package.json 文件中定义的脚本
   -  **8-1** pnpm: 这个脚本运行 pnpm install 命令，使用 pnpm 安装项目的依赖项。
   -  **8-2** dev: 这个脚本运行 vite 命令并带有 --open 标志，它会启动一个本地开发服务器并在浏览器中打开项目。
   -  **8-3** build: 这个脚本用于构建项目。它首先运行 vue-tsc 命令，对 TypeScript 代码进行类型检查。然后运行 lint、format 和 lint:style 脚本，分别对代码进行 ESLint、Prettier 和 Stylelint 的检查和格式化。最后运行 vite build 命令构建项目。
   -  **8-4** _CheckAll_: 这个脚本用于检查项目的代码，它运行与 build 脚本相同的命令，但不包括构建项目的命令。
   -  **8-5** _ESlint:check_: 这个脚本用于运行 ESLint 对项目的代码进行检查和格式化。
   -  **3-4** _Prettier:check_: 这个脚本用于运行 Prettier 对项目的代码进行格式化。
   -  **8-7** _StyleLint:check_: 这个脚本用于运行 Stylelint 对项目的样式表进行检查和格式化。
   -  **8-8** _commit_: 这个脚本用于在自动化提交脚本。
-  **9** `tsconfig.node.json`：这个文件是 TypeScript 配置文件，用于配置 Node.js 的编译选项。
-  **10** `pnpm-lock.yaml`：这个文件包含 pnpm 安装的精确版本信息 锁定版本。
-  **11** `README.md`：这个文件是项目的说明文档。
-  **12** `vite.config.ts`：这个文件是 Vite 的配置文件，用于配置构建选项和插件。

#### 💕 特别感谢

<div align="center">

特别感谢老哥们的建议、指导与帮忙。谢谢！🌸

———— @张坤 CSDN 彩色之外-————

2023、11、28🌸

## 📄 License

[MIT](https://github.com/element-plus/element-plus/blob/master/LICENSE)

</div>
