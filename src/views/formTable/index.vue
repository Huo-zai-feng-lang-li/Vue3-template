<template>
	<new-table
		v-bind="state"
		@handleSizeChange="onHandleSizeChange"
		@handleCurrentChange="onHandleCurrentChange"
		@handleEdit="onHandleEdit"
		@handleDelete="onHandleDelete"
	>
		<template #search>
			<new-form
				:formOptions="formOptions"
				:searchForm="searchForm"
				@search="onSearch"
			/>
		</template>

		<template #btn>
			<el-button
				type="primary"
				size="default"
				style="float: right; margin-bottom: 15px"
			>
				<SvgIcon name="ant-PlusOutlined"></SvgIcon>
				新建题目
			</el-button>
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
</template>

<script setup lang="ts" name="FormTableDemoExample">
import { onMounted, reactive, toRefs } from "vue";
// import { getTestList } from "@/api/encryptionAlgorithm/templateDefinition";
// import { STATUS_CODE } from "@/enum/global";
const state = reactive({
	//表头数据
	// el-table-column有的属性都可以在这传

	/* 
	 searchFields:true 搜索字段
	 slotKey: 'xxx' 自定义插槽 
	 包含tableHeaderSearch则展示表格搜索框。
	 包含default则展示 编辑删除
	 其他值可以在父组件中使用插槽 template自定义内容
	  #search 表单搜索
	  #btn 列表上方的按钮
	*/

	tableHeader: <TableHeader[]>[
		{ label: "姓名", prop: "uname", searchFields: true },
		{ label: "年龄", prop: "age" },
		{ label: "性别", prop: "sex", slotKey: "switch" },
		{
			label: "操作",
			fixed: "left",
			slotKey: "default,tableHeaderSearch",
			width: 200,
		},
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
	searchForm: <SearchFormType>{
		department: "", // 匹配下拉的全部，因为全部的value是''
	},
	pageNum: 1,
	pageSize: 10,
	total: 10000,
	tableHeight: "calc(100vh - 302px)",
});
const { formOptions, searchForm, pageNum, pageSize } = toRefs(state);

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
	let params = { ...searchForm.value };
	if (params.createTime) {
		params.createTimeBegin = params.createTime[0];
		params.createTimeEnd = params.createTime[1];
	}
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const { createTime, ...paramsWithoutCreateTime } = params;
	console.log(pageNum, pageSize);
	// getTestList({
	// 	pageNum,
	// 	pageSize,
	// 	...paramsWithoutCreateTime,
	// }).then((res) => {
	// 	if (res.code !== STATUS_CODE.SUCCESS) return;
	// 	const { list, total } = res.data;
	// 	tableData.value = list;
	// 	// console.log('🤺🤺 表项 🚀 ==>:', list);
	// 	total.value = total;
	// });
};

const onSearch = (isReset?: string) => {
	pageNum.value = isReset ? 1 : pageNum.value;
	getTableList(pageNum.value, pageSize.value);
};

onMounted(() => getTableList(pageNum.value, pageSize.value));
</script>
