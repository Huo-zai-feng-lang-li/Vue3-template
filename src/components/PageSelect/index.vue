<template>
	<div>
		<!-- 下拉分页选择框 Component -->
		<el-select
			class="w100 page-select-popper"
			v-model="selected"
			size="default"
			@change="onChange"
			@visible-change="onChange"
			clearable
			filterable
			v-bind="$attrs"
			popper-class="page-select-popper"
		>
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			>
			</el-option>
			<!-- 分页和当前页/总页数 -->
			<div class="pagination-container">
				<el-button
					@click="handleCurrentChange(currentPage - 1)"
					:disabled="currentPage <= 1"
					size="small"
				>
					上一页
				</el-button>
				<span class="pagination-info"
					>{{ currentPage }}/{{ totalPage }}</span
				>
				<el-button
					@click="handleCurrentChange(currentPage + 1)"
					:disabled="currentPage >= totalPage"
					size="small"
				>
					下一页
				</el-button>
			</div>
		</el-select>
	</div>
</template>

<script setup lang="ts">
import { AxiosResponse } from "axios";
import { ref, computed, watch, onMounted, toRefs } from "vue";

interface Props {
	requestMethod: (data: object) => Promise<AxiosResponse<any>>;
	label: string;
	value: string;
	requestParams: any;
	teleported?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	label: "label",
	value: "value",
	requestParams: {},
	teleported: false,
});
const { requestMethod, label, value, requestParams } = toRefs(props);

const selected = ref(""); // 选中的任务
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const options = ref<{ label: string; value: string }[]>([]); // 下拉选项
const dataList = ref<any[]>([]);
// 获取数据
const generateOptions = async (pageNum: number, pageSize: number) => {
	try {
		const res = await requestMethod.value({
			pageNum,
			pageSize,
			...requestParams.value,
		});
		total.value = res.data.total;
		dataList.value = res.data.list;
		const options = res.data.list.map((item: any) => ({
			label: item[label.value],
			value: item[value.value],
		}));
		return options;
	} catch (error) {
		return [];
	}
};

// 更新下拉选项
const updateOptions = async (pageNum: number, pageSize: number) => {
	options.value = await generateOptions(pageNum, pageSize);
};

// 处理页码变化
const handleCurrentChange = async (newPage: number) => {
	// 判断是否在合法的页码范围内
	if (newPage >= 1 && newPage <= totalPage.value) {
		// 更新当前页
		currentPage.value = newPage;
		// 更新下拉选项
		await updateOptions(newPage, pageSize.value);
	}
};

// 计算总页数
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));

// 监听currentPage变化，以便于重新生成选项
watch(currentPage, async (newPage) => {
	await updateOptions(newPage, pageSize.value);
});

interface Emits {
	(e: "change", data: any): void;
	(e: "modelValue:update", value: any): void;
}
const emits = defineEmits<Emits>();

const onChange = (val: boolean) => {
	if (val) return;
	const data = dataList.value.find(
		(item) => item[value.value] === selected.value
	);
	if (data) {
		emits("change", data || {});
		emits("modelValue:update", selected.value);
	}
};

onMounted(async () => {
	// 初始化下拉选项
	await updateOptions(currentPage.value, pageSize.value);
});
</script>

<style scoped lang="scss">
:deep(.el-select) {
	position: relative;
}
:deep(.el-select-dropdown) {
	.el-scrollbar__wrap {
		padding-bottom: 22px;
	}
}
.pagination-container {
	margin: 5px;
	.pagination-info {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 0 5px;
		padding: 0 3px;
		width: 50px;
		text-align: center;
		border: 1px solid #e6e6e6;
	}
}
</style>
