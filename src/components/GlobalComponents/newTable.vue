<template>
	<div class="container">
		<el-card shadow="hover">
			<el-scrollbar
				max-height="300px"
				v-if="isShowSearchRegion"
				class="wrap"
			>
				<slot name="search"></slot>
			</el-scrollbar>
			<el-table
				v-bind="$attrs"
				stripe
				style="width: 100%"
				:data="tableData"
				:border="tableBorder"
				:height="excludeSearchAreaAfterTableHeight"
			>
				<template #empty>
					<el-empty :image-size="emptyImgSize" description="暂无数据" />
				</template>

				<el-table-column
					type="index"
					label="序号"
					min-width="60"
					:index="orderHandler"
					align="center"
				/>

				<el-table-column
					v-for="item in tableHeader"
					v-bind="item"
					:key="item.prop"
				>
					<template #default="{ row }" v-if="item.slotKey">
						<template v-if="item.slotKey.includes('default')">
							<el-link
								type="primary"
								:underline="false"
								@click="handleEdit(row)"
								>编辑</el-link
							>
							<el-popconfirm
								title="确定删除吗？"
								@confirm="handleDelete(row.id)"
							>
								<template #reference>
									<el-link
										class="ml15"
										type="danger"
										:underline="false"
										>删除</el-link
									>
								</template>
							</el-popconfirm>
						</template>
						<slot
							v-for="slot in item.slotKey.split(',')"
							:name="slot"
							:row="row"
						></slot>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页 -->
			<el-pagination
				v-if="paginationFlag"
				background
				:page-sizes="pageSizesArr"
				:current-page="pageNum"
				:page-size="pageSize"
				:layout="layout"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import myEmits from "./newTableConfig/emits";
import myProps from "./newTableConfig/props";

const emits = defineEmits(myEmits);
const props = defineProps(myProps);

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

// 搜索区域高度及默认值
const Height = ref();
// 减去搜索区域高度后的table
const excludeSearchAreaAfterTableHeight = ref("calc(100vh - 165px)");

// 获取表格高度-动态计算搜索框高度（onMounted、resize，208是已知的面包屑tebView高度）
const updateHeight = () => {
	let wrapEl = document.querySelector(".wrap") as HTMLDivElement | null;
	if (!wrapEl) return;
	Height.value = wrapEl.getBoundingClientRect().height;
	if (props.isShowSearchRegion) {
		excludeSearchAreaAfterTableHeight.value = `calc(100vh - ${
			165 + Height.value
		}px)`;
	}
};
onMounted(() => {
	// 表格下拉动画
	const tableContainer = <HTMLElement>document.querySelector(".container");
	setTimeout(() => {
		if (tableContainer) tableContainer.style.transform = "translateY(0)";
		updateHeight();
	}, 300);
});
window.addEventListener("resize", updateHeight);
</script>

<style scoped lang="scss">
.container {
	padding: 15px;
	transform: translateY(-100%);
	transition: transform 0.5s;
	// background-color: #870404;
	background-color: #f8f8f8;
	.el-scrollbar {
		// border: 1px solid pink;
		min-height: 100px;
		width: 100%;
		height: fit-content;
	}
	.el-card {
		width: 100%;
		height: 100%;
	}

	.el-pagination {
		margin-left: 15%;
		height: 35px;
		margin-top: 16px;
	}
}
// 穿透父组件
:deep(.el-link) {
	padding-left: 10px;
}
</style>
