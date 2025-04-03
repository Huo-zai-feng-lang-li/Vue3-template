<template>
	<div class="container">
		<!-- 表单搜索区域 -->
		<el-scrollbar
			v-if="isShowSearchRegion"
			max-height="300px"
			class="scrollbar-height"
		>
			<slot name="search"></slot>
		</el-scrollbar>

		<!-- 表格上方搜索向下方按钮区域 -->
		<slot name="btn"></slot>

		<!-- 列表区域 v-bind="xx"放在最下方，父组件传值可以覆盖上面定义的默认值-->
		<!-- 父组件传递的属性（通过 $attrs 或显式传递的 prop）能够覆盖子组件内部的默认设置，应该确保 v-bind 放在最后 -->
		<el-table
			ref="multipleTableRef"
			stripe
			style="width: 100%"
			:data="filterTableData"
			:border="tableBorder"
			:style="{
				height: tableHeight || excludeSearchAreaAfterTableHeight,
				minHeight: minHeight + 'px',
			}"
			:row-key="(row) => row[rowKey]"
			@row-click="handleRowClick"
			@selection-change="onSelectionChange"
			lazy
			:load="handleLazyLoad"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			v-bind="$attrs"
		>
			<template #empty>
				<el-empty :image-size="emptyImgSize" description="暂无数据" />
			</template>

			<el-table-column
				v-if="isSelection"
				type="selection"
				width="60"
				:reserve-selection="true"
				:selectable="selectableCallback"
			/>
			<el-table-column v-if="isRadio" width="60" label="单选" align="center">
				<template #default="{ row }">
					<el-radio :label="row.id" v-model="selectRadioIdVm" />
				</template>
			</el-table-column>

			<el-table-column
				v-if="isSerialNo"
				type="index"
				label="序号"
				min-width="60"
				:index="orderHandler"
				align="center"
			/>
			<el-table-column
				v-for="item in tableHeader"
				:key="item.prop"
				:fixed="item.label === '操作' ? 'right' : void 0"
				align="center"
				header-align="center"
				min-width="180"
				:show-overflow-tooltip="item.label !== '操作'"
				v-bind="item"
			>
				<template
					#header
					v-if="item.slotKey?.includes('tableHeaderSearch')"
				>
					<el-input
						class="search-input"
						v-model.trim="headerSearch"
						size="small"
						:placeholder="'搜索' + getSearchInfo.label"
					/>
				</template>
				<template #default="{ row }" v-if="item.slotKey">
					<slot
						v-for="slot in item.slotKey.split(',')"
						:name="slot"
						:row="row"
					></slot>
					<template v-if="item.slotKey.includes('default')">
						<zw-permission-button
							v-if="isDetail"
							permission="detail"
							type="primary"
							@zwClick="handleDetail(DialogType.Detail, row)"
							>详情</zw-permission-button
						>
						<zw-permission-button
							permission="update"
							type="primary"
							@zwClick="handleEdit(DialogType.Edit, row)"
							>编辑</zw-permission-button
						>
						<el-popconfirm
							title="确定删除吗？"
							@confirm="handleDelete(row[handleDeletePayloadComputed])"
						>
							<template #reference>
								<zw-permission-button permission="delete" type="danger"
									>删除</zw-permission-button
								>
							</template>
						</el-popconfirm>
					</template>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页区域-->
		<el-pagination
			v-if="paginationFlag"
			background
			:page-sizes="pageSizesArr"
			:current-page="pageNum"
			:page-size="pageSize"
			:layout="layout"
			:total="Number(total || 0)"
			popper-class="pagination-popper"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		></el-pagination>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, toRaw, nextTick, computed } from "vue";
import { ElTable } from "element-plus";
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
import { DialogType } from "./newTableConfig/type";

import myEmits from "./newTableConfig/emits";
import myProps from "./newTableConfig/props";
const emits = defineEmits(myEmits);
const props = defineProps(myProps);
const headerSearch = ref(""); //表头搜索Vm

const selectRadioIdVm = ref(""); // 单选框vm
const selectedRowData = ref({}); // 当前行数据
// 行点击事件-实现点击行也可以选中单选
const handleRowClick = (row: any) => {
	if (props.isRadio) {
		selectRadioIdVm.value = row.id; // 选中单选按钮
		selectedRowData.value = row; // 拿取当前行数据
		emits("selectRowData", selectedRowData.value);
	}
};
//  懒加载事件
const handleLazyLoad = (
	row: any,
	treeNode: unknown,
	resolve: (data: any[]) => void
) => {
	emits("handleLazyLoad", row, treeNode, resolve);
};
// 搜索过滤
const filterTableData = computed(() =>
	props.tableData?.filter(
		(data) =>
			!headerSearch.value ||
			String(data[getSearchInfo.value.prop])
				.toLowerCase()
				.includes(headerSearch.value.toLowerCase())
	)
);
// 计算那列用于展示搜索
const getSearchInfo = computed(() => {
	let searchInfo = { label: "", prop: "" };
	props.tableHeader?.find((v) => {
		if (v.searchFields) {
			searchInfo = { label: v.label, prop: v.prop };
			return true;
		}
	});
	return searchInfo;
});
// 计算删除函数的参数
const handleDeletePayloadComputed = computed(() => {
	const { handleDeletePayload } = props;
	return handleDeletePayload ? handleDeletePayload : "id";
});
// 序号根据数据长度计算
const orderHandler = (index: number) => {
	const { pageNum, pageSize } = props;
	// 第0条 * 每页条数 + 当前索引+1
	return (pageNum - 1) * pageSize + index + 1;
};

