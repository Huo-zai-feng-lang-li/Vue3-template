import { nextTick } from "vue";
interface Origin {
  x?: number;
  y?: number;
}
// 注释需要放在函数上面，不然调用鼠标放上去没提示
/**
 * 显示彩屑效果
 * @param { number } type - 彩屑效果类型
 * @type 1: 默认屏幕中间喷射
 * @type 2: 满屏随机炸裂
 * @type 3: 屏幕中间随机位置喷射
 * @type 4: 屏幕两端向内喷射
 * @param { Origin } origin - 彩屑的原点坐标
 *   x: x轴位置，默认值为0.5
 *   y: y轴位置，默认值为0.7
 * @url https://www.kirilv.com/canvas-confetti/
 * @returns { Promise<void> } - Promise对象
 */
export async function showConfetti(
  type = 1,
  origin: Origin = { x: 0.5, y: 0.7 }
): Promise<void> {
  await import("canvas-confetti").then((confetti) => {
    const canvasEle: HTMLCanvasElement | null =
      document.querySelector("#confetti");
    if (!canvasEle) return;
    canvasEle.style.zIndex = "9999";
    const myConfetti = confetti.create(canvasEle, {
      resize: true,
      useWorker: true,
      disableForReducedMotion: true,
    });
    import("./confettiIndex").then((confettiIndex) => {
      confettiIndex.getUserDescribe(type, myConfetti, origin);
    });
    nextTick(() => {
      canvasEle.style.zIndex = "-1";
      myConfetti.reset();
    });
  });
}
