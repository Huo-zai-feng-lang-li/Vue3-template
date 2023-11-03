// 左侧菜单导航数据
export const leftNavList = [
	{
		title: "数据提供者",
		isOpen: true,
		id: "1",
		children: [
			{
				icon: "lock",
				name: "供应商",
				id: "2",
			},
			{
				icon: "Promotion",
				name: "用户",
				id: "3",
			},
			{
				icon: "DeleteFilled",
				name: "其他机构",
				id: "2654832165",
			},
		],
	},

	{
		title: "数据收集",
		icon: "RemoveFilled",
		isOpen: true,
		id: "4",
		children: [
			{
				icon: "CirclePlusFilled",
				name: "数据安全分类分级",
				id: "5",
			},
			{
				icon: "Notification",
				name: "不需告知",
				id: "6",
			},
			{
				icon: "ChatDotRound",
				name: "公示处理规则",
				id: "7",
			},
			{
				icon: "Setting",
				name: "告知同意",
				id: "8",
			},
			{
				icon: "Clock",
				name: "委对托处理协议",
				id: "9",
			},
			{
				icon: "Position",
				name: "用户权利",
				id: "10",
			},
		],
	},

	{
		title: "数据传输",
		isOpen: true,
		id: "11",
		children: [
			{
				icon: "Lock",
				name: "数据传输加密登记管理",
				id: "12",
			},
		],
	},

	{
		title: "数据存储",
		isOpen: true,
		id: "13",
		children: [
			{
				icon: "ChatSquare",
				name: "分中心存储",
				id: "14",
			},
			{
				icon: "ChatSquare",
				name: "数据加密存储登记管理",
				id: "15",
			},
			{
				icon: "ChatSquare",
				name: "境内存储",
				id: "16",
			},
			{
				icon: "ChatSquare",
				name: "存储期限",
				id: "17",
			},
			{
				icon: "ChatSquare",
				name: "容灾备份",
				id: "19",
			},
			{
				icon: "ChatSquare",
				name: "中心云服务器",
				id: "20",
			},
			{
				icon: "ChatSquare",
				name: "数据脱敏",
				id: "21",
			},
		],
	},

	{
		title: "数据处理",
		isOpen: true,
		id: "1543",
		children: [
			{
				icon: "Loading",
				name: "数据脱敏技术登记管理",
				id: "15424",
			},
			{
				icon: "Loading",
				name: "去标识化技术登记管理",
				id: "12542",
			},
			{
				icon: "Loading",
				name: "数据权限管理技术登记管堂",
				id: "1546",
			},
			{
				icon: "Loading",
				name: "数据水印技术登记管理",
				id: "15247",
			},
			{
				icon: "Loading",
				name: "数据导入导出登记管理",
				id: "1549",
			},
			{
				icon: "Loading",
				name: "向接口安全登记管理",
				id: "2250",
			},
			{
				icon: "Loading",
				name: "分析研究",
				id: "25431",
			},
			{
				icon: "Loading",
				name: "委托处理",
				id: "2143545",
			},
			{
				icon: "Loading",
				name: "报告",
				id: "14245",
			},
			{
				icon: "Loading",
				name: "跨境流动",
				id: "13545",
			},
			{
				icon: "Loading",
				name: "单独同意",
				id: "13546",
			},
			{
				icon: "Loading",
				name: "数据交易",
				id: "178647",
			},
			{
				icon: "Loading",
				name: "政务数据公开",
				id: "19",
			},
			{
				icon: "Loading",
				name: "合并分立解散破产",
				id: "205768",
			},
			{
				icon: "Loading",
				name: "合作研究",
				id: "21687",
			},
		],
	},

	{
		title: "数据删除",
		isOpen: true,
		id: "16783",
		children: [
			{
				icon: "Service",
				name: "数据擦除登记管理",
				id: "14678",
			},
			{
				icon: "Service",
				name: "数据匿名化",
				id: "13545",
			},
			{
				icon: "Service",
				name: "归档服务器",
				id: "16876",
			},
		],
	},

	{
		title: "数据访问者",
		isOpen: true,
		id: "1693",
		children: [
			{
				icon: "Aim",
				name: "监管机构",
				id: "14425",
			},
			{
				icon: "Aim",
				name: "员工",
				id: "156985",
			},
			{
				icon: "Aim",
				name: "服务商",
				id: "1655",
			},
			{
				icon: "Aim",
				name: "研究者",
				id: "1686578",
			},
		],
	},
];

// 右侧节点位置节点
export const rightList = {
	nodeList: [
		{
			nodeId: "zctxv9dfah",
			left: "20px",
			top: "283px",
			borderLeft: "5px solid #69f0ae",
			class: "workflow-right-clone",
			name: "用户",
			icon: "Promotion",
			id: "3",
			pid: "1",
		},
		{
			nodeId: "11rwkiih1e",
			left: "90px",
			top: "98px",
			borderLeft: "5px solid #69f0ae",
			class: "workflow-right-clone",
			name: "不需告知",
			icon: "Notification",
			id: "6",
			pid: "4",
		},
		{
			nodeId: "d176ba6gum",
			left: "91px",
			top: "480px",
			borderLeft: "5px solid #69f0ae",
			class: "workflow-right-clone",
			name: "用户权利",
			icon: "Position",
			id: "10",
			pid: "4",
		},
		{
			nodeId: "k7rkq967q5",
			left: "106px",
			top: "98px",
			borderLeft: "5px solid #69f0ae",
			class: "workflow-right-clone",
			name: "数据传输加密登记管理",
			icon: "Lock",
			id: "12",
			pid: "11",
			type: "line",
			label: "",
		},
		{
			nodeId: "3i2p2pwhpx",
			left: "146px",
			top: "98px",
			borderLeft: "5px solid #69f0ae",
			class: "workflow-right-clone",
			name: "中心云服务器",
			icon: "ChatSquare",
			id: "20",
			pid: "13",
			type: "line",
			label: "",
		},
		{
			nodeId: "vnbg7iez6p",
			left: "176px",
			top: "98px",
			borderLeft: "5px solid #69f0ae",
			class: "workflow-right-clone",
			name: "去标识化技术登记管理",
			icon: "Loading",
			id: "12542",
			pid: "1543",
		},
		{
			nodeId: "q6vusphexe",
			left: "169px",
			top: "98px",
			borderLeft: "5px solid #69f0ae",
			class: "workflow-right-clone",
			name: "数据匿名化",
			icon: "Service",
			id: "13545",
			pid: "16783",
		},
		{
			nodeId: "az6pu291c3",
			left: "178px",
			top: "98px",
			borderLeft: "5px solid #69f0ae",
			class: "workflow-right-clone",
			name: "研究者",
			icon: "Aim",
			id: "1686578",
			pid: "1693",
		},
	],
	lineList: [
		{
			sourceId: "zctxv9dfah",
			targetId: "11rwkiih1e",
			label: "",
		},
		{
			sourceId: "zctxv9dfah",
			targetId: "d176ba6gum",
			label: "",
		},
		{
			sourceId: "11rwkiih1e",
			targetId: "k7rkq967q5",
			label: "",
		},
		{
			sourceId: "k7rkq967q5",
			targetId: "3i2p2pwhpx",
			label: "",
		},
		{
			sourceId: "3i2p2pwhpx",
			targetId: "vnbg7iez6p",
			label: "",
		},
		{
			sourceId: "vnbg7iez6p",
			targetId: "q6vusphexe",
			label: "",
		},
		{
			sourceId: "q6vusphexe",
			targetId: "az6pu291c3",
			label: "",
		},
	],
};
