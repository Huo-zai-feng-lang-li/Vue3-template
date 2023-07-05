<template>
	<el-form ref="searchFormRef" :model="searchForm" size="default">
		<!-- 公共搜索组件page -->
		<el-row :gutter="20">
			<el-col :span="6" v-for="item in options" :key="item.data.field">
				<el-form-item :label="item.props.label">
					<template v-if="item.type === FormItemType.INPUT">
						<el-input
							v-model="searchForm[item.data.field]"
							v-bind="item.props"
							@change="change"
						></el-input>
					</template>
					<template v-if="item.type === FormItemType.SELECT">
						<el-select
							v-model="searchForm[item.data.field]"
							v-bind="item.props"
						>
							<el-option
								v-for="option in item.data.options"
								:key="option.value"
								:label="option.label"
								:value="option.value"
							/>
						</el-select>
					</template>
					<template v-if="item.type === FormItemType.CASCADER">
						<el-cascader
							v-model="searchForm[item.data.field]"
							:options="item.data.cascaderOptions"
							:props="item.props"
						/>
					</template>
					<template v-if="item.type === FormItemType.DATE_PICKER">
						<el-date-picker
							v-model="searchForm[item.data.field]"
							v-bind="item.props"
						/>
					</template>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item>
					<el-button @click="reset">重置</el-button>
					<el-button type="primary" @click="search">搜索</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import request from '/@/utils/request';
enum FormItemType {
	INPUT = 'input',
	SELECT = 'select',
	CASCADER = 'cascader',
	DATE_PICKER = 'date-picker',
}
type FormItemProps = {
	label: string; // 必填项，表单项名称
	// placeholder?: string; // 表单项的占位符，默认: 请输入
	type: string; // 主要针对与同样的组件不同的type，例如日期选择组件
	[key: string]: string;
};
type FormItemData = {
	field: string; // 必填项，表单项对应的字段
	url?: string; // 请求的地址，常用于需要远程搜索的场景
	options?: SelectOptionType[]; // 下拉选框options
	cascaderOptions?: []; // 级联选择的options
	$queryFormatter?: (data: any) => void; // 请求参数格式自定义设置
	$responseFormatter?: (data: any) => void; // 涉及到远程搜索的表单项，响应成功后提供钩子函数可以自定义显示内容
};
// 表单项类型
type FormItem = {
	type: string; // 必填项，需要什么类型的formitem
	props: FormItemProps; // 表单项提供的props，例如label、placeholder
	data: FormItemData; // 表单项对应的一些自定义的配置项，例如field
};
// 其他配置项
type FormOption = {
	searchUrl: string; // 必传项，搜索的API
	searchType?: string; // 非必传项，默认get，请求类型 get post...
	pageNum: number; // 当前页
	pageSize: number; // 一次请求多少条数据
};
// 表单接口
interface Form {
	formOptions: FormItem[]; //必传项， 表单项列表
	options: FormOption; // 其他配置项
}
// emits接口
interface Emits {
	(e: 'search', data: any): void;
	(e: 'reset'): void;
	(e: 'change'): void;
}

// props不要用结构赋值的方式，会破坏其响应式
const props = defineProps<Form>();

// emits
const emits = defineEmits<Emits>();

// data
const searchForm = reactive({});
const searchFormRef = ref<FormInstance>();

// 计算属性
const options = computed(() => {
	return props.formOptions;
});

// 暴露出去一些方法供父组件调用
defineExpose({ search });

// Life cycle
onMounted(() => {
	props.formOptions.map((item) => {
		searchForm[item.data.field] = '';
	});
});

onBeforeUnmount(() => {
	searchFormRef.value?.resetFields();
});

// methods
/**
 * @description 搜索请求，将搜索出来的结果emit出去，供外部使用
 * @author wangguodong
 * @createDate 2023/06/29 10:44:16
 * @lastFixDate 2023/06/29 10:44:16
 */
async function search() {
	const params = {
		page: props.options.pageNum,
		pageSize: props.options.pageSize,
		...searchForm,
	};
	const { data = {} } = await request[props.options.searchType || 'get'](
		props.options.searchUrl,
		params
	);
	emits('search', data);
}
/**
 * @method 重置
 * @description 重置表单，同时emit出去，方便父组件修改page
 * @author wangguodong
 * @createDate 2023/06/29 11:20:19
 * @lastFixDate 2023/06/29 11:20:19
 */
function reset() {
	searchFormRef.value?.resetFields();
	emits('reset');
}
/**
 * @method change
 * @description 当表单项发生变化时，执行search
 * @author wangguodong
 * @createDate 2023/06/29 12:54:14
 * @lastFixDate 2023/06/29 12:54:14
 */
function change() {
	emits('change');
}
</script>
<style lang="scss" scoped></style>
