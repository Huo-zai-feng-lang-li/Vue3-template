<template>
	<div class="workflow-container">
		<!-- 监控视图 page -->
		<div class="workflow">
			<!-- 顶部工具栏 -->
			<Tool @tool="onToolClick" @changeSlider="overflowChange" />

			<div class="workflow-content">
				<!-- 左侧导航区 -->
				<div class="workflow-left" v-loading="loading">
					<el-scrollbar>
						<div
							ref="leftNavRefs"
							v-for="val in state.leftNavList"
							:key="val.id"
							:style="{
								height: val.isOpen ? 'auto' : '50px',
								overflow: 'hidden',
								transition: 'height .5s',
							}"
							class="workflow-left-id"
						>
							<div
								class="workflow-left-title"
								@click="onTitleClick(val)"
							>
								<span>{{ val.title }}</span>
								<zk-icon
									:type="val.isOpen ? 'ArrowDownBold' : 'ArrowUpBold'"
									color="#646566"
								/>
							</div>
							<div
								class="workflow-left-item"
								v-for="(v, k) in val.children"
								:key="k"
								:data-name="v.name"
								:data-icon="v.icon"
								:data-id="v.id"
							>
								<div class="workflow-left-item-icon">
									<zk-icon :type="v.icon" class="workflow-icon-link" />
									<div
										class="font10 pl5 name"
										:title="v.name.length > 5 ? v.name : ''"
									>
										{{ v.name }}
									</div>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</div>

				<!-- 右侧绘画区 -->
				<div
					id="workflow-right"
					class="workflow-right"
					ref="workflowRightRef"
					v-loading="loading"
				>
					<div class="workflow-area">
						<!-- 分类 wrap-->
						<div class="area">
							<!-- 分类 wrap-->
							<div
								class="workflow-item"
								v-for="item in state.leftNavList"
								:key="item.id"
							>
								<!-- 分类 title -->
								<div class="workflow-item-title">
									{{ item.title }}
								</div>

								<!-- 分类 item -->
								<div class="workflow-item-content">
									<template
										v-for="(v, k) in state.jsplumbData.nodeList"
									>
										<div
											v-if="v.pid === item.id"
											:key="v.nodeId"
											:id="v.nodeId"
											:class="v.class"
											:style="{ left: v.left, top: v.top }"
											@click="onItemCloneClick(k)"
											@dblclick="onDbItemCloneClick()"
											@contextmenu.prevent="
												onContextmenu(v, k, $event)
											"
										>
											<div
												title="双击可查看、拖拽可移位"
												:style="{ borderLeft: v.borderLeft }"
												class="workflow-right-box"
												:class="{
													'workflow-right-active':
														state.jsPlumbNodeIndex === k,
												}"
											>
												<div class="workflow-right-box-icon">
													<div
														class="workflow-icon-link"
														title="拖拽可连线"
													></div>
													<zk-icon :type="v.icon"></zk-icon>
													<div class="font10 pl5 name">
														{{ v.name }}
													</div>
												</div>
											</div>
										</div>
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 节点右键菜单 -->
		<Contextmenu
			:dropdown="state.dropdownNode"
			ref="contextmenuNodeRef"
			@current="onCurrentNodeClick"
		/>
		<!-- 线右键菜单 -->
		<Contextmenu
			:dropdown="state.dropdownLine"
			ref="contextmenuLineRef"
			@current="onCurrentLineClick"
		/>
		<!-- 抽屉表单、线 -->
		<Drawer ref="drawerRef" @label="setLineLabel" @node="setNodeContent" />

		<!-- 顶部工具栏-帮助弹窗 -->
		<Help ref="helpRef" />

		<!-- 双击节点弹框 -->
		<node-info ref="nodeInfoView" />
	</div>
</template>

<script setup lang="ts" name="pagesWorkflow">
import {
	defineAsyncComponent,
	reactive,
	onMounted,
	onUnmounted,
	nextTick,
	ref,
} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { jsPlumb } from "jsplumb";
import Sortable from "sortablejs";

import { leftNavList, rightList } from "./js/mock";
const loading = ref(true);
import {
	jsplumbDefaults,
	jsplumbMakeSource,
	jsplumbMakeTarget,
	jsplumbConnect,
} from "./js/config";
import { customScroll } from "vue3-directive-tools";
// 动态导入传参
// import("./js/dragView").then((module) => {
// 	module.handleDiagramInteraction(".workflow-right");
// });

