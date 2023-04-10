# package.json 说明书

#### 💌🍖 中文版

这是一个基于 Vue.js 的应用程序的 package.json 文件，其中包含了项目的名称、版本号、依赖项以及一些脚本。
├── name：项目名称为 "my-vue-app"
├── private：设置为私有项目，不会被发布到公共的包管理器中
├── version：项目版本号为 "0.0.0"
├── type：指定模块类型为 ES 模块
├── scripts：定义了一些可执行的脚本命令
│ ├── pnpm：安装依赖使用的命令，使用 pnpm 包管理器
│ ├── dev：启动开发环境，使用 concurrently 同时启动 vite 和 husky（为了非 git cz 命令时启动 commit-msg 校验规则）
│ ├── build：打包生产环境代码，先执行 CheckAll 命令，再执行 vite build 命令
│ ├── CheckAll：并行执行 ESlint:check、Prettier:check 和 StyleLint:check 命令
│ ├── ESlint:check：使用 eslint 对项目进行静态代码检查，并修复一些常见的问题
│ ├── Prettier:check：使用 prettier 格式化代码，并且只检查指定的文件类型
│ ├── StyleLint:check：使用 stylelint 对项目中的 CSS 样式进行检查，并修复一些常见的问题
│ └── commit：使用 git 进行代码提交，并且使用 commitizen 规范化提交信息
├── config：配置 commitizen 的相关信息
│ └── commitizen：指定使用的 commitizen adapter 为 cz-conventional-changelog
├── lint-staged：定义了在执行 git commit 时，需要执行的命令
│ └── src/\*_/_.{js,vue}：只对 src 目录下的 .js 和 .vue 文件进行静态代码检查，并修复一些常见的问题
├── dependencies：项目运行时所需要的依赖包
│ └── vue：使用的前端框架为 Vue.js，版本号为 ^3.2.47
└── devDependencies：仅在开发时需要的依赖包
├── @typescript-eslint/eslint-plugin：使用 TypeScript 时需要的 eslint 插件
├── @typescript-eslint/parser：使用 TypeScript 时需要的 eslint 解析器
├── @vitejs/plugin-vue：使用 vite 构建 Vue.js 项目时需要的插件
├── commitizen：规范化代码提交信息的工具
├── cz-conventional-changelog：commitizen 的适配器，使用 conventional-changelog 规范
├── eslint：静态代码检查工具
├── eslint-config-prettier：eslint 配置，解决与 prettier 冲突的问题
├── eslint-plugin-prettier：eslint 插件，使用 prettier 格式化代码
├── eslint-plugin-vue：eslint 插件，用于检查 Vue.js 项目中的代码
├── husky：在 git 中使用钩子函数，比如 pre-commit、commit-msg 等
├── postcss：CSS 预处理器
├── postcss-html：将 HTML 文件中的样式提取出来，并使用 postcss 进行处理
├── postcss-scss：将 SCSS 文件转换为 CSS 文件，并使用 postcss 进行处理
├── prettier：代码格式化工具
├── sass：SCSS 的编译工具
├── sass-loader：在 webpack 中使用 sass 编译 SCSS 文件
├── stylelint：样式检查工具
├── stylelint-config-prettier：stylelint 配置，解决与 prettier 冲突的问题
├── stylelint-config-recommended-scss：stylelint 推荐的 SCSS 配置
├── stylelint-config-standard：stylelint 推荐的标准配置
├── stylelint-config-standard-vue：stylelint 推荐的 Vue.js 配置
├── stylelint-order：stylelint 插件，用于检查样式的顺序
├── stylelint-scss：stylelint 插件，用于检查 SCSS 文件中的代码
├── typescript：使用 TypeScript 进行开发时需要的依赖包
├── vite：快速构建现代化 Web 应用程序的构建工具
└── vue-tsc：使用 TypeScript 时需要的 Vue.js 类型检查器

#### 💌🍖 英文版

