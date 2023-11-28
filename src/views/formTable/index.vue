<template>
	<div class="container-wrapper">
		<!-- 动态 page -->
		<new-table
			:tableHeader="tableHeader"
			:tableData="tableData"
			:pageNum="pageNum"
			:pageSize="pageSize"
			:total="pageTotal"
			@handleSizeChange="onHandleSizeChange"
			@handleCurrentChange="onHandleCurrentChange"
			@handleEdit="onHandleEdit"
			@handleDelete="onHandleDelete"
		>
			<template #search>
				<new-form
					:formOptions="formOptions"
					:searchForm="searchForm"
					@reset="onReset"
					@search="onSearch"
				/>
			</template>

			<template #switch="{ row }">
				<el-switch
					v-model="row.fileStatus"
					active-text="开"
					inactive-text="关"
					:active-value="1"
					:inactive-value="2"
					active-color="#13ce66"
					inactive-color="#ff4949"
					@change="changeSwitchStatus(row.id, row.fileStatus)"
				/>
			</template>
		</new-table>
	</div>
</template>

<script setup lang="ts" name="algorithmRegistrationQuery">
import { onMounted, reactive, toRefs } from "vue";
// import { getTestList } from "/@/api/encryptionAlgorithm/templateDefinition";
// import { STATUS_CODE } from "/@/enum/global";
import type { TableHeader, FormOptions, SearchFormType } from "@/types/global";
const state = reactive({
	//表头数据
	// el-table-column有的属性都可以在这传
	tableHeader: <TableHeader[]>[
		{ label: "姓名", prop: "uname" },
		{ label: "年龄", prop: "age" },
		{ label: "性别", prop: "sex", slotKey: "switch" },
		{ label: "操作", fixed: "right", slotKey: "default" },
	],
	//表项数据
	tableData: [
		{ uname: "小帅", age: "18", sex: "男", status: false, id: 1 },
		{ uname: "小美", age: "148", sex: "女", status: false, id: 2 },
		{ uname: "小明", age: "12", sex: "男", status: true, id: 3 },
		{ uname: "小红", age: "12", sex: "女", status: false, id: 4 },
		{ uname: "小黑", age: "12", sex: "男", status: true, id: 5 },
		{ uname: "小白", age: "12", sex: "女", status: false, id: 6 },
		{ uname: "小黑", age: "12", sex: "男", status: true, id: 7 },
		{ uname: "小白", age: "12", sex: "女", status: false, id: 8 },
		{ uname: "小黑", age: "12", sex: "男", status: true, id: 9 },
		{ uname: "小白", age: "12", sex: "女", status: false, id: 10 },
		{ uname: "小黑", age: "12", sex: "男", status: true, id: 11 },
	],
	formOptions: <FormOptions[]>[
		{
			type: "input",
			props: {
				label: "合规规则",
				placeholder: "请输入合规规则",
				type: "text",
				clearable: true,
			},
			vm: "knowledgeName",
		},
		{
			type: "input",
			props: {
				label: "文件数量",
				placeholder: "请输入文件数量",
				type: "text",
				clearable: true,
			},
			vm: "documentNumber",
		},
		// 下拉选择器
		{
			type: "select",
			props: {
				label: "所属部门",
				placeholder: "请选择",
				clearable: true,
			},
			vm: "department",
			selectOptions: [
				{
					label: "数据安全",
					value: 1,
				},
				{
					label: "研发",
					value: 2,
				},
				{
					label: "事业",
					value: 3,
				},
			],
		},
		// 时间范围选择器
		{
			type: "date-picker",
			props: {
				label: "时间范围",
				type: "datetimerange", // datetimerange范围 datetime日期
				clearable: true,
				"range-separator": "-",
				"start-placeholder": "开始日期",
				"end-placeholder": "结束日期",
				"value-format": "YYYY-MM-DD HH:mm:ss",
			},
			vm: "createTime",
		},

		// 级联选择器
		{
			type: "cascader",
			props: {
				label: "所属部门",
				placeholder: "请选择",
				clearable: true,
			},
			vm: "cascader",
			cascaderOptions: [
				{
					value: "guide",
					label: "Guide",
					children: [
						{
							value: "disciplines",
							label: "Disciplines",
							children: [
								{
									value: "consistency",
									label: "Consistency",
								},
							],
						},
						{
							value: "navigation",
							label: "Navigation",
							children: [
								{
									value: "side nav",
									label: "Side Navigation",
								},
								{
									value: "top nav",
									label: "Top Navigation",
								},
							],
						},
					],
				},
				{
					value: "component",
					label: "Component",
					children: [
						{
							value: "basic",
							label: "Basic",
							children: [
								{
									value: "button",
									label: "Button",
								},
							],
						},
						{
							value: "form",
							label: "Form",
							children: [
								{
									value: "radio",
									label: "Radio",
								},
								{
									value: "checkbox",
									label: "Checkbox",
								},
							],
						},
						{
							value: "data",
							label: "Data",
							children: [
								{
									value: "table",
									label: "Table",
								},
							],
						},
						{
							value: "notice",
							label: "Notice",
							children: [
								{
									value: "alert",
									label: "Alert",
								},
							],
						},
						{
							value: "navigation",
							label: "Navigation",
							children: [
								{
									value: "menu",
									label: "Menu",
								},
							],
						},
						{
							value: "others",
							label: "Others",
							children: [
								{
									value: "dialog",
									label: "Dialog",
								},
							],
						},
					],
				},
				{
					value: "resource",
					label: "Resource",
					children: [
						{
							value: "axure",
							label: "Axure Components",
						},
					],
				},
			],
		},
	],
	//这里允许动态属性所以可为空
	searchForm: <SearchFormType>{},
	pageNum: 1,
	pageSize: 10,
	pageTotal: 0,
});
const {
	tableHeader,
	tableData,
	formOptions,
	searchForm,
	pageNum,
	pageSize,
	pageTotal,
} = toRefs(state);