window.addEventListener(
	"wheel",
	function (event) {
		customScroll(event, ".workflow-right");
	},
	{ passive: false }
);

// 引入组件
const Tool = defineAsyncComponent(() => import("./component/tool/index.vue"));
const Contextmenu = defineAsyncComponent(
	() => import("./component/contextmenu/index.vue")
);
const Drawer = defineAsyncComponent(
	() => import("./component/drawer/index.vue")
);
const Help = defineAsyncComponent(() => import("./component/tool/help.vue"));
const nodeInfo = defineAsyncComponent(() => import("./nodeInfo.vue")); // 双击节点弹框
type NodeListState = {
	id: string | number;
	nodeId: string | undefined;
	class: HTMLElement | string;
	left: number | string;
	top: number | string;
	borderLeft: string;
	icon: string;
	name: string;
	pid: string | number;
};

type LineListState = {
	sourceId: string;
	targetId: string;
	label: string;
};

declare type XyState = {
	x: string | number;
	y: string | number;
};

type WorkflowState<T = any> = {
	workflowRightRef: HTMLDivElement | null;
	leftNavRefs: HTMLElement[];
	leftNavList: T[];
	dropdownNode: XyState;
	dropdownLine: XyState;
	isShow: boolean;
	jsPlumb: T;
	jsPlumbNodeIndex: null | number;
	jsplumbDefaults: T;
	jsplumbMakeSource: T;
	jsplumbMakeTarget: T;
	jsplumbConnect: T;
	jsplumbData: {
		nodeList: NodeListState[];
		lineList: LineListState[];
	};
	canvasWidth: number;
};
// 定义变量内容
const leftNavRefs = ref([]);
const nodeInfoView = ref();
const workflowRightRef = ref();
const contextmenuNodeRef = ref();
const contextmenuLineRef = ref();
const drawerRef = ref();
const helpRef = ref();

const state = reactive<WorkflowState>({
	leftNavList: [],
	dropdownNode: { x: "", y: "" },
	dropdownLine: { x: "", y: "" },
	isShow: false,
	jsPlumb: null,
	jsPlumbNodeIndex: null,
	jsplumbDefaults,
	jsplumbMakeSource,
	jsplumbMakeTarget,
	jsplumbConnect,
	jsplumbData: {
		nodeList: [],
		lineList: [],
	},
	workflowRightRef: null,
	leftNavRefs: [],
	canvasWidth: 0,
});

// 设置 宽度小于 768，不支持拖拽
const setClientWidth = () => {
	const clientWidth = document.body.clientWidth;
	clientWidth < 768 ? (state.isShow = true) : (state.isShow = false);
};

// 数据初始化
const initLeftNavList = () => {
	const elWrap = <HTMLDivElement>document.querySelector(".workflow-right");
	const observer = new ResizeObserver(() => {
		elWrap.style.overflow = "auto";
		nextTick(() => {
			state.jsPlumb?.setSuspendDrawing(false, true);
		});
	});
	observer.observe(elWrap);
	// 左侧导航数据保存
	state.leftNavList = leftNavList;
	// 右侧绘图数据保存
	state.jsplumbData = rightList;
};

// 左侧导航-初始化拖动
const initSortable = () => {
	leftNavRefs.value.forEach((v, i) => {
		Sortable.create(v as HTMLDivElement, {
			group: {
				name: "parent",
				pull: "clone",
				put: false,
			},
			animation: 0,
			sort: false,
			draggable: ".workflow-left-item",
			forceFallback: true,
			onEnd: function (evt: any) {
				const { name, icon, id } = evt.clone.dataset;
				const { layerY, clientX, clientY } = evt.originalEvent;
				const el = workflowRightRef.value!;
				const { x, y, width, height } = el.getBoundingClientRect();

				if (
					clientX < x ||
					clientX > width + x ||
					clientY < y ||
					y > y + height
				) {
					ElMessage.warning("请把节点拖入到画布中");
				} else {
					// 节点id（唯一）
					const nodeId = Math.random().toString(36).substring(2, 12);
					// 处理节点数据
					const node = {
						nodeId,
						left: `20px`,
						top: `${layerY}px`,
						borderLeft: "5px solid #69f0ae",
						class: "workflow-right-clone",
						name,
						icon,
						id,
						pid: state.leftNavList[i].id,
					};

					// 右侧视图内容数组
					state.jsplumbData.nodeList.push(node);
					// 元素加载完毕时
					nextTick(() => {
						// 整个节点作为source或者target
						state.jsPlumb.makeSource(nodeId, state.jsplumbMakeSource);
						// // 整个节点作为source或者target
						state.jsPlumb.makeTarget(
							nodeId,
							state.jsplumbMakeTarget,
							jsplumbConnect
						);
						// 设置节点可以拖拽（此处为id值，非class）
						state.jsPlumb.draggable(nodeId, {
							containment: "parent",
							stop: (el: {
								el: { id: string | undefined };
								pos: any[];
							}) => {
								state.jsplumbData.nodeList.forEach((v) => {
									if (v.nodeId === el.el.id) {
										// 节点x, y重新赋值，防止再次从左侧导航中拖拽节点时，x, y恢复默认
										v.left = `${el.pos[0]}px`;
										v.top = `${el.pos[1]}px`;
									}
								});
							},
						});
					});
				}
			},
		});
	});
};