//  页数改变
const handleSizeChange = (val: number | string) =>
	emits("handleSizeChange", val);
// 当前页改变
const handleCurrentChange = (val: number | string) =>
	emits("handleCurrentChange", val);

// 编辑、详情、删除
const handleEdit = (type: DialogType, row: object) =>
	emits("handleEdit", type, row);
const handleDetail = (type: DialogType, row: object) =>
	emits("handleDetail", type, row);
const handleDelete = (id: number | string) => emits("handleDelete", id);
// 复选框
const onSelectionChange = (val: any) => emits("selection-table-change", val);

// 根据父组件传递的id字符串，默认选中对应行
const toggleSelection = (rows?: any) => {
	if (props.isSelection) {
		if (rows) {
			rows.forEach((row: any) => {
				const idsArr = props.selectionIds?.split(",");
				if (idsArr?.includes(row[props.rowKey].toString())) {
					//重要
					nextTick(() =>
						multipleTableRef.value?.toggleRowSelection(row, true)
					);
				}
			});
		} else {
			multipleTableRef.value!.clearSelection();
		}
	}
};
// 勾选后不可在勾选 - 父组件attribute 添加isDisableSelection
const selectableCallback = (row: any) => {
	const idsArr = props.selectionIds?.split(",");
	if (
		props.isDisableSelection &&
		idsArr?.includes(row[props.rowKey].toString())
	)
		return false;
	return true;
};
watch(
	() => props.tableData,
	(newV) => {
		if (props.selectionIds) {
			// console.log('🤺🤺  selectionIds🚀 ==>:', props.selectionIds);
			// console.log('🤺🤺  newV ==>:', newV);
			toggleSelection(toRaw(newV));
		}
	}
);

// 搜索区域高度及默认值
const Height = ref();
// 减去搜索区域高度后的table，不能有默认值不然会出现滚动条
const excludeSearchAreaAfterTableHeight = ref();
const minHeight = 300; // 表格最小高度
// 获取表格高度-动态计算搜索框高度
const updateHeight = () => {
	let wrapEl = document.querySelector(".scrollbar-height");
	if (!wrapEl) return;
	// 获取搜索区域高度
	Height.value = wrapEl.clientHeight;
	if (props.isShowSearchRegion) {
		const calculatedHeight = `calc(100vh - ${200 + Height.value}px)`;
		// 确保元素的高度不会小于一个最小值
		excludeSearchAreaAfterTableHeight.value = `max(${minHeight}px, ${calculatedHeight})`;
	}
};

onMounted(() => {
	// 表格下拉动画
	const tableContainer = document.querySelectorAll<HTMLElement>(".container");
	setTimeout(() => {
		tableContainer.forEach((item) => {
			if (item) item.style.transform = "translateY(0)";
		});
		updateHeight();
	}, 800);
});

window.addEventListener("resize", updateHeight, {
	passive: true,
});
defineExpose({
	toggleSelection,
	handleLazyLoad,
});
</script>

<style scoped lang="scss">
.container {
	overflow-x: hidden;
	height: calc(100vh - 75px); // 列表最外层的高度
	padding: 15px 15px 0 15px;
	margin: 15px;
	box-sizing: border-box;
	border-radius: 5px;
	border: 1px solid #e6e6e6;
	background-color: #fff;
	// background-color: #870404;

	transform: translateY(-110%);
	transition: transform 0.6s ease-in-out, box-shadow 0.3s ease-in-out,
		background-color 0.3s ease-in-out;
	// 滚动条Start
	&::-webkit-scrollbar,
	&::-webkit-scrollbar-button,
	&::-webkit-scrollbar-corner {
		width: 6px;
		border: none;
		outline: none;
	}
	&::-webkit-scrollbar-thumb,
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	// 作用是在容器(.container),:hover写在谁后则作用于此元素
	&:hover::-webkit-scrollbar-track,
	&:hover::-webkit-scrollbar-thumb {
		background-color: #cfd1d4;
	}
	&::-webkit-scrollbar-thumb:hover {
		cursor: pointer;
		background-color: #c0c1c4;
	}
	// 滚动条End

	&:hover {
		overflow-y: auto; // 悬停时显示滚动条
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	}

	.scrollbar-height {
		min-height: 80px;
		height: initial;
	}

	.el-pagination {
		overflow: hidden;
		display: flex;
		overflow: auto;
		align-items: center;
		justify-content: center;
		// background-color: rgb(225, 210, 210);
		padding: 15px 0;
		// margin-top: 15px;
		// padding: 15px;
	}
}

:deep(.el-table tbody tr .cell) {
	padding-top: 10px;
	padding-bottom: 10px;
	/* 保留换行
	 el-table-column打开了show-overflow-tooltip，换行不会生效
	*/
	// white-space: break-spaces;
}

// :deep(.el-popper.is-dark) {
// 	max-width: 700px !important;
// 	word-break: break-all;
// }

// 操作按钮间隙
:deep(.el-link) {
	padding-left: 10px;
}
/* 单选框隐藏label文字 */
:deep(.el-radio.el-radio--large .el-radio__label) {
	display: none;
}
</style>
