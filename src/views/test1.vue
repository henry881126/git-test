<!--
 * @Author: ui_qianhengli
 * @Date: 2020-09-21 15:24:51
 * @LastEditors: ui_qianhengli
 * @LastEditTime: 2020-10-22 18:08:24
-->
<template>
	<div class="perform-interest-manage">
		<!-- 检索重置 -->
		<form-view
			class="g-form"
			:searchData="headerData.searchData"
			:searchForm="headerData.searchForm"
			:isHandle="headerData.isHandle"
			:searchHandle="headerData.searchHandle"
			:size="headerData.size"
			:isBlock="headerData.isBlock"
			:rules="headerData.rules"
			ref="headerSearch"
		></form-view>
		<headline :label="11111" />
		<div class="block-margin-top block-margin-bottom">
			<el-button type="primary" :size="size" @click="addTableData" icon="el-icon-plus">add</el-button>
		</div>
		<div class="g-table">
			<table-view
				:loading="tableData.loading"
				:size="tableData.size"
				:isOrder="tableData.isOrder"
				:operateObj="tableData.operateObj"
				:showOverflowTooltip="tableData.showOverflowTooltip"
				:tableHeaderData="tableData.tableHeaderData"
				:tableData="tableData.tableData"
				:isPage="tableData.isPage"
				:currentPage="tableData.currentPage"
				:total="tableData.total"
				:pageSize="tableData.pageSize"
				@operate="tableOperate"
				@getPageSize="getPageSize"
				@getPage="getPage"
			></table-view>
		</div>
		<!-- 挂靠利率修改弹框 -->
		<popup
			:isShow="addContentTwo.isShow"
			:size="addContentTwo.size"
			:title="addContentTwo.title"
			:footerList="addContentTwo.footerList"
			@senddialogVisible="addContentTwoHandle"
		>
			<div slot="content">
				<form-view
					:searchData="addContentTwo.searchData"
					:searchForm="addContentTwo.searchForm"
					:isHandle="addContentTwo.isHandle"
					:searchHandle="addContentTwo.searchHandle"
					:size="addContentTwo.size"
					:isBlock="addContentTwo.isBlock"
					:rules="addContentTwo.rules"
					ref="addContentTwoForm"
				></form-view>
			</div>
		</popup>
	</div>
</template>
 
