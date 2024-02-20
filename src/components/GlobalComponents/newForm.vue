<template>
	<el-form ref="searchFormRef" :model="searchForm" size="default">
		<!-- 使用了不稳定的 key，可能会导致一些不可预期的行为，比如输入框失去焦点。 -->
		<el-row>
			<el-col
				:xs="24"
				:sm="24"
				:md="24"
				:lg="12"
				:xl="6"
				v-for="item in formOptions"
				:key="item.vm"
			>
				<el-form-item :label="item.props.label" :prop="item.vm">
					<el-input
						v-if="item.type === FormOptionsType.INPUT"
						v-model.lazy.trim="searchForm[item.vm]"
						v-bind="item.props"
						class="ml10 w100"
					></el-input>

					<el-select
						v-if="item.type === FormOptionsType.SELECT"
						v-model.lazy="searchForm[item.vm]"
						v-bind="item.props"
						class="ml10 w100"
						fit-input-width
					>
						<el-option label="全部" value="全部"></el-option>
						<el-option
							v-for="option in item.selectOptions"
							:key="option.value"
							:label="option.label"
							:value="option.value"
						>
						</el-option>
					</el-select>

					<el-cascader
						v-if="item.type === FormOptionsType.CASCADER"
						v-model.lazy="searchForm[item.vm]"
						:options="item.cascaderOptions"
						v-bind="item.props"
						class="ml10 w100"
					/>

					<el-date-picker
						v-if="item.type === FormOptionsType.DATE_PICKER"
						v-model.lazy="searchForm[item.vm]"
						v-bind="item.props"
						class="ml10 w100"
					></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6" class="xs-mt">
				<el-form-item style="margin-left: 10px">
					<el-button @click="onSearch('reset')"> 重置 </el-button>
					<el-button type="primary" @click="onSearch()"> 查询 </el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script setup lang="ts" name="newForm">
import { toRefs, onBeforeUnmount, ref } from "vue";
import type { PropType } from "vue";
import { type FormInstance } from "element-plus";
import { debounce } from "@/utils/debounce";
const searchFormRef = ref<FormInstance>();

enum FormOptionsType {
	INPUT = "input", // 输入框
	SELECT = "select", // 下拉框
	CASCADER = "cascader", // 级联选择器
	DATE_PICKER = "date-picker", // 日期选择器
}

const props = defineProps({
	formOptions: {
		type: Array as PropType<FormOptions[]>,
		required: true,
	},
	searchForm: {
		type: Object as PropType<SearchFormType>,
		required: true,
	},
});
const { formOptions, searchForm } = toRefs(props);

const emit = defineEmits(["search"]);
const debouncedEmitSearch = debounce((type) => emit("search", type));
const onSearch = (type?: string) => {
	if (type) searchFormRef.value?.resetFields();
	debouncedEmitSearch(type);
};

onBeforeUnmount(() => searchFormRef.value?.resetFields());
defineExpose({ searchFormRef });
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
	margin-left: 10px;
}
</style>

<style scoped lang="scss">
:deep(.el-form-item__label) {
	margin-left: 10px;
}
</style>
