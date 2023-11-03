// 根据鼠标滚轮缩放并且可以拖动视图
let scale = 1;
const diagramContainer = document.querySelector(
	".workflow-right"
) as HTMLDivElement;
diagramContainer.addEventListener("wheel", function (e) {
	e.preventDefault();
	if (e.deltaY > 0) {
		scale -= 0.1;
	} else {
		scale += 0.1;
	}
	diagramContainer.style.transform = `scale(${scale})`;
});

// 拖动视图
let isMouseDown = false;
let lastX = 0;
let lastY = 0;
diagramContainer.addEventListener("mousedown", function (e) {
	if (scale !== 1) {
		isMouseDown = true;
		diagramContainer.style.cursor = "move";
		lastX = e.clientX;
		lastY = e.clientY;
	}
});
diagramContainer.addEventListener("mousemove", function (e) {
	if (isMouseDown) {
		const x = e.clientX;
		const y = e.clientY;
		const offsetX = x - lastX;
		const offsetY = y - lastY;
		lastX = x;
		lastY = y;
		diagramContainer.style.left =
			(parseInt(diagramContainer.style.left) || 0) + offsetX + "px";
		diagramContainer.style.top =
			(parseInt(diagramContainer.style.top) || 0) + offsetY + "px";
	}
});
diagramContainer.addEventListener("mouseup", function () {
	isMouseDown = false;
	diagramContainer.style.cursor = "default";
});