// 初始化 jsPlumb
const initJsPlumb = () => {
	(<any>jsPlumb).ready(() => {
		state.jsPlumb = (<any>jsPlumb).getInstance({
			detachable: false,
			Container: "workflow-right",
		});
		state.jsPlumb.fire("jsPlumbDemoLoaded", state.jsPlumb);
		// 导入默认配置
		state.jsPlumb.importDefaults(state.jsplumbDefaults);
		// 会使整个jsPlumb立即重绘。
		state.jsPlumb.setSuspendDrawing(false, true);
		// 初始化节点、线的链接
		initJsPlumbConnection();
		// 点击线弹出右键菜单
		state.jsPlumb.bind(
			"contextmenu",
			(conn: any, originalEvent: MouseEvent) => {
				originalEvent.preventDefault();
				const { sourceId, targetId } = conn;
				const { clientX, clientY } = originalEvent;
				state.dropdownLine.x = clientX;
				state.dropdownLine.y = clientY;
				const v: any = state.jsplumbData.nodeList.find(
					(v) => v.nodeId === targetId
				);
				const line: any = state.jsplumbData.lineList.find(
					(v) => v.sourceId === sourceId && v.targetId === targetId
				);
				v.type = "line";
				v.label = line.label;
				contextmenuLineRef.value.openContextmenu(v, conn);
			}
		);
		// 连线之前
		state.jsPlumb.bind("beforeDrop", (conn: any) => {
			const { sourceId, targetId } = conn;
			const item = state.jsplumbData.lineList.find(
				(v) => v.sourceId === sourceId && v.targetId === targetId
			);
			if (item) {
				ElMessage.warning("关系已存在，不可重复连接");
				return false;
			} else {
				return true;
			}
		});
		// 连线时
		state.jsPlumb.bind("connection", (conn: any) => {
			const { sourceId, targetId } = conn;
			state.jsplumbData.lineList.push({
				sourceId,
				targetId,
				label: "",
			});
			conn.setPaintStyle();
		});
		state.jsPlumb.bind("connectionDrag", function (connection: any) {
			// 禁止节点拖动
			state.jsPlumb.setDraggable(connection.sourceId, false);
			state.jsPlumb.setDraggable(connection.targetId, false);

			connection.setPaintStyle({
				stroke: "#1879ffa1",
				strokeWidth: 3,
				dashstyle: "2 4",
			});
		});
		state.jsPlumb.bind("connectionDragStop", function (connection: any) {
			// 允许节点拖动
			state.jsPlumb.setDraggable(connection.sourceId, true);
			state.jsPlumb.setDraggable(connection.targetId, true);
			connection.setPaintStyle({
				stroke: "#1879ffa1",
				strokeWidth: 2,
				dashstyle: "0",
			});
		});

		// 删除连线时回调函数
		state.jsPlumb.bind("connectionDetached", (conn: any) => {
			const { sourceId, targetId } = conn;
			state.jsplumbData.lineList = state.jsplumbData.lineList.filter(
				(line) => {
					if (line.sourceId == sourceId && line.targetId == targetId) {
						return false;
					}
					return true;
				}
			);
		});
		loading.value = false;
	});
};

