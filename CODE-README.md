# 项目规范

## 文件命名

- 文件名应该使用连字符分隔，例如 `home-page.vue` 或 `user-profile.js`
- 对于组件，文件名应该与组件名一致，例如组件 `HomePage` 对应的文件名应该是 `home-page.vue`

## 路由命名

- 路由名应该使用连字符分隔，例如 `home-page` 或 `user-profile`
- 路由名应该描述页面的功能和意图，而不是技术实现方式
- 在 VueRouter 配置中，路由名应该与组件名一致，例如组件 `HomePage` 对应的路由名应该是 `home-page`

## 组件命名

- 组件名应该使用大驼峰命名法，例如 `HomePage` 或 `UserProfile`
- 组件名应该描述组件的功能和意图，而不是技术实现方式

## 常量命名

- 常量名应该使用大写字母和下划线分隔，例如 `MAX_LENGTH` 或 `API_BASE_URL`
- 对于常量名和枚举值，如果需要多个单词，请使用下划线分隔，例如 `USER_ROLE_ADMIN`

## Vuex 状态命名

- Vuex 模块中的属性名应该使用大写字母和下划线分隔，例如 `USER_ROLE_ADMIN`
- Vuex 模块中的 mutation 常量名应该使用大写字母和下划线分隔，例如 `SET_USER_ROLE`
- Vuex 模块中的 action 常量名应该使用大写字母和下划线分隔，例如 `FETCH_USER_PROFILE`

希望这个简单的规范文件能够对你有所帮助。你可以根据你的需求和项目的规模，对这些规范进行定制和扩展。
