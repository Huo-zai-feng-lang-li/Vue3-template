import { defineStore } from "pinia";
// 创建store很简单，调用pinia中的defineStore函数即可，该函数接收两个参数：
// name：{users}一个字符串，必传项，该store的唯一id。
// options：{state}一个对象，store的配置项，比如配置store内的数据，修改数据的方法等等。
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
      // 接受父级传递的参数
      return (num: number) => age + num;
    },
    // 调用其它getter
    // 在函数内部使用了this，箭头函数的this指向问题相信大家都知道吧！所以这里我们没有采用箭头函数的形式。
    // 箭头函数this指向父级作用域，而普通函数的this指向调用它的对象。
    // 箭头函数的 this 值与包含箭头函数的函数或对象的 this 值相同。例如：
    /* 
        const obj = {
          name: 'Alice',
          greet: function () {
            setTimeout(() => {
              console.log(`Hello, my name is ${this.name}`);
            }, 1000);
          }
        }; 

     obj.greet(); // 输出 "Hello, my name is Alice"，因为箭头函数的 this 指向 obj
    */
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
});
