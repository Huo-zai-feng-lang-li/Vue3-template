## 项目说明书

**zk：** Vue3 + Ts + Vite + pnpm 项目中集成 —— eslint 、prettier、stylelint、husky、router、vuex、axios 

​       ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF67B8C0.png)这是一个使用 Vue3 和 TypeScript 作为主要技术栈，使用 Vite 作为构建工具，使用 pnpm 作为包管理工具的项目。该项目集成了 eslint、prettier、stylelint、husky、router、vuex 和 axios。

![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF689390.png)项目结构

```
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

- ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF69116B.png)`public`：此目录包含静态文件，这些文件将原样提供给客户端。index.html 文件是应用程序的入口点。
- ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF693389.png)`.vscode`：这个目录包含 Visual Studio Code (eslint 、prettier、stylelint) 的设置文件，例如 settings.json。
- ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF695B26.png)`src`：这个目录是项目的主要源代码目录，包含了 API、组件、路由、存储、工具和视图等文件夹，以及 App.vue 和 main.ts 等文件。
  - ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6A3B45.png)`api`：这个目录包含与后端通信的 API 文件（axios）。
  - ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF697610.png)`assets`：这个目录包含项目中使用的图像、样式表和其他资源。
  - ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6A7669.png)`components`：这个目录包含可重用的 Vue.js 组件，例如按钮、输入框等。
  - ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6A9490.png)`router`：这个目录包含 Vue.js 路由器的配置文件。
  - ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6AA970.png)`store`：这个目录包含 Vuex 状态管理器的配置文件。
  - ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6AC13E.png)`utils`：这个目录包含与项目中的其他文件共享的通用 JavaScript 工具函数。
  - `views`：这个目录包含项目中的视图文件，例如登录页面、主页等。
  - `App.vue`：这个文件是 Vue.js 应用程序的根组件。
  - `main.ts`：这个文件是应用程序的入口点，它创建了 Vue.js 实例并将其挂载到 DOM 中。
  - `projectReset.scss`：这个文件包含项目的全局样式，例如重置默认样式、颜色等。
- ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6B6907.png)`.eslintrc.cjs`：这个文件是 ESLint 配置文件，用于保持代码风格的一致性和代码质量。
- ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6B726D.png)`.husky`：这个目录包含 Husky 钩子的配置文件，用于在 Git 操作前后时运行脚本。
- ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6B7CCD.png)`.prettierrc.cjs`：这个文件是 Prettier 配置文件，用于自动格式化代码。
- ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6B8AA8.png)`.stylelintrc.cjs`：这个文件是 Stylelint 配置文件，用于保持 CSS 代码风格的一致性和代码质量。
- ![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6B993E.png)`package.json`：这个文件包含项目的依赖项和脚本命令等信息，是项目的 package.json 文件中定义的脚本
  - “pnpm”: 这个脚本运行 pnpm install 命令，使用 pnpm 安装项目的依赖项。
  - “dev”: 这个脚本运行 vite 命令并带有 --open 标志，它会启动一个本地开发服务器并在浏览器中打开项目。
  - “build”: 这个脚本用于构建项目。它首先运行 vue-tsc 命令，对 TypeScript 代码进行类型检查。然后运行 lint、format 和 lint:style 脚本，分别对代码进行 ESLint、Prettier 和 Stylelint 的检查和格式化。最后运行 vite build 命令构建项目。
  - “check”: 这个脚本用于检查项目的代码，它运行与 build 脚本相同的命令，但不包括构建项目的命令。
  - “lint”: 这个脚本用于运行 ESLint 对项目的代码进行检查和格式化。
  - “format”: 这个脚本用于运行 Prettier 对项目的代码进行格式化。
  - “lint:style”: 这个脚本用于运行 Stylelint 对项目的样式表进行检查和格式化。
  - “prepare”: 这个脚本用于在安装 git hooks 时安装 husky。
- `tsconfig.node.json`：这个文件是 TypeScript 配置文件，用于配置 Node.js 的编译选项。
- `pnpm-lock.yaml`：这个文件包含 pnpm 安装的精确版本信息 锁定版本。
- `README.md`：这个文件是项目的说明文档。
- `vite.config.ts`：这个文件是 Vite 的配置文件，用于配置构建选项和插件。

![img](file:///C:\Users\zk\AppData\Local\Temp\SGPicFaceTpBq\24508\DF6D836B.png)技术栈说明

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



​                                                                      ————皆是缘、0.活在风浪里！--zk

​                                                                          2023、4、5