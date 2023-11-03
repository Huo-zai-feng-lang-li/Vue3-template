<template>
	<el-dialog
		title="节点信息"
		:visible="showNodeInfo"
		v-model="showNodeInfo"
		width="65%"
	>
		<!-- 双击节点信息弹框 page -->
		<el-card>
			<div class="node-info-title">
				<div class="node-name" style="line-height: 40px">
					名称：分类分级
				</div>
				<div class="group-name" style="line-height: 40px">
					阶段：数据存储
				</div>
				<!-- <el-button class="primary" type="primary" round size="default">备案报告</el-button> -->
				<el-button
					class="primary"
					type="primary"
					round
					size="default"
					@click="jumpEvaluationReport"
					>节点报告</el-button
				>
			</div>
		</el-card>
		<div
			style="display: flex; flex-wrap: wrap; justify-content: space-between"
		>
			<el-card style="margin-top: 10px; width: 49%">
				<div class="risk-assessment">
					<div class="risk_one">
						<div
							class="sub-title"
							style="margin-top: 5px; font-size: 16px; color: #666"
						>
							问卷评估
						</div>
						<div class="risk-point" style="margin-top: 15px; color: #666">
							风险点：0个
						</div>
					</div>
					<div
						class="risk_two"
						style="margin-top: 10px; margin-left: -20px"
					>
						<div class="low-risk" style="margin-top: 15px; color: #666">
							低风险：0个
						</div>
						<div
							class="middle-risk"
							style="margin-top: 15px; color: #666"
						>
							中风险：0个
						</div>
						<div
							class="higher-risk"
							style="margin-top: 15px; color: #666"
						>
							高风险：0个
						</div>
						<div class="high-risk" style="margin-top: 15px; color: #666">
							严重：0个
						</div>
					</div>
					<div class="btns" style="padding: 0 30px; margin-top: 75px">
						<!-- <div>
							<el-button class="primary" type="primary" round size="default"
								>风险评测</el-button
							>
						</div> -->
						<div>
							<el-button
								class="primary"
								type="primary"
								round
								size="default"
								>问卷评估报告</el-button
							>
						</div>
					</div>
				</div>
			</el-card>
			<el-card style="margin-top: 10px; width: 49%">
				<div class="api-report">
					<div
						class="sub-title"
						style="margin-top: 5px; font-size: 16px; color: #666"
					>
						API报告
					</div>
					<div
						class="status"
						style="
							display: flex;
							justify-content: space-between;
							margin-top: 15px;
							color: #666;
						"
					>
						<span
							style="
								width: 50%;
								font-size: 13px;
								text-align: center;
								color: #666;
							"
							>状态：未调用</span
						>
						<span
							style="
								width: 50%;
								font-size: 13px;
								text-align: center;
								color: #666;
							"
							>&emsp;日志：0条</span
						>
					</div>
					<div class="api_one" style="margin-top: 10px">
						<div class="normal" style="margin-top: 15px; color: #666">
							正常：0条
						</div>
						<div class="warning" style="margin-top: 15px; color: #666">
							警告：0条
						</div>
						<div class="danger" style="margin-top: 15px; color: #666">
							灾难： 0 条
						</div>
					</div>
					<div class="is-show">
						<div
							style="margin-top: 15px; width: 200px; text-align: center"
						>
							<el-checkbox>启用API报告</el-checkbox>
						</div>
					</div>
					<div
						class="btns"
						style="padding: 0 30px; margin-top: 20px; margin-bottom: 15px"
					>
						<div>
							<el-button
								class="primary"
								round
								type="primary"
								size="default"
								>节点API</el-button
							>
						</div>
						<div>
							<el-button
								class="primary"
								round
								type="primary"
								size="default"
								>日志报告</el-button
							>
						</div>
					</div>
				</div>
			</el-card>
			<el-card style="margin-top: 10px; width: 49%">
				<div class="block-chain risk-assessment">
					<div class="risk_one">
						<div
							class="sub-title"
							style="
								margin-top: 5px;
								margin-bottom: 10px;
								font-size: 16px;
								color: #666;
							"
						>
							数据检测
						</div>
						<div class="risk-point" style="margin-top: 15px; color: #666">
							风险点：0个
						</div>
					</div>
					<div
						class="risk_two"
						style="margin-top: 10px; margin-left: -20px"
					>
						<div class="low-risk" style="margin-top: 15px; color: #666">
							低风险：0个
						</div>
						<div
							class="middle-risk"
							style="margin-top: 15px; color: #666"
						>
							中风险：0个
						</div>
						<div
							class="higher-risk"
							style="margin-top: 15px; color: #666"
						>
							较高风险：1个
						</div>
						<div class="high-risk" style="margin-top: 15px; color: #666">
							高风险：0个
						</div>
					</div>
					<div class="btns" style="padding: 0 30px; margin-top: 75px">
						<div>
							<el-button
								class="primary"
								type="primary"
								round
								size="default"
								@click="allocateRisk"
								>查看全部风险</el-button
							>
						</div>
					</div>
				</div>
			</el-card>
			<el-card style="margin-top: 10px; width: 49%">
				<div class="block-chain">
					<div
						class="sub-title"
						style="
							margin-top: 5px;
							margin-bottom: 10px;
							font-size: 16px;
							color: #666;
						"
					>
						风险处置
					</div>
					<div class="status" style="margin-top: 15px; color: #666">
						人工处置设置:
					</div>
					<br />
					<div class="disposal-content">
						<el-form
							label-width="90px"
							:rules="rules"
							style="margin-top: 10px"
							size="default"
						>
							<el-form-item label="邮箱" prop="email">
								<el-input
									placeholder="请输入您的邮箱"
									style="width: 75%"
								/>
								<el-button
									type="success"
									size="small"
									style="margin-left: 10px"
									>保存</el-button
								>
							</el-form-item>
							<p style="margin-left: 50px; font-size: 12px; color: gray">
								平台将在1小时内发送风险告警邮件到指定邮箱，请留意查收邮件。您依据邮件所述内容完成人工处置后，可点击下面的[处置完成]按钮，完成对应风险的处置
							</p>
							<br />
							<el-form-item label="手机号" prop="phone">
								<el-input
									placeholder="请输入您的手机号"
									style="width: 75%"
								/>
								<el-button
									type="success"
									size="small"
									style="margin-left: 10px"
									>保存</el-button
								>
							</el-form-item>
							<br />
							<p style="margin-left: 50px; font-size: 12px; color: gray">
								平台将在1小时内发送风险告警短信到指定手机，请留意查收短信。您依据短信所述内容完成人工处置后，可点击下面的[处置完成]按钮，完成对应风险的处置
							</p>
						</el-form>

						<div
							class="btns"
							style="
								padding: 0 30px;
								margin-top: 20px;
								margin-bottom: 15px;
							"
						>
							<div>
								<el-button
									class="primary"
									type="primary"
									round
									size="default"
									>处置完成</el-button
								>
							</div>
							<!-- <div>
								<my-tooltip
									content="自动修复会跟后台安全支撑云平台联动，自动进行安全补丁升级"
								>
									<el-button
										class="primary"
										type="primary"
										round
										size="default"
										style="margin-left: 20px"
										>自动修复</el-button
									>
								</my-tooltip>
							</div> -->
						</div>
					</div>
				</div>
			</el-card>
		</div>
	</el-dialog>
</template>

<script setup lang="ts" name="nodeInfo">
import type { FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const showNodeInfo = ref<boolean>(false);
const validatePhone = (rules: any, value: string, callback: Function) => {
	if (value === "") {
		callback(new Error("请输入手机号"));
	} else if (/^1[3456789]\d{9}$/.test(value)) {
		callback();
	} else {
		callback(new Error("手机号格式错误"));
	}
};
// 邮箱验证email
const validateEmail = (rules: any, value: string, callback: Function) => {
	if (value === "") {
		callback(new Error("请输入邮箱"));
	} else if (
		/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i.test(value)
	) {
		callback();
	} else {
		callback(new Error("邮箱格式错误"));
	}
};
const rules = reactive<FormRules>({
	phone: [{ validator: validatePhone, trigger: "blur" }],
	email: [{ validator: validateEmail, trigger: "blur" }],
});

// 跳转待分配风险页面
const allocateRisk = () => {
	router.push({
		name: "riskMonitorPointQuery",
		params: {
			tagsViewName: "monitoringViewRiskDetail",
		},
	});
};

// 节点日志报告
const jumpEvaluationReport = () => {
	router.push({
		name: "riskReport",
		params: {
			tagsViewName: "monitoringViewRiskReport",
		},
	});
};

// 打开弹框
const openNodeInfo = () => {
	showNodeInfo.value = true;
};

defineExpose({
	openNodeInfo,
});
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
	padding: 15px;
}

html,
body,
#app {
	margin: 0;
	height: 100%;
	box-sizing: border-box;
}

div,
span {
	box-sizing: border-box;
}

.primary {
	min-width: 76px;
}

.node-info-title {
	display: flex;
	text-align: center;

	div {
		flex: 1;
	}
}

.btns {
	display: flex;

	div {
		flex: 1;
		text-align: center;
	}
}

.api_one {
	display: flex;
	margin-top: 20px;

	div {
		flex: 1;
		text-align: center;
	}
}

.risk-assessment {
	.risk_two {
		display: flex;
		padding: 25px 10px 0;

		div {
			flex: 1;
			text-align: center;
			color: #666;
		}
	}

	.api-report {
		padding: 10px;
		margin-bottom: 5px;
		font-size: 10px;
		border: 1px dashed;
		border-radius: 3px;

		.is-show {
			margin-top: 15px;
			width: 200px;
			text-align: center;
		}

		.status {
			display: flex;
			justify-content: space-between;
			margin-top: 15px;
			color: #666;

			span {
				width: 50%;
				font-size: 13px;
				text-align: center;
				color: #666;
			}
		}
	}
}

.sub-title {
	margin-top: 5px;
	font-size: 16px;
	text-align: center;
	color: #666;
	background: #ccc;
	line-height: 30px;
}

.block-chain {
	.disposal-content {
		padding: 0 30px;
	}

	.btns {
		display: flex;

		div {
			flex: 1;
			text-align: center;
		}
	}
}
</style>