// 初始化节点、线的链接
const initJsPlumbConnection = () => {
	state.jsplumbData.nodeList.forEach((v) => {
		// 整个节点作为source或者target
		state.jsPlumb.makeSource(v.nodeId, state.jsplumbMakeSource);
		// 整个节点作为source或者target
		state.jsPlumb.makeTarget(
			v.nodeId,
			state.jsplumbMakeTarget,
			jsplumbConnect
		);
		// 设置节点可以拖拽（此处为id值，非class）
		state.jsPlumb.draggable(v.nodeId, {
			// 拖拽限制到 父元素内
			containment: "parent",
			stop: (el: any) => {
				state.jsplumbData.nodeList.forEach((v) => {
					if (v.nodeId === el.el.id) {
						// 节点x, y重新赋值，防止再次从左侧导航中拖拽节点时，x, y恢复默认
						v.left = `${el.pos[0]}px`;
						v.top = `${el.pos[1]}px`;
					}
				});
			},
		});
	});
	// 线
	state.jsplumbData.lineList.forEach((v) => {
		state.jsPlumb.connect(
			{
				source: v.sourceId,
				target: v.targetId,
				label: v.label,
			},
			state.jsplumbConnect
		);
	});
};
// 左侧导航-菜单标题点击
const onTitleClick = (val: any) => {
	val.isOpen = !val.isOpen;
};
// 右侧内容区-当前项点击
const onItemCloneClick = (k: number) => {
	state.jsPlumbNodeIndex = k;
};
// 右侧内容区-当前项双击
const onDbItemCloneClick = () => {
	nodeInfoView.value?.openNodeInfo();
};
// 右侧内容区-当前项右键菜单点击
const onContextmenu = (v: any, k: number, e: MouseEvent) => {
	state.jsPlumbNodeIndex = k;
	const { clientX, clientY } = e;
	state.dropdownNode.x = clientX;
	state.dropdownNode.y = clientY;
	v.type = "node";
	v.label = "";
	let item: any = {};
	state.leftNavList.forEach((l) => {
		if (l.children)
			if (l.children.find((c: any) => c.id === v.id))
				item = l.children.find((c: any) => c.id === v.id);
	});
	v.from = item.form;
	contextmenuNodeRef.value.openContextmenu(v);
};

// 右侧内容区-当前项右键菜单点击回调(节点)
const onCurrentNodeClick = (item: any) => {
	const { contextMenuClickId, nodeId } = item;
	if (contextMenuClickId === 0) {
		const nodeIndex = state.jsplumbData.nodeList.findIndex(
			(item) => item.nodeId === nodeId
		);
		state.jsplumbData.nodeList.splice(nodeIndex, 1);
		state.jsPlumb.removeAllEndpoints(nodeId);
		state.jsPlumb.remove(nodeId);
		state.jsPlumbNodeIndex = null;
	} else if (contextMenuClickId === 1) {
		drawerRef.value.open(item);
	}
};

// 右侧内容区-当前项右键菜单点击回调(线)
const onCurrentLineClick = (item: any, conn: any) => {
	const { contextMenuClickId } = item;
	const { endpoints } = conn;
	const intercourse: any = [];
	endpoints.forEach((v: any) => {
		intercourse.push({
			id: v.element.id,
			innerText: v.element.innerText,
		});
	});
	item.contact = `${intercourse[0].innerText}(${intercourse[0].id}) => ${intercourse[1].innerText}(${intercourse[1].id})`;
	if (contextMenuClickId === 0) state.jsPlumb.deleteConnection(conn);
	else if (contextMenuClickId === 1) drawerRef.value.open(item, conn);
};

// 设置线的 label
const setLineLabel = (obj: any) => {
	const { sourceId, targetId, label } = obj;
	const conn = state.jsPlumb.getConnections({
		source: sourceId,
		target: targetId,
	})[0];
	conn.setLabel(label);
	if (!label || label === "") {
		conn.addClass("workflow-right-empty-label");
	} else {
		conn.removeClass("workflow-right-empty-label");
		conn.addClass("workflow-right-label");
	}
	state.jsplumbData.lineList.forEach((v) => {
		if (v.sourceId === sourceId && v.targetId === targetId) v.label = label;
	});
};

