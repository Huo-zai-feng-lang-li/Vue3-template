<template>
	<el-form ref="searchFormRef" :model="searchForm" size="default">
		<!-- 使用了不稳定的 key，可能会导致一些不可预期的行为，比如输入框失去焦点。 -->
		<el-row>
			<transition-group name="fade">
				<el-col
					v-for="(item, index) in formOptions"
					:key="item.vm"
					v-show="index < 4 || showAll"
					:xs="24"
					:sm="24"
					:md="24"
					:lg="12"
					:xl="6"
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
							@change="selectChange(item)"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="option in item.selectOptions"
								:key="option.value"
								:label="option.label"
								:value="option.value"
							>
								<zk-tooltip :content="option.label">
									<span>{{ option.label }}</span>
								</zk-tooltip>
							</el-option>
						</el-select>
						<PageSelect
							v-if="item.type === FormOptionsType.PAGE_SELECT"
							class="w100"
							v-model.lazy="searchForm[item.vm]"
							v-bind="item.props"
							:request-method="item.props.options.requestMethod"
							:request-params="item.props.options.requestParams"
							:label="item.props.options.label || 'label'"
							:value="item.props.options.value || 'value'"
							:teleported="true"
						></PageSelect>
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
						/>
					</el-form-item>
				</el-col>
			</transition-group>
			<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6" class="xs-mt">
				<el-form-item style="margin-left: 10px">
					<el-button @click="onSearch('reset')">
						<zk-icon name="ant-ReloadOutlined"></zk-icon>
						重置
					</el-button>
					<el-button type="primary" @click="onSearch()">
						<zk-icon name="ant-SearchOutlined"></zk-icon>
						查询
					</el-button>
					<el-button
						@click="toggleShowAll"
						v-show="formOptions.length > 4"
					>
						<zk-icon
							:name="showAll ? 'ant-UpOutlined' : 'ant-DownOutlined'"
						></zk-icon>
						{{ showAll ? "收起" : "展开" }}
					</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script setup lang="ts" name="newForm">
import {
	toRefs,
	computed,
	onMounted,
	onBeforeUnmount,
	ref,
	defineAsyncComponent,
} from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import type { PropType } from "vue";
import { type FormInstance } from "element-plus";

import { useFormStore } from "@/store/formStore";
import { debounce } from "@/utils/debounce";

const PageSelect = defineAsyncComponent(
	() => import("@/components/PageSelect/index.vue")
);

const searchFormRef = ref<FormInstance>(); // 搜索表单实例
const showAll = ref(false); //  是否展示全部搜索条件
enum FormOptionsType {
	INPUT = "input", // 输入框
	SELECT = "select", // 下拉框
	CASCADER = "cascader", // 级联选择器
	DATE_PICKER = "date-picker", // 日期选择器
	PAGE_SELECT = "page-select", // 可分页的下拉选择器
}

const route = useRoute();
const basePath = ref(route.path); //基地址-用于判断是否离开当前页面
const formStore = useFormStore();
const searchFormPin = computed({
	get: () => formStore.searchForm,
	set: (value) => formStore.updateSearchForm(value),
});
// 检查是否离开了当前的基路径-离开当前页面时重置表单，而在其子页面中切换时不重置表单
onBeforeRouteLeave((to, _from, next) => {
	// console.log('🤖----- to.path ---->:', to.path);
	if (!to.path.startsWith(basePath.value)) {
		// 如果离开了基路径，重置表单及Pinia表单项存储
		searchFormRef.value?.resetFields();
		formStore.resetSearchForm();
	}
	next();
});

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

const emit = defineEmits(["search", "select-change"]);
const debouncedEmitSearch = debounce((type) => emit("search", type));
const selectChange = (item: any) => emit("select-change", item); // 下拉框change事件
const toggleShowAll = () => (showAll.value = !showAll.value); // 展开收起

//  防抖搜索
const onSearch = (type?: string) => {
	if (type) {
		searchFormRef.value?.resetFields();
		formStore.resetSearchForm();
	}
	debouncedEmitSearch(type);
};

onMounted(() => {
	// 记录当前路径作为基路径-route.path 只包含路径部分，不包括协议、等
	basePath.value = route.path;
	// 需要访问查询参数，可以使用 route.query
	// console.log('🤖-----basePath.value  ---->:', basePath.value);
	Object.assign(searchForm.value, searchFormPin.value);
});
onBeforeUnmount(() => {
	formStore.updateSearchForm(searchForm.value);
});
defineExpose({ searchFormRef });
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
	margin-left: 10px;
}
</style>