<script>
	import { deepClone, isType } from "@/utils";
	export default {
		name: "perform-interest-manage",
		data() {
			return {
				// 搜索
				headerData: {
					isHandle: true,
					isBlock: true,
					searchData: {
						lgalPernCode: "", //法人代码
						intRateCgy: "", //利率种类
						ccyCode: "", //币种代码
						orgNum: "", //机构编号
						intRateMat: "", //利率期限
						startEffDt: "", //生效日期起
						endEffDt: "", //生效日期止
					},
					size: "small", //medium / small / min
					searchForm: [
						{
							type: "Select",
							prop: "lgalPernCode",
							width: "180px",
							placeholder: '',
							label: '',
							options: [],
							change: (val) => {},
						},
						{
							type: "Input",
							prop: "intRateCgy",
							placeholder: '',
							width: "180px",
							label: '',
						},
						{
							type: "Select",
							prop: "ccyCode",
							placeholder: '',
							label: '',
							width: "180px",
							options: [],
							change: (val) => {},
						},
						{
							type: "Input",
							prop: "orgNum",
							placeholder: '',
							label: '',
							width: "180px",
						},
						{
							type: "Select",
							prop: "intRateMat",
							placeholder: '',
							label: '',
							width: "180px",
							options: [],
							change: (val) => {},
						},
						{
							type: "Date",
							prop: "startEffDt",
							placeholder: '',
							label: '',
							width: "180px",
						},
						{
							type: "Date",
							prop: "endEffDt",
							placeholder: '',
							label: '',
							width: "180px",
						},
					],
					searchHandle: [
						{
							label: '',
							type: "primary",
							disabled: false,
							icon: "el-icon-search",
							handle: () => {
								// 检索需重置页码为1
								this.tableData.currentPage = 1;
								let form =
									this.$refs.headerSearch &&
									this.$refs.headerSearch.$refs.inlineForm.validate((valid) => {
										if (valid) {
											this.refreshTable();
										} else {
											return false;
										}
									});
							},
						},
						{
							label: '',
							type: "primary",
							disabled: false,
							icon: "el-icon-refresh-left",
							handle: () => {
								// 检索需重置页码为1
								this.$refs.headerSearch &&
									this.$refs.headerSearch.$refs.inlineForm.resetFields();
								this.tableData.currentPage = 1;
								this.refreshTable();
							},
						},
					],
					rules: {
						lgalPernCode: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
					},
				},

				// table表格数据
				tableData: {
					size: "small",
					isOrder: false,
					loading: true,
					tableData: [],
					tableHeaderData: [
						{
							prop: "intRateCgy",
							label: '',
							align: "left",
							width: 110,
						},
						{
							prop: "lgalPernCode",
							label: '',
							align: "left",
							width: 110,
						},
						{
							prop: "orgNum",
							label: '',
							align: "left",
							width: 110,
						},
						{
							prop: "ccyCode",
							label: '',
							align: "left",
							width: 110,
							render: (h, params) => {
								let status = params.row.ccyCode;
								if (status === "036") {
									status = "澳大利亚元";
								} else if (status === "124") {
									status = "加元";
								} else if (status === "156") {
									status = "人民币";
								} else if (status === "344") {
									status = "香港元";
								} else if (status === "392") {
									status = "日元";
								} else if (status === "702") {
									status = "新加坡元";
								} else if (status === "756") {
									status = "瑞士法郎";
								} else if (status === "826") {
									status = "英镑";
								} else if (status === "840") {
									status = "美元";
								} else if (status === "978") {
									status = "欧元";
								}
								return h("span", status);
							},
						},
						{
							prop: "intRateMat",
							label: '',
							align: "left",
							width: 110,
							render: (h, params) => {
								let status = params.row.intRateMat || params.row.afldIntRateMat;
								if (status === "1") {
									status = "一年";
								} else if (status === "2") {
									status = "二年";
								} else if (status === "3") {
									status = "三年";
								} else if (status === "4") {
									status = "五年";
								} else if (status === "5") {
									status = "五年以上";
								} else if (status === "6") {
									status = "一个月";
								} else if (status === "7") {
									status = "两个月";
								}
								return h("span", status);
							},
						},
						{
							prop: "afldIntRateCgy",
							label: '',
							align: "left",
							width: 110,
						},
						{
							prop: "afldIntRateMat",
							label: '',
							align: "left",
							width: 110,
						},
						{
							prop: "flotTpCode",
							label: '',
							align: "left",
							width: 110,
							render: (h, params) => {
								let status = params.row.flotTpCode;
								if (status === "1") {
									status = "不浮动";
								} else if (status === "2") {
									status = "浮动点";
								} else if (status === "3") {
									status = "浮动百分比";
								} else if (status === "4") {
									status = "利率值";
								}
								return h("span", status);
							},
						},
						{
							prop: "intFlotVal",
							label: '',
							align: "left",
							width: 110,
						},
						{
							prop: "effDt",
							label: '',
							align: "right",
							width: 110,
						},
						{
							prop: "invalDt",
							label: '',
							align: "right",
							width: 110,
						},
						{
							prop: "intRateVal",
							label: '',
							align: "right",
							width: 110,
						},
						{
							prop: "intRateUnitTpCode",
							label: '',
							align: "left",
							width: 110,
							render: (h, params) => {
								let status = params.row.intRateUnitTpCode;
								console.log(status);
								if (status === "1") {
									status = "日利率";
								} else if (status === "2") {
									status = "月利率";
								} else if (status === "3") {
									status = "年利率";
								}
								return h("span", status);
							},
						},
						{
							prop: "prcgOrgTpCode",
							label: '',
							align: "left",
							width: 110,
							render: (h, params) => {
								let status = params.row.prcgOrgTpCode;
								if (status === "1") {
									status = "总行";
								} else if (status === "2") {
									status = "分行";
								} else if (status === "3") {
									status = "支行";
								} else if (status === "4") {
									status = "分行&支行";
								}
								return h("span", status);
							},
						},
					],

					showOverflowTooltip: true,
					isClick: true,
					operateObj: {
						width: 200,
						list: [
							{ key: 0, label: '' },
							{ key: 1, label: '' },
						],
					},
					//--------分页
					isPage: true, //是否有分页
					currentPage: 1, //当前页
					total: 0, //总条数
					pageSize: 10, //每条页数
				},
				// -------非挂靠利率修改弹窗
				addContentOne: {
					isShow: false,
					isHandle: false,
					isBlock: false,
					searchData: {
						lgalPernCode: "", //法人代码
						intRateCgy: "", //利率种类
						ccyCode: "", //币种代码
						orgNum: "", //机构编号
						intRateMat: "", //利率期限
						effDt: "", //生效日期
						invalDt: "", //失效日期
						intRateUnitTpCode: "", //利率单位类型
						intRateVal: "", //利率值
						prcgOrgTpCode: "", //定价机构类型
						txInf: "", //备注信息
						flotUprLmt: "", //浮动上限
						flotLwrLmt: "", //浮动下限
					},
					size: "medium", //medium / small / min
					searchForm: [
						{
							type: "Select",
							prop: "lgalPernCode",
							width: "200px",
							placeholder: '',
							label: '',
							disabled: true,
						},
						{
							type: "Input",
							prop: "intRateCgy",
							placeholder: '',
							width: "200px",
							label: '',
							disabled: true,
						},
						{
							type: "Select",
							prop: "ccyCode",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
						},
						{
							type: "Input",
							prop: "orgNum",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
						},
						{
							type: "Select",
							prop: "intRateMat",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
							options: [],
							change: (val) => {},
						},
						{
							type: "Date",
							prop: "effDt",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
						},
						{
							type: "Date",
							prop: "invalDt",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
						},
						{
							type: "Select",
							prop: "intRateUnitTpCode",
							placeholder:'',
							label: '',
							width: "200px",
							options: [],
							change: (val) => {},
						},
						{
							type: "Input",
							prop: "intRateVal",
							placeholder: '',
							label: '',
							width: "200px",
						},
						{
							type: "Select",
							prop: "prcgOrgTpCode",
							placeholder: '',
							label: '',
							width: "200px",
							options: [],
							change: (val) => {},
						},
						{
							type: "Input",
							prop: "flotUprLmt",
							placeholder: '',
							label: '',
							width: "200px",
						},
						{
							type: "Input",
							prop: "flotLwrLmt",
							placeholder: '',
							label: '',
							width: "200px",
						},
						{
							type: "Textarea",
							prop: "txInf",
							width: "200px",
							placeholder: '',
							label: '',
						},
					],
					rules: {
						lgalPernCode: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						intRateCgy: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						ccyCode: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						orgNum: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						intRateMat: [
							{
								required: true,
								message:'',
								trigger: "change",
							},
						],
						effDt: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						invalDt: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						intRateVal: [
							{
								required: true,
								message: '',
								trigger: "blur",
							},
						],
						intRateUnitTpCode: [
							{
								required: true,
								message:'',
								trigger: "blur",
							},
						],
					},
					footerList: [
						{
							isSubmit: false,
							name: '',
						},
						{
							isSubmit: true,
							name: '',
							type: "primary",
						},
					],
				},
				// -------挂靠利率修改弹窗
				addContentTwo: {
					isShow: false,
					isHandle: false,
					isBlock: false,
					searchData: {
						lgalPernCode: "", //法人代码
						intRateCgy: "", //利率种类
						ccyCode: "", //币种代码
						orgNum: "", //机构编号
						intRateMat: "", //利率期限
						effDt: "", //生效日期
						invalDt: "", //失效日期

						afldIntRateCgy: "", //挂靠利率种类
						afldIntRateMat: "", //挂靠利率期限
						prcgOrgTpCode: "", //定价机构类型
						intRateVal: "", //挂靠利率值（回显）
						intRateUnitTpCode: "", //挂靠利单位（回显）
						txInf: "", //备注信息

						flotTpCode: "", //浮动类型
						flotDirect: "", //浮动调整方向
						intFlotVal: "", //利率浮动值
						flotBndCgyCode: "", //浮动上下限类型代码
						flotUprLmt: "", //浮动上限
						flotLwrLmt: "", //浮动下限
					},
					size: "medium", //medium / small / min
					searchForm: [
						{
							type: "Select",
							prop: "lgalPernCode",
							width: "200px",
							placeholder: '',
							label: '',
							disabled: true,
						},
						{
							type: "Input",
							prop: "intRateCgy",
							placeholder: '',
							width: "200px",
							label: '',
							buttonText: "选择",
							disabled: true,
						},
						{
							type: "Select",
							prop: "ccyCode",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
						},
						{
							type: "Select",
							prop: "orgNum",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
						},
						{
							type: "Select",
							prop: "afldIntRateMat",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
							options: [],
							change: (val) => {},
						},
						{
							type: "Date",
							prop: "effDt",
							placeholder: '',
							label: '',

							width: "200px",
							disabled: true,
						},
						{
							type: "Date",
							prop: "invalDt",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
						},
						{
							type: "Select",
							prop: "afldIntRateCgy",
							placeholder: '',
							label: '',
							width: "200px",
							disabled: true,
							options: [],
							change: (val) => {},
						},
						{
							type: "Select",
							prop: "prcgOrgTpCode",
							placeholder: '',
							label: '',
							width: "200px",
							options: [],
							change: (val) => {},
						},
						{
							type: "Select",
							prop: "flotTpCode",
							placeholder: '',
							label: '',
							width: "200px",
							options: [],
							change: (val) => {},
						},
						{
							type: "Select",
							prop: "flotDirect",
							placeholder: '',
							label: '',
							width: "200px",
							options: [],
							change: (val) => {},
						},
						{
							type: "Input",
							prop: "intFlotVal",
							placeholder: '',
							label: '',
							width: "200px",
						},
						{
							type: "Select",
							prop: "flotBndCgyCode",
							placeholder:'',
							label: '',
							width: "200px",
							options: [],
							change: (val) => {},
						},
						{
							type: "Input",
							prop: "flotUprLmt",
							placeholder: '',
							label: '',
							width: "200px",
						},
						{
							type: "Input",
							prop: "flotLwrLmt",
							placeholder: '',
							label: '',
							width: "200px",
						},
						{
							type: "Textarea",
							prop: "txInf",
							width: "200px",
							placeholder: '',
							label: '',
						},
					],
					rules: {
						lgalPernCode: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						intRateCgy: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						ccyCode: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						orgNum: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						effDt: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],
						invalDt: [
							{
								required: true,
								message: '',
								trigger: "change",
							},
						],

						intRateVal: [
							{
								required: true,
								message: '',
								trigger: "blur",
							},
						],
						intRateUnitTpCode: [
							{
								required: true,
								message:'',
								trigger: "blur",
							},
						],
						afldIntRateCgy: [
							{
								required: true,
								message: '',
								trigger: "blur",
							},
						],
						afldIntRateMat: [
							{
								required: true,
								message:'',
								trigger: "blur",
							},
						],
					},
					footerList: [
						{
							isSubmit: false,
							name: '',
						},
						{
							isSubmit: true,
							name: '',
							type: "primary",
						},
					],
				},
			};
		},
		watch: {
			"headerData.searchData": {
				deep: true,
				handler: function (newV, oldV) {
					this.headerData.searchHandle.forEach((item) => {
						if (item.label === '') {
							item.disabled = false;
						}
					});
				},
			},
		},
		computed: {
			size() {
				return 10;
			},
		},
		created() {
			this.refreshTable();
		},
		methods: {
			// 非挂靠利率修改弹框确认 取消
			addContentOneHandle(val) {
				if (val) {
					this.$refs.addContentOneForm.$refs.inlineForm.validate((valid) => {
						if (valid) {
							UpdateRateExecInf(this.addContentOne.searchData).then((res) => {
								if (res.Header && res.Header.RetStatus === "S") {
									this.addContentOne.isShow = false;
									this.refreshTable();
								}
							});
						} else {
							return false;
						}
					});
				} else {
					this.addContentOne.isShow = false;
				}
			},
			// 靠利率修改弹框确认 取消
			addContentTwoHandle(val) {
				if (val) {
					this.$refs.addContentTwoForm.$refs.inlineForm.validate((valid) => {
						if (valid) {
							this.addContentTwo.searchData.adjTpCode = this.addContentTwo.searchData.flotDirect;

							UpdateRateExecInf(this.addContentTwo.searchData).then((res) => {
								if (res.Header && res.Header.RetStatus === "S") {
									this.addContentTwo.isShow = false;
									this.refreshTable();
								}
							});
						} else {
							return false;
						}
					});
				} else {
					this.addContentTwo.isShow = false;
				}
			},
			// 获取码值
			getEnumInfoForXj(val) {
				let params = {
					enumTypeId: val,
					enumId: "",
					sortfield: "",
				};
				getEnumInfoForXj(params).then((res) => {
					let options = [];
					res.enuMap &&
						res.enuMap.treelist.forEach((item) => {
							let obj = {
								label: item.label,
								value: item.value,
							};
							options.push(obj);
						});
					if (val === "CD002700") {
						//法人代码
						this.headerData.searchForm.forEach((item) => {
							if (item.prop === "lgalPernCode") {
								item.options = options;
							}
						});
					} else if (val === "CD2020091804") {
						//币种代码
						this.headerData.searchForm.forEach((item) => {
							if (item.prop === "ccyCode") {
								item.options = options;
							}
						});
						this.addContentOne.searchForm.forEach((item) => {
							if (item.prop === "ccyCode") {
								item.options = options;
							}
						});
						this.addContentTwo.searchForm.forEach((item) => {
							if (item.prop === "ccyCode") {
								item.options = options;
							}
						});
					} else if (val === "CD2020091807") {
						//利率单位类型
						this.addContentOne.searchForm.forEach((item) => {
							if (item.prop === "intRateUnitTpCode") {
								item.options = options;
							}
						});
					} else if (val === "CD2020091806") {
						//定价机构类型
						this.addContentOne.searchForm.forEach((item) => {
							if (item.prop === "prcgOrgTpCode") {
								item.options = options;
							}
						});
						this.addContentTwo.searchForm.forEach((item) => {
							if (item.prop === "prcgOrgTpCode") {
								item.options = options;
							}
						});
					} else if (val === "CD2020091805") {
						//利率期限

						this.addContentOne.searchForm.forEach((item) => {
							if (item.prop === "intRateMat") {
								item.options = options;
							}
						});
						this.addContentTwo.searchForm.forEach((item) => {
							if (item.prop === "afldIntRateMat") {
								item.options = options;
							}
						});
						this.headerData.searchForm.forEach((item) => {
							if (item.prop === "intRateMat") {
								item.options = options;
							}
						});
					} else if (val === "CD2020091808") {
						//浮动类型

						this.addContentTwo.searchForm.forEach((item) => {
							if (item.prop === "flotTpCode") {
								item.options = options;
							}
						});
					} else if (val === "CD2020091812") {
						//浮动调整方向

						this.addContentTwo.searchForm.forEach((item) => {
							if (item.prop === "flotDirect") {
								item.options = options;
							}
						});
					} else if (val === "CD2020091809") {
						// 浮动上下限类型
						this.addContentTwo.searchForm.forEach((item) => {
							if (item.prop === "flotBndCgyCode") {
								item.options = options;
							}
						});
					}
				});
			},
			// 点击table操作选项，用handleType标记点击的是哪个操作
			tableOperate({ row, operate }) {
				// 0修改1删除
				if (operate.key === 0) {
					// 0非挂靠 1挂靠
					if (row.afldFlag === "0") {
						// 清空表单原有值
						Object.keys(this.addContentOne.searchData).forEach((key) => {
							this.addContentOne.searchData[key] = "";
						});
						// 回填当前行的值
						Object.assign(this.addContentOne.searchData, row);
						this.addContentOne.isShow = true;
					} else if (row.afldFlag === "1") {
						// 清空表单原有值
						Object.keys(this.addContentTwo.searchData).forEach((key) => {
							this.addContentTwo.searchData[key] = "";
						});
						// 回填当前行的值
						Object.assign(this.addContentTwo.searchData, row);
						this.addContentTwo.searchData.flotDirect = row.adjTpCode;
						this.addContentTwo.isShow = true;
					}
				} else if (operate.key === 1) {
					this.$handleDeleteConfirm(row.intRateCgy)
						.then(() => {
							DelRateExecInf(row).then((res) => {
								if (res.Header.RetStatus === "S") {
									this.$handleSuccess('');
									// 判断当前条是否是最后一条，页码减1
									let isLastOne = this.tableData.total % this.tableData.pageSize;
									if (isLastOne === 1) {
										this.tableData.currentPage -= 1;
									}
									this.refreshTable();
								}
							});
						})
						.catch((res) => {});
				}
			},
			// 选择每页几行触发
			getPageSize(val) {
				//总条数
				this.tableData.pageSize = val;
				this.refreshTable();
			},
			// 选择当前页数事件
			getPage(val) {
				this.tableData.currentPage = val;
				this.refreshTable();
			},
			addTableData() {
				this.$router.push({
					path:
						"/productOperation/pricesystem/interestRate/performInterestManageAdd",
				});
			},

			// 刷新表格数据
			refreshTable() {
				let params = {
					...this.headerData.searchData,
					pageSize: this.tableData.pageSize,
					pageNum: this.tableData.currentPage,
				};

				this.tableData.loading = true;
			},
			// 新增 修改弹框的确定取消
			tableVisibleHandle(val) {
				if (val) {
					let form = this.$refs.handleTable.$refs.inlineForm;
					form.validate((valid) => {
						if (valid) {
							this.tableDataHandle.isShow = false;
						} else {
							return false;
						}
					});
				} else {
					this.tableDataHandle.isShow = false;
				}
			},
		},
	};
</script>