## 🌈 项目说明书

> Vue3 + Ts + Vite + pnpm 项目中集成 —— eslint 、prettier、stylelint、husky、router、vuex、axios

> 这是一个使用 Vue3 和 TypeScript 作为主要技术栈，使用 Vite 作为构建工具，使用 pnpm 作为包管理工具的项目。该项目集成了 eslint、prettier、stylelint、husky、router、vuex 和 axios。

#### 💒 代码仓库

```base
https://gitee.com/zhang-kun8888/Vite--Ts--Vue3---template.git
```

#### [](https://gitee.com/zhang-kun8888/Vite--Ts--Vue3---template)

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

> <a href="https://blog.csdn.net/m0_57904695/article/details/129950163?spm=1001.2014.3001.5501" target="_blank">开发文档</a>

> emoji 特殊符号大全 <a href="http://fuhao.xiao84.com/" target="_blank">emoji 特殊符号大全 </a>

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

- **1** `public`：此目录包含静态文件，这些文件将原样提供给客户端。index.html 文件是应用程序的入口点。
- **2** `.vscode`：这个目录包含 Visual Studio Code (eslint 、prettier、stylelint) 的设置文件，例如 settings.json。
- **3** `src`：这个目录是项目的主要源代码目录，包含了 API、组件、路由、存储、工具和视图等文件夹，以及 App.vue 和 main.ts 等文件。
  - **3-1** `api`：这个目录包含与后端通信的 API 文件（axios）。
  - **3-2** `assets`：这个目录包含项目中使用的图像、样式表和其他资源。
  - **3-3** `components`：这个目录包含可重用的 Vue.js 组件，例如按钮、输入框等。
  - **3-4** `router`：这个目录包含 Vue.js 路由器的配置文件。
  - **3-5** `store`：这个目录包含 Vuex 状态管理器的配置文件。
  - **3-6** `utils`：这个目录包含与项目中的其他文件共享的通用 JavaScript 工具函数。
  - **3-7** `views`：这个目录包含项目中的视图文件，例如登录页面、主页等。
  - **3-8** `App.vue`：这个文件是 Vue.js 应用程序的根组件。
  - **3-9** `main.ts`：这个文件是应用程序的入口点，它创建了 Vue.js 实例并将其挂载到 DOM 中。
  - **3-10** `projectReset.scss`：这个文件包含项目的全局样式，例如重置默认样式、颜色等。
- **4** `.eslintrc.cjs`：这个文件是 ESLint 配置文件，用于保持代码风格的一致性和代码质量。
- **5** `.husky`：这个目录包含 Husky 钩子的配置文件，用于在 Git 操作前后时运行脚本。
- **6** `.prettierrc.cjs`：这个文件是 Prettier 配置文件，用于自动格式化代码。
- **7** `.stylelintrc.cjs`：这个文件是 Stylelint 配置文件，用于保持 CSS 代码风格的一致性和代码质量。
- **8** `package.json`：这个文件包含项目的依赖项和脚本命令等信息，是项目的 package.json 文件中定义的脚本
  - **8-1** pnpm: 这个脚本运行 pnpm install 命令，使用 pnpm 安装项目的依赖项。
  - **8-2** dev: 这个脚本运行 vite 命令并带有 --open 标志，它会启动一个本地开发服务器并在浏览器中打开项目。
  - **8-3** build: 这个脚本用于构建项目。它首先运行 vue-tsc 命令，对 TypeScript 代码进行类型检查。然后运行 lint、format 和 lint:style 脚本，分别对代码进行 ESLint、Prettier 和 Stylelint 的检查和格式化。最后运行 vite build 命令构建项目。
  - **8-4** _CheckAll_: 这个脚本用于检查项目的代码，它运行与 build 脚本相同的命令，但不包括构建项目的命令。
  - **8-5** _ESlint:check_: 这个脚本用于运行 ESLint 对项目的代码进行检查和格式化。
  - **3-4** _Prettier:check_: 这个脚本用于运行 Prettier 对项目的代码进行格式化。
  - **8-7** _StyleLint:check_: 这个脚本用于运行 Stylelint 对项目的样式表进行检查和格式化。
  - **8-8** _commit_: 这个脚本用于在自动化提交脚本。
- **9** `tsconfig.node.json`：这个文件是 TypeScript 配置文件，用于配置 Node.js 的编译选项。
- **10** `pnpm-lock.yaml`：这个文件包含 pnpm 安装的精确版本信息 锁定版本。
- **11** `README.md`：这个文件是项目的说明文档。
- **12** `vite.config.ts`：这个文件是 Vite 的配置文件，用于配置构建选项和插件。

#### 🏭 技术栈说明

- Vue3：一款流行的前端框架，使用 Composition API 和 Tree-Shaking 技术提高开发效率和性能。
- TypeScript：一种 JavaScript 的超集，增加了静态类型检查和面向对象编程等特性，提高代码的可读性和可维护性。
- Vite：一个快速的 Web 开发构建工具，利用 ES Modules 和浏览器原生的 import 机制实现了快速的开发和构建速度。
- pnpm：一个快速、可靠的包管理工具，支持多种包管理方式，如局部安装、全局安装、本地缓存等。
- eslint：JavaScript 代码检查工具，用于检查代码风格和语法错误。
- prettier：一款代码格式化工具，用于统一代码风格，提高代码的可读性。
- stylelint：CSS 代码检查工具，用于检查 CSS 代码风格和语法错误。
- husky：一个 Git 钩子管理工具，用于在 Git 操作前或后执行一些自定义的任务。
- router：Vue3 官方提供的路由管理工具，用于实现页面之间的跳转和参数传递。
- vuex：Vue3 官方提供的状态管理工具，用于管理全局状态和数据流。
- axios：一款基于 Promise 的 HTTP 库，用于发送 AJAX 请求和处理响应数据。

#### 💕 特别感谢

特别感谢老哥们的建议、指导与帮忙。谢谢！

———— @张坤 彩色之外-————

2023、4、5
