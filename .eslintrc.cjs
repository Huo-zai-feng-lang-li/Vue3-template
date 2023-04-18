module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 新增
    node: true,
  },
  globals: {
    // 以下是全局变量 eslint 不会报'NodeJS' is not defined.eslint （no-undef）
    NodeJS: "readonly",
    defineEmits: "readonly",
    defineProps: "readonly",
    defineExpose: "readonly",
    ref: "readonly",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "./.eslintrc-auto-import.json", //vue自动导入忽略
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
  root: true,
  rules: {
    // 表示在逗号后面必须有空格，而在逗号前面不能有空格
    "comma-spacing": ["error", { before: false, after: true }],
  },
};
