module.exports = {
  root: true,
  // 指定代码运行的环境
  env: {
    browser: true, // 浏览器环境
    es2021: true, // ES2021 语法
    node: true, // Node.js 环境
  },
  globals: {
    // 以下是全局变量 eslint 不会报'NodeJS' is not defined.eslint （no-undef）
    NodeJS: "readonly",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "./.eslintrc-auto-import.json", //vue自动导入忽略警告
    // 新增，必须放在最后面
    "plugin:prettier/recommended",
  ],
  // 新增
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // http://eslint.cn/docs/rules/
    // https://eslint.vuejs.org/rules/
    // https://typescript-eslint.io/rules/no-unused-vars/

    // 表示在逗号后面必须有空格，而在逗号前面不能有空格
    "comma-spacing": ["error", { before: false, after: true }],
    // 关闭禁止使用 @ts-ignore 的规则
    "@typescript-eslint/ban-ts-ignore": "off",
    // 关闭强制函数显式返回类型的规则
    "@typescript-eslint/explicit-function-return-type": "off",
    // 关闭禁止使用 any 类型的规则 warn error
    "@typescript-eslint/no-explicit-any": "off",
    // 关闭禁止使用 require() 函数的规则
    "@typescript-eslint/no-var-requires": "off",
    // 关闭禁止空函数的规则
    "@typescript-eslint/no-empty-function": "off",
    // 关闭禁止定义前使用的规则
    "@typescript-eslint/no-use-before-define": "off",
    // 关闭禁止使用 @ts-comment 的规则
    "@typescript-eslint/ban-ts-comment": "off",
    // 关闭禁止使用特定类型的规则
    "@typescript-eslint/ban-types": "off",
    // 关闭非空断言运算符的规则
    "@typescript-eslint/no-non-null-assertion": "off",
    // 关闭在导出函数和类之外导出的规则
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 禁止重复声明变量的规则
    "@typescript-eslint/no-redeclare": "error",
    // 关闭短路表达式中可能导致不可选链访问的规则
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    // 检测未使用变量的规则，error 代表检测出未使用变量时会抛出错误
    "@typescript-eslint/no-unused-vars": [2],

    // 关闭自定义事件名大小写的规则
    "vue/custom-event-name-casing": "off",
    // 关闭属性排序的规则
    "vue/attributes-order": "off",
    // 关闭每个文件只导出一个组件的规则
    "vue/one-component-per-file": "off",
    // 关闭 HTML 遇到 > 换行的规则
    "vue/html-closing-bracket-newline": "off",
    // 关闭 HTML 属性使用换行的规则
    "vue/max-attributes-per-line": "off",
    // 关闭多行 HTML 元素内容换行的规则
    "vue/multiline-html-element-content-newline": "off",
    // 关闭单行 HTML 元素内容换行的规则
    "vue/singleline-html-element-content-newline": "off",
    // 关闭 HTML 属性名称中使用连字符的规则
    "vue/attribute-hyphenation": "off",
    // 关闭 HTML 没有内容的标签必须以 /> 结尾的规则
    "vue/html-self-closing": "off",
    // 关闭模板中只包含一个根元素的规则
    "vue/no-multiple-template-root": "off",
    // 关闭要求给默认的 prop 赋初始值的规则
    "vue/require-default-prop": "off",
    // 关闭 v-model 指令中的参数规则
    "vue/no-v-model-argument": "off",
    // 关闭 watch 函数不能使用箭头函数的规则
    "vue/no-arrow-functions-in-watch": "off",
    // 关闭禁止在 template 标签上使用 key 属性的规则
    "vue/no-template-key": "off",
    // 关闭禁止使用 v-html 指令的规则
    "vue/no-v-html": "off",
    // 关闭注释中的特定关键字规则
    "vue/comment-directive": "off",
    // 关闭模板中的语法错误规则
    "vue/no-parsing-error": "off",
    // 关闭已经被废弃的 v-on:NativeModifier 规则
    "vue/no-deprecated-v-on-native-modifier": "off",
    // 关闭多单词组件名称的规则
    "vue/multi-word-component-names": "off",

    // 关闭无用的转义字符的规则
    "no-useless-escape": "off",
    // 关闭稀疏数组的规则
    "no-sparse-arrays": "off",
    // 关闭禁止使用原型对象上的内置属性的规则
    "no-prototype-builtins": "off",
    // 关闭禁止在 if 或者循环中出现常量条件的规则
    "no-constant-condition": "off",
    // 关闭定义前使用的规则
    "no-use-before-define": "off",
    // 关闭限制使用特定全局变量的规则
    "no-restricted-globals": "off",
    // 关闭指定语法的规则
    "no-restricted-syntax": "off",
    // 关闭生成器前后空格的规则
    "generator-star-spacing": "off",
    // 关闭不可达代码的规则
    "no-unreachable": "off",
    // 关闭模板中只包含一个根元素的规则
    "no-multiple-template-root": "off",
    // 检测未使用变量的规则，error 代表检测出未使用变量时会抛出错误
    "no-unused-vars": "error",
    // 关闭 v-model 指令中的参数规则
    "no-v-model-argument": "off",
    // 关闭在 switch 语句中缺少 default 分支的规则
    "no-case-declarations": "off",
    // 禁用 console 输出
    // "no-console": "error",
    // 关闭禁止重复声明变量的规则
    "no-redeclare": "off",
  },
};
