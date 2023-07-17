/**
 * @description  复制指令
 * @example  
   <template>
        <div class="card content-box">
            <span class="text">复制指令 🍇🍇🍇🍓🍓🍓</span>
            <div class="box-content">
                <el-input placeholder="请输入内容" v-model="data" style="width: 500px">
                    <template #append>
                        <el-button v-copy="data">复制</el-button>
                    </template>
                </el-input>
            </div>
        </div>
    </template>
    
    <script setup lang="ts" name="copyDirect">
    import { ref } from "vue"; 
    const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");
   </script>
 * @author zk
 * @createDate 2023/06/26 17:07:56
 * @lastFixDate 2023/06/26 17:59:56
 */
import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface ElType extends HTMLElement {
  copyData: string | number;
  __handleClick__: any;
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.addEventListener("click", handleClick);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

function handleClick(this: any) {
  const input = document.createElement("input");
  input.value = this.copyData.toLocaleString();
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
}

export default copy;
