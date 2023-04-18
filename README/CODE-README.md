# 项目命名规范

## 文件命名

- <div style="color:red">所有文件名应该使用小写字母，不得使用大写字母</div>
- 一个单词的文件名可以直接使用该单词，例如：**_main.js_**，
- 多个单词，则应该使用中划线 **-** 将单词连接，例如组件和 utils：**_my-component_** 或 **_user-profile.js_**
- 在一些特定的情况下，可以在文件名中加入版本号、区域代码等信息，例如：**_my-table-v1.0.1-en-us.vue_**

## 路由命名

- 在 VueRouter 配置中，**路由名应该与页面组件名一致**，例如: **_home-page.vue_** 对应的路由名应该是 **_home-page_**,如果 **_dashboard-view.vue_** 是一个控制台页面的组件，那么路由可以定义为 **_/dashboard_**。

## 组件命名

- 对于**components**里面的组件，一般来讲是不需要包裹文件夹的。因为它们作为复用性较高的组件，可以直接在其他页面中引用并使用，不需要形成页面级别的层级，文件名应该使用中横线连接的方式，例如 **_my-component.vue_** 或 **_my-header.vue_** 或 大驼峰 MyChildren.vue

## views 命名

- **views**页面组件的文件名同样应该使用中横线连接的方式，但是为了能够清晰的表示它是一个页面级别的组件，一般在文件名中会加入 **_Page_** 或 **_View_** 等词语，例如 **_home-page.vue_** 或 **_dashboard-view.vue_**。
- 如果 **_home-page.vue_** 是一个主页组件，那么包裹它的文件夹可以命名为 **_home_** 或者 **_home-page_**；如果 **_dashboard-view.vue_** 是一个控制台**页面的组件**，那么文件夹可以命名为**_dashboard_** 或者 **_dashboard-view_**。在实际开发中，我们可以根据具体的项目需求和组织习惯来命名文件夹，只要能够清晰明了地表示页面级别组件的层级关系即可。

## 常量命名

- 常量在命名时通常要求所有字母都大写，单词之间用下划线分隔。这种常量命名方式被称作“大写下划线命名法”，它有助于代码可读性和可维护性的提高。例如：

```javascript
MAX_NUM = 100;
PI = 3.14159;
```

## pinia 命名

- 在使用 Pinia 进行状态管理的时候，可以根据自己的需求对 store 数据进行命名。一般来说，store 数据的命名应该具有一定的描述性，使其易于理解和记忆。另外，一些常见的命名约定包括：

使用驼峰式命名法（camelCase）来命名 store 数据，例如：

```javascript
// Good examples
const user = useUserStore();
const productList = useProductListStore();
const shoppingCart = useShoppingCartStore();
// 在 store 数据的命名前加上一个动词，以表明当前 store 数据所代表的是一个动作。这种命名方式可以更好地描述 store 数据的作用和目的，例如：
// Good examples
const loginUser = useLoginUserStore();
const increaseCount = useIncreaseCountStore();
const submitOrder = useSubmitOrderStore();
```

<a href="https://docs.qq.com/doc/DZUhlTGhTclhyTE9O" title="【腾讯文档】代码风格及规范">更多请点击：</a>

希望这个简单的规范文件能够对你有所帮助。你可以根据你的需求和项目的规模，对这些规范进行定制和扩展。
