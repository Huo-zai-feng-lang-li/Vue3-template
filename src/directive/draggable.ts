/**
 * @description 拖拽子元素指令
 * @description 可在父元素区域任意拖拽元素 思路：
 *       1、设置需要拖拽的元素为absolute，其父元素为relative。
 *       2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
 *       3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
 *       4、鼠标松开(onmouseup)时完成一次拖拽*
 * @example:
 *       <template>
 *           <div class="content-box">
 *               <span class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
 *               <div v-draggable class="drag-box cursor-move">我可以拖拽哦~</div>
 *           </div>
 *       </template>
 *
 *       <style lang="scss" scoped>
 *       .content-box {
 *           position: relative;//required
 *           width: 500px;
 *           height: 500px;
 *           border: 1px solid #ccc;
 *           .drag-box {
 *               position: absolute;//required
 *               width: 100px;
 *               height: 100px;
 *               background-color: #ccc;
 *           }
 *       }
 *       </style>
 * @author zk
 * @createDate 2023/06/26 17:26:11
 * @lastFixDate 2023/06/26 17:49:11
 */
import type { Directive } from "vue";
interface ElType extends HTMLElement {
  parentNode: any;
}
const draggable: Directive = {
  mounted: function (el: ElType) {
    // 拖拽
    const oDiv = el; //当前元素
    oDiv.onmousedown = function (e: any) {
      //鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - oDiv.offsetLeft;
      const disY = e.clientY - oDiv.offsetTop;
      const oParent = oDiv.parentNode; //获取到父元素
      //移动时计算元素距离可视区的距离
      document.onmousemove = function (e: any) {
        //通过事件委托，计算移动的距离
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        // 不允许超出父元素
        const w = oParent.clientWidth - oDiv.offsetWidth;
        const h = oParent.clientHeight - oDiv.offsetHeight;
        if (l < 0) {
          l = 0;
        } else if (l > w) {
          l = w;
        }
        if (t < 0) {
          t = 0;
        } else if (t > h) {
          t = h;
        }
        //移动当前元素
        oDiv.style.left = l + "px";
        oDiv.style.top = t + "px";
      };
      //鼠标抬起时候，移除事件
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
};

export default draggable;
