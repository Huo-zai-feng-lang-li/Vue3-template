<template>
	<div class="container">
		<div class="container-main">
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

			<!-- 列表区域 v-bind="xx"放在最下方，如果父组件传值可以覆盖上面定义的默认值-->
			<!-- 父组件传递的属性（通过 $attrs 或显式传递的 prop）能够覆盖子组件内部的默认设置，你应该确保 v-bind 放在最后 -->
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
				:row-key="(row) => row.id"
				@selection-change="onSelectionChange"
				v-bind="$attrs"
			>
				<template #empty>
					<el-empty :image-size="emptyImgSize" description="暂无数据" />
				</template>

				<el-table-column
					type="selection"
					width="60"
					v-if="isSelection"
					:reserve-selection="true"
					:selectable="selectableCallback"
				/>

				<el-table-column
					type="index"
					label="序号"
					min-width="60"
					:index="orderHandler"
					align="center"
				/>
				<el-table-column
					v-for="item in tableHeader"
					:key="item.prop"
					header-align="center"
					align="center"
					:fixed="item.label === '操作' ? 'right' : void 0"
					:min-width="item.label === '操作' ? '80' : void 0"
					v-bind="item"
					show-overflow-tooltip
				>
					<template
						#header
						v-if="item.slotKey?.includes('tableHeaderSearch')"
					>
						<el-input
							v-model.trim="search"
							size="small"
							:placeholder="getSearchInfo.label"
						/>
					</template>

					<template #default="{ row }" v-if="item.slotKey">
						<slot
							v-for="slot in item.slotKey.split(',')"
							:name="slot"
							:row="row"
						></slot>
						<template v-if="item.slotKey.includes('default')">
							<el-link
								type="primary"
								:underline="false"
								@click="handleEdit(row)"
								>编辑
							</el-link>
							<el-popconfirm
								title="确定删除吗？"
								@confirm="handleDelete(row.id)"
							>
								<template #reference>
									<el-link type="danger" :underline="false"
										>删除</el-link
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
				:total="total"
				popper-class="pagination-popper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, toRaw, nextTick, computed } from "vue";
import { ElTable } from "element-plus";
const multipleTableRef = ref<InstanceType<typeof ElTable>>();

import myEmits from "./newTableConfig/emits";
import myProps from "./newTableConfig/props";
const emits = defineEmits(myEmits);
const props = defineProps(myProps);
const search = ref("");

// 搜索过滤
const filterTableData = computed(() =>
	props.tableData?.filter(
		(data) =>
			!search.value ||
			String(data[getSearchInfo.value.prop])
				.toLowerCase()
				.includes(search.value.toLowerCase())
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

// 编辑、删除
const handleEdit = (row: object) => emits("handleEdit", row);
const handleDelete = (id: number) => emits("handleDelete", id);
// 复选框
const onSelectionChange = (val: any) => emits("selection-table-change", val);

// 根据父组件传递的id字符串，默认选中对应行
const toggleSelection = (rows?: any) => {
	if (props.isSelection) {
		if (rows) {
			rows.forEach((row: any) => {
				const idsArr = props.selectionIds?.split(",");
				if (idsArr?.includes(row.id.toString())) {
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
// 返回值用来决定这一行的 CheckBox 是否可以勾选
const selectableCallback = (row: any) => {
	const idsArr = props.selectionIds?.split(",");
	if (props.isDisableSelection && idsArr?.includes(row.id.toString()))
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
const minHeight = 500; // 最小高度值

// 获取表格高度-动态计算搜索框高度（onMounted、resize，208是已知的面包屑tebView高度）
const updateHeight = () => {
	let wrapEl = document.querySelector(".scrollbar-height");
	if (!wrapEl) return;
	Height.value = wrapEl.scrollHeight;
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

window.addEventListener("resize", updateHeight);
defineExpose({
	toggleSelection,
});
</script>

<style scoped lang="scss">
.container {
	// width: 100%;
	// height: 100%;
	padding: 15px;
	transform: translateY(-100%);
	transition: transform 0.4s ease-in-out;
	background-color: #f8f8f8;
	// background-color: #870404;

	&-main {
		position: relative;
		padding: 15px;
		//width: 100%;
		// height: 100%; //el-scrollbar有默认高度100%，当页面列表渲前会继承这里高度，导致搜索区域铺满全屏
		background-color: #fff;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		&:hover {
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		}
		transition: box-shadow 0.3s ease-in-out;
		.scrollbar-height {
			min-height: 100px;
		}

		.el-pagination {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20px;
		}
	}
}
// 穿透父组件
:deep(.el-link) {
	padding-left: 10px;
}
:deep(.el-table tbody .cell) {
	// 用户在表格内填写内容时有换行，在展示表格时将换行体现出来
	white-space: break-spaces;
	padding-top: 10px;
	padding-bottom: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

:deep(.el-popper.is-dark) {
	max-width: 700px !important;
	word-break: break-all;
}
</style>