// 修改
const onHandleEdit = (row: object) => {
	console.log(row);
};

// 删除
const onHandleDelete = (row: object) => {
	console.log(row);
};

// switch
const changeSwitchStatus = (id: number, status: boolean) => {
	console.log(id, status);
};

//页容量改变
const onHandleSizeChange = (val: number) => {
	// console.log('页容量 ==>：', val);
	pageSize.value = val;
	getTableList(pageNum.value, pageSize.value);
};
//当前分页改变
const onHandleCurrentChange = (val: number) => {
	// console.log('当前页 🚀 ==>：', val);
	pageNum.value = val;
	getTableList(pageNum.value, pageSize.value);
};

// 获取表项数据
const getTableList = (pageNum: number, pageSize: number) => {
	// 处理searchForm.value createTime
	if (searchForm.value.createTime) {
		searchForm.value.startTime = searchForm.value.createTime[0];
		searchForm.value.createTimeEnd = searchForm.value.createTime[1];
		delete searchForm.value.createTime;
	}
	console.log("🤺🤺  🚀 ==>:", pageNum, pageSize);
	// getTestList({
	// 	pageNum,
	// 	pageSize,
	// 	...searchForm.value,
	// }).then((res) => {
	// 	// if (res.code !== STATUS_CODE.SUCCESS) return;
	// 	const { list, total } = res.data;
	// 	tableData.value = list;
	// 	// console.log('🤺🤺 表项 🚀 ==>:', list);
	// 	pageTotal.value = total;
	// });
};

// 重置
const onReset = () => {
	searchForm.value = {};
	getTableList(pageNum.value, pageSize.value);
};
// 查询
const onSearch = () => {
	console.log("🤺🤺 查询表单数据 ==>:", searchForm.value);
	// 获取表项数据
	getTableList(pageNum.value, pageSize.value);
};

onMounted(() => getTableList(pageNum.value, pageSize.value));
</script>
