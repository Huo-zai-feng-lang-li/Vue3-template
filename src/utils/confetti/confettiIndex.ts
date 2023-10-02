interface Origin {
  x?: number;
  y?: number;
}
export function getUserDescribe(type: number, myConfetti: any, origin: Origin) {
  const describeForNameMap = [
    [
      () => type === 1, // 判断条件
      () =>
        myConfetti({
          particleCount: 100,
          spread: 70,
          // 默认屏幕中间喷射，可以在引入的时候传入参数，如 showConfetti({x:0.1,y:0.5})
          origin: origin,
        }), // 执行函数
    ],
    [
      () => type === 2,
      () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
        };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          myConfetti(
            Object.assign({}, defaults, {
              particleCount,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
          );
          myConfetti(
            Object.assign({}, defaults, {
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
          );
        }, 250);
      },
    ],
    [
      () => type === 3,
      () => {
        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        myConfetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: origin,
        });
      },
    ],
    [
      () => type === 4,
      () => {
        const duration = performance.now() + 3 * 1000;
        const confettiColors = ["#6967fe", "#9341fd", "#e16984"];
        void (function frame() {
          myConfetti({
            particleCount: confettiColors.length,
            // 发射角度
            angle: 40,
            // 发射范围
            spread: 40,
            origin: { x: 0 },
            colors: confettiColors,
          });
          myConfetti({
            particleCount: confettiColors.length,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: confettiColors,
          });

          if (performance.now() < duration) {
            requestAnimationFrame(frame);
          }
        })();
      },
    ],
  ];
  function myError() {
    throw new Error("没有找到对应的效果");
  }
  // 通过find方法找到子数组中的第一个函数（判断条件）为true的子数组
  const getDescribe = describeForNameMap.find((item) => item[0]());
  // 子数组存在则运行子数组中的第二个元素（执行函数）
  getDescribe ? getDescribe[1]() : myError();
}
