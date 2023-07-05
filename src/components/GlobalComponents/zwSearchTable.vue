<template>
	<div class="zw-search-table">
		<!-- 带搜索表单功能的表格page -->
		<div class="zw-search-table__header mb20">
			<zw-search-form
				ref="searchFormRef"
				:formOptions="formOptions"
				:options="state.options"
				@search="search"
				@reset="reset"
				@change="change"
			></zw-search-form>
		</div>
		<div class="zw-search-table__container">
			<zw-table
				:data="state.data.data"
				:header="tableConfigs.header"
				:param="state.param"
				:config="tableConfig"
				@pageChange="pageChange"
				@sizeChange="sizeChange"
				@delRow="delRow"
				@editRow="editRow"
			></zw-table>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
type TableConfig = {
	header: Array<EmptyArrayType>;
	config: object;
};
interface Props {
	formOptions: object;
	searchUrl: string;
	tableConfigs: TableConfig;
}
interface Emits {
	(e: 'delRow', row: object): void;
	(e: 'editRow', row: object): void;
}

const props = defineProps<Props>();

// emits
const emits = defineEmits<Emits>();

// data
const state = reactive({
	data: {
		total: 1000,
		data: [
			{
				username: '张三',
				department: '事业部',
				charge: '李四',
				auth: 'manager',
			},
			{
				username: '张三',
				department: '事业部',
				charge: '李四',
				auth: 'manager',
			},
			{
				username: '张三',
				department: '事业部',
				charge: '李四',
				auth: 'manager',
			},
			{
				username: '张三',
				department: '事业部',
				charge: '李四',
				auth: 'manager',
			},
		],
	},
	param: {},
	options: {
		searchUrl: props.searchUrl,
		pageNum: 1,
		pageSize: 10,
	},
});
const searchFormRef = ref();

// computed
const tableConfig = computed(() => {
	return {
		...props.tableConfigs.config,
		total: state.data.total,
	};
});

// methods
/**
 * @method search
 * @param data 请求结果集
 * @description 接收搜索后的数据
 * @author wangguodong
 * @createDate 2023/06/30 10:11:40
 * @lastFixDate 2023/06/30 10:11:40
 */
function search(data: object) {
	state.data = data;
}
/**
 * @method reset
 * @description 重置后要重新发起请求，将pageNum重置
 * @author wangguodong
 * @createDate 2023/06/30 10:37:29
 * @lastFixDate 2023/06/30 10:37:29
 */
function reset() {
	state.options.pageNum = 1;
	searchFormRef.value.search();
}
/**
 * @method change
 * @description 搜索条件更新后要重新发起请求，将pageNum重置
 * @author wangguodong
 * @createDate 2023/06/30 10:40:06
 * @lastFixDate 2023/06/30 10:40:06
 */
function change() {
	state.options.pageNum = 1;
	searchFormRef.value.search();
}
/**
 * @method pageChange
 * @param page 当前页
 * @description 当前页变化时，要更新pageNum重新发起请求
 * @author wangguodong
 * @createDate 2023/06/30 10:09:37
 * @lastFixDate 2023/06/30 10:09:37
 */
function pageChange(page: number) {
	state.options.pageNum = page;
	searchFormRef.value.search();
}
/**
 * @method sizeChange
 * @param size 每页显示个数
 * @description 每页显示个数变化时更新pageSize重新请求
 * @author wangguodong
 * @createDate 2023/06/30 10:10:32
 * @lastFixDate 2023/06/30 10:10:32
 */
function sizeChange(size: number) {
	state.options.pageSize = size;
	state.options.pageNum = 1;
	searchFormRef.value.search();
}
/**
 * @method delRow
 * @param row 当前行数据
 * @description 删除行
 * @author wangguodong
 * @createDate 2023/06/30 10:23:20
 * @lastFixDate 2023/06/30 10:23:20
 */
function delRow(row: object) {
	emits('delRow', row);
}
/**
 * @method editRow
 * @param row 当前行数据
 * @description 编辑行
 * @author wangguodong
 * @createDate 2023/06/30 10:27:03
 * @lastFixDate 2023/06/30 10:27:03
 */
function editRow(row: object) {
	emits('editRow', row);
}
</script>
<style lang="scss" scoped>
.zw-search-table {
	padding: 20px;
	&__header {
		background-color: var(--el-color-white);
		padding: 20px;
		border-radius: 6px;
		box-shadow: 0 0 5px #f6e8e8;
	}

	&__container {
		@extend .zw-search-table__header;
	}
}
</style>
