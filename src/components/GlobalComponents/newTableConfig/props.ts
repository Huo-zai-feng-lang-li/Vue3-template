export default {
	// 表头数据
	tableHeader: {
		type: Array as () => TableHeader[],
		default: function () {
			return [];
		},
	},

	// 表格显示的数据
	tableData: {
		default: function () {
			return [];
		},
	},

	// 边框
	tableBorder: {
		type: Boolean,
		default: false,
	},

	// 总页数
	total: {
		type: Number,
		default: 0,
	},

	// 分页的页容量数组
	pageSizesArr: {
		type: Array as () => number[],
		default() {
			return [10, 20, 30, 50];
		},
	},

	// 分页的布局
	layout: {
		type: String,
		default: "total, sizes, prev, pager, next, jumper",
	},

	// 分页是否显示
	paginationFlag: {
		type: Boolean,
		default: true,
	},
	// 当前页
	pageNum: {
		type: Number,
		default: 1,
	},
	// 页容量
	pageSize: {
		type: Number,
		default: 10,
	},
	// empty的图片大小
	emptyImgSize: {
		type: Number,
		default: 200,
	},
	// 搜索区域是否显示
	isShowSearchRegion: {
		type: Boolean,
		default: true,
	},

	// 是否展示连续序号
	isSerialNo: {
		type: Boolean,
		default: true,
	},
};
