/*
 * @Author: ui_qianhengli
 * @Date: 2020-09-21 18:15:50
 * @LastEditors: ui_qianhengli
 * @LastEditTime: 2020-10-22 18:05:01
 */
import { mergeMethods } from "@/api/pricesystem/serveData";
import request from "@/utils/request";



//查询计价利率种类 
export function QryRateCgy(data) {
	var data = mergeMethods(data)
	return request({
		url: "/QryRateCgy",
		method: "POST",
		data
	});
}

//新增计价利率种类 
export function AddRateCgy(data) {
	var data = mergeMethods(data)
	return request({
		url: "/AddRateCgy",
		method: "POST",
		data
	});
}

//	修改计价利率种类 
export function UpdateRateCgy(data) {
	var data = mergeMethods(data)
	return request({
		url: "/UpdateRateCgy",
		method: "POST",
		data
	});
} 

//	删除计价利率种类 
export function DelRateCgy(data) {
	var data = mergeMethods(data)
	return request({
		url: "/DelRateCgy",
		method: "POST",
		data
	});
}

//	查询执行利率种类 
export function QryRateExecInf(data) {
	var data = mergeMethods(data)
	return request({
		url: "/QryRateExecInf",
		method: "POST",
		data
	});
}

//	查询机构编码
export function queryOrgList(data) {
	var data = mergeMethods(data)
	return request({
		url: "/queryOrgList",
		method: "POST",
		data
	});
}
//	执行利率种类新增

export function AddRateExecInf(data) {
	var data = mergeMethods(data)
	return request({
		url: "/AddRateExecInf",
		method: "POST",
		data
	});
}

//	挂靠利率挂靠
export function QryEchoRateExecInf(data) {
	var data = mergeMethods(data)
	return request({
		url: "/QryEchoRateExecInf",
		method: "POST",
		data
	});
}

//	挂靠利率删除
export function DelRateExecInf(data) {
	var data = mergeMethods(data)
	return request({
		url: "/DelRateExecInf",
		method: "POST",
		data
	});
}

//	修改执行利率种类
export function UpdateRateExecInf(data) {
	var data = mergeMethods(data)
	return request({
		url: "/UpdateRateExecInf",
		method: "POST",
		data
	});
}

//	基础利率导入
export function RateImport(data) {
	var data = mergeMethods(data)
	return request({
		url: "/RateImport",
		method: "POST",
		data
	});
}

//	上传文件
export function upLoadFileService(data) {
	var data = mergeMethods(data)
	return request({
		url: "/upLoadFileService",
		method: "POST",
		data
	});
}

