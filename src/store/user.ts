import { defineStore } from "pinia";
// 创建store很简单，调用pinia中的defineStore函数即可，该函数接收两个参数：
// name：一个字符串，必传项，该store的唯一id。
// options：一个对象，store的配置项，比如配置store内的数据，修改数据的方法等等。
interface UserState {
  name: string;
  age: number;
  sex: string;
}
export const useUsersStore = defineStore("users", {
  // 需要注意的是，state接收的是一个箭头函数返回的值，它不能直接接收一个对象。
  state: (): UserState => ({
    name: "张三",
    age: 18,
    sex: "男",
  }),
  getters: {
    // 默认接收一个state参数，可以通过解构的方式获取state中的数据
    getAddAge: ({ age }) => {
      // 接受父级调用传递的参数
      return (num: number) => (age += num);
    },
    // 调用其它getter
    getNameAndAge(): string {
      return this.name + "-" + this.sex + "-" + this.getAddAge(1000); // 访问state数据 和 另一个 getter 并执行计算
    },
  },
  actions: {
    saveName(name: string) {
      this.name = name;
    },
  },
  persist: true,
});
