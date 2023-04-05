module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 新增
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
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
  // 新增
  root: true,
  rules: {},
};