// 设置节点内容
const setNodeContent = (obj: any) => {
	const { nodeId, name, icon } = obj;
	// 设置节点 name 与 icon
	state.jsplumbData.nodeList.forEach((v) => {
		if (v.nodeId === nodeId) {
			v.name = name;
			v.icon = icon;
		}
	});
	// 重绘
	nextTick(() => {
		state.jsPlumb.setSuspendDrawing(false, true);
	});
};
// 顶部工具栏-当前项点击
const onToolClick = (fnName: String) => {
	switch (fnName) {
		case "help":
			onToolHelp();
			break;
		case "download":
			onToolDownload();
			break;
		case "submit":
			onToolSubmit();
			break;
		case "copy":
			onToolCopy();
			break;
		case "del":
			onToolDel();
			break;
		case "fullscreen":
			onToolFullscreen();
			break;
	}
};
function overflowChange(isOpen: boolean) {
	const el = document.querySelector(".workflow-left");
	if (isOpen) {
		el?.classList.add("animate__fadeOutLeft");
	} else {
		el?.classList.remove("animate__fadeOutLeft");
		el?.classList.add("swing_move_4");
	}
}
// 顶部工具栏-帮助
const onToolHelp = () => {
	nextTick(() => {
		helpRef.value.open();
	});
};
// 顶部工具栏-下载
const onToolDownload = () => {
	const href =
		"data:text/json;charset=utf-8," +
		encodeURIComponent(JSON.stringify(state.jsplumbData, null, "\t"));
	const aLink = document.createElement("a");
	aLink.setAttribute("href", href);
	aLink.setAttribute("download", `工作流.json`);
	aLink.click();
	aLink.remove();
	ElMessage.success("下载成功");
};
// 顶部工具栏-提交
const onToolSubmit = () => {
	// console.log(state.jsplumbData);
	ElMessage.success("数据提交成功");
};
// 顶部工具栏-复制
const onToolCopy = () => {};
// 顶部工具栏-删除
const onToolDel = () => {
	ElMessageBox.confirm("此操作将清空画布，是否继续？", "提示", {
		confirmButtonText: "清空",
		cancelButtonText: "取消",
	})
		.then(() => {
			state.jsplumbData.nodeList.forEach((v) => {
				state.jsPlumb.removeAllEndpoints(v.nodeId);
			});
			nextTick(() => {
				state.jsplumbData = {
					nodeList: [],
					lineList: [],
				};
				ElMessage.success("清空画布成功");
			});
		})
		.catch(() => {});
};
// 顶部工具栏-全屏
const onToolFullscreen = () => {
	state.jsPlumb.repaintEverything();
};

//  监听窗口变化, 重绘, 保证线条不会错乱 .workflow-area的高度自适应
function readyAreaHeight() {
	const el = <HTMLDivElement>document.querySelector(".workflow-area");
	const scrollHeight = el.scrollHeight; // 画布高度,如没有被卷去的高度，则使用css min-height: 100%;

	nextTick(() => {
		el.style.height = `${scrollHeight}px`;
		state.jsPlumb.repaintEverything();
	});
	window.addEventListener("resize", readyAreaHeight);
}

// 页面加载时
onMounted(async () => {
	await initLeftNavList();
	initSortable();
	setTimeout(() => {
		initJsPlumb();
		readyAreaHeight();
	}, 300);
	setClientWidth();
	window.addEventListener("resize", setClientWidth);
	// 在dom加载完后执行，不使用动态导入方式
	// handleDiagramInteraction(".workflow-right");
});
// 页面卸载时
onUnmounted(() => {
	window.removeEventListener("resize", setClientWidth);
});
</script>