├── name: The project name is "my-vue-app".
├── private: Set the project to private, and it will not be published to a public package manager.
├── version: The project version is "0.0.0".
├── type: Specify the module type as an ES module.
├── scripts: Define some executable script commands.
│ ├── pnpm: The command used to install dependencies, using the pnpm package manager.
│ ├── dev: Start the development environment, using concurrently to start vite and husky at the same time.
│ ├── build: Package the production environment code, first execute the CheckAll command, and then execute the vite build command.
│ ├── CheckAll: Run the ESlint:check, Prettier:check, and StyleLint:check commands in parallel.
│ ├── ESlint:check: Perform static code analysis on the project using eslint and fix common issues.
│ ├── Prettier:check: Format the code using prettier and only check specified file types.
│ ├── StyleLint:check: Check the CSS styles in the project using stylelint and fix common issues.
│ └── commit: Use git to commit the code and use commitizen to standardize the commit message.
├── config: Configure the relevant information of commitizen.
│ └── commitizen: Specify the commitizen adapter used as cz-conventional-changelog.
├── lint-staged: Define the commands to be executed when git commit is executed.
│ └── src/\*_/_.{js,vue}: Only perform static code analysis and fix common issues on .js and .vue files in the src directory.
├── dependencies: Dependencies required for project runtime.
│ └── vue: The front-end framework used is Vue.js, version number is ^3.2.47.
└── devDependencies: Dependencies only required during development.
├── @typescript-eslint/eslint-plugin: The eslint plugin required when using TypeScript.
├── @typescript-eslint/parser: The eslint parser required when using TypeScript.
├── @vitejs/plugin-vue: The plugin required when building Vue.js projects using vite.
├── commitizen: A tool for standardizing code commit messages.
├── cz-conventional-changelog: The adapter for commitizen, using the conventional-changelog specification.
├── eslint: A static code analysis tool.
├── eslint-config-prettier: Eslint configuration to solve conflicts with prettier.
├── eslint-plugin-prettier: Eslint plugin to format code using prettier.
├── eslint-plugin-vue: Eslint plugin for checking code in Vue.js projects.
├── husky: Use hook functions in git, such as pre-commit, commit-msg, etc.
├── postcss: A CSS preprocessor.
├── postcss-html: Extract styles from HTML files and process them with postcss.
├── postcss-scss: Convert SCSS files to CSS files and process them with postcss.
├── prettier: A code formatting tool.
├── sass: The compiler for SCSS.
├── sass-loader: Use sass to compile SCSS files in webpack.
├── stylelint: A tool for checking styles.
├── stylelint-config-prettier: Stylelint configuration to solve conflicts with prettier.
├── stylelint-config-recommended-scss: Recommended SCSS configuration for stylelint.
├── stylelint-config-standard: Recommended standard configuration for stylelint.
├── stylelint-config-standard-vue: Recommended Vue.js configuration for stylelint.
├── stylelint-order: Stylelint plugin for checking the order of styles.
├── stylelint-scss: Stylelint plugin for checking code in SCSS files.
├── typescript: Dependencies required when using TypeScript for development.
├── vite: A build tool for quickly building modern web applications.
└── vue-tsc: The Vue.js type checker required when using TypeScript.

# Vue + TypeScript + Vite 项目的运行和构建

如果你的 Vue + TypeScript + Vite 项目已经使用了 TypeScript，那么你不需要去运行 `vue-tsc` 命令，也不需要 `"watch": "vue-tsc --watch"`。因为 Vite 本身已经可以支持 TypeScript 编译和类型检查。你只需要在项目中配置好 TypeScript 相关的选项，例如 `tsconfig.json` 文件，Vite 就会自动编译和检查你的 TypeScript 代码。所以，你只需要使用 Vite 提供的命令来启动和构建你的项目，例如 `npm run dev` 或 `npm run build`。

## 使用 `concurrently` 同时运行多个命令

使用 `concurrently` 运行多个命令可能比（&&）依次运行多个命令更快，因为它们可以同时运行，而不需要等待前一个命令完成。这尤其适用于需要同时启动多个服务或编译多个文件的情况。但是，具体的运行速度取决于你的电脑配置和项目的复杂程度，因此可能需要尝试一下才能确定哪种方式更快。

首先进行安装：如果局部安装 npm run build 会不识别

```json
pnpm install -g concurrently
```

然后在 `package.json` 里面的 `scripts` 内部修改，例如：
语法：`concurrently \"npm run A\" \"npm run B\"`

```json
"scripts": {
  "dev": "vite",
  "start": "npm run dev",
  "build": "vite build",
  "all": "concurrently \"node server/server.js\" \"npm run start\""
},
```

上面的 `all` 会执行 `node server/server.js` 和 `npm run start`。

还有一种方法：&& 串联一次运行需要等待前一个运行成功

然后在 `package.json` 里面的 `scripts` 内部修改，例如：

```json
"scripts": {
  "dev": "vite",
  "start": "npm run dev",
  "build": "vite build",
  "all": "node server/server.js && npm run start"
},
```

两种方法都能实现一个命令执行多个脚本，不同的是 `concurrently` 是并联的，`&&` 是串联的。

在速度上，第一个方法远比第二个方法要快。