<style scoped lang="scss">
.workflow-container {
	position: relative;
	width: 100%;
	height: 100%;

	.workflow {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;

		.workflow-content {
			display: flex;
			width: 100%;
			height: calc(100% - 35px);
			background-size: 10px 10px;
			background-image: linear-gradient(
					90deg,
					rgb(255 214 156 / 15%) 10%,
					rgb(0 0 0 / 0%) 10%
				),
				linear-gradient(rgb(156 214 255 / 15%) 10%, rgb(0 0 0 / 0%) 10%);

			.workflow-left {
				overflow: hidden;
				width: 220px;
				height: 100%;
				transition: width 0.3s ease-in-out;
				border-right: 1px solid var(--el-border-color-light);

				&.overflow {
					overflow: hidden;
					width: 0;
				}

				:deep(.el-collapse-item__content) {
					padding-bottom: 0;
				}

				&-title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 10px;
					height: 50px;
					color: var(--el-text-color-primary);
					border-top: 1px solid var(--el-border-color-light);
					cursor: pointer;

					span {
						white-space: nowrap;
						flex: 1;
					}
				}

				.workflow-left-item {
					position: relative;
					display: flex;
					display: inline-block;
					justify-content: space-between;
					align-items: center;
					overflow: hidden;
					margin-left: 10px;
					width: calc(50% - 15px);
					cursor: move;

					&-icon {
						display: flex;
						align-items: center;
						justify-content: space-around;
						padding-left: 5px;
						margin-bottom: 5px;
						height: 35px;
						background: var(--color-border-lighter);
						border: 1px dashed transparent;
						border-radius: 3px;
						transition: all 0.3s ease;

						.name {
							overflow: hidden;
							min-width: 59px;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: var(--el-text-color-secondary);
							transition: all 0.3s ease;
						}
						&:hover {
							border: 1px dashed #49a2ff;
							border-radius: 5px;
							transition: all 0.3s ease;
						}
					}
				}

				.workflow-left .workflow-left-id:first-of-type {
					.workflow-left-title {
						border-top: none;
					}
				}
			}

			.workflow-right {
				width: calc(100% - 220px);
				position: relative;
				overflow: auto;
				height: 100%;
				flex: 1;

				.workflow-area {
					position: relative;
					min-width: 1440px;
					min-height: 100%;

					.area {
						display: flex;
						width: 100%;
						height: 100%;

						.workflow-item {
							position: relative;
							flex: 1;
							min-width: 380px; /* 重要 */
							height: 100%;
							border-left: 1px dashed #b5b0b0;
							&:first-child {
								border-left: none !important;
							}

							&-title {
								width: 100%;
								height: 35px;
								line-height: 35px;
								text-align: center;
								color: #fff;
								background-color: var(--el-bg-primary);
								font-weight: 400;
							}

							&-content {
								position: absolute;
								top: 35px;
								left: 0;
								width: 100%;
								min-height: calc(100% - 35px);
							}
						}
					}
				}

				.workflow-right-title {
					top: 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 1153px;
					height: 35px;
					color: #fff;
					background-color: #49a2ff;
					font-weight: 400;

					span {
						flex: 1;
						text-align: center;
					}
				}

				.workflow-right-clone {
					position: absolute;
					overflow: hidden;
					min-width: 120px;
					text-overflow: ellipsis;
					white-space: nowrap;

					.workflow-right-box {
						position: relative;
						align-items: center;
						padding: 0 10px;
						min-width: 120px;
						height: 35px;
						color: var(--el-text-color-secondary);
						background: var(--el-color-white);
						border: 1px solid #49a2ff;
						border-radius: 5px;
						transition: all 0.3s ease;
						cursor: move;

						&-icon {
							display: flex;
							align-items: center;
							height: 35px;
							.workflow-icon-link {
								position: absolute;
								z-index: 99999;
								left: 8%;
								width: 12px;
								height: 100%;
								cursor: crosshair;
							}
						}
						&:hover {
							background: var(--el-color-primary-light-9);
							border: 1px dashed #49a2ff;
							transition: all 0.3s ease;
						}
					}

					.workflow-right-active {
						color: #49a2ff;
						background: var(--el-color-primary-light-9);
						border: 1px dashed #49a2ff;
					}
				}

				:deep(.jtk-overlay):not(.aLabel) {
					padding: 4px 10px;
					font-size: 10px;
					color: #fff !important;
					background: #000 !important;
					border: 1px solid #ebeef5 !important;
					border-radius: 3px;
				}

				:deep(.jtk-overlay.workflow-right-empty-label) {
					display: none;
				}
			}
		}
	}

	.workflow-mask {
		position: absolute;
		inset: 0;
	}
}
// 左侧导航进入动画
.swing_move_4 {
	-webkit-animation: swing_move_4 1s;
}
@-webkit-keyframes swing_move_4 {
	0% {
		opacity: 0;
		-webkit-transform: translateX(-480px);
	}
	25% {
		opacity: 1;
		-webkit-transform: translateX(40px);
	}
	40% {
		-webkit-transform: translateX(-18px);
	}
	55% {
		-webkit-transform: translateX(8px);
	}
	70% {
		-webkit-transform: translateX(-5px);
	}
	85% {
		-webkit-transform: translateX(2px);
	}
	100% {
		-webkit-transform: translateX(0);
	}
}

// 左侧导航退出动画
.animate__fadeOutLeft {
	-webkit-animation: fadeOutLeft 0.2s linear forwards;
}
@-webkit-keyframes fadeOutLeft {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		display: none;
	}
}
</style>
