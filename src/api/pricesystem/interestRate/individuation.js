/*
 * @Descripttion: 接口调用方法封装demo
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:40:51
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-24 18:03:06
 */
import { mergeMethods } from "@/api/pricesystem/serveData";
import request from "@/utils/request";

//个性化利率签约主查询
export function querySpclArSgnIRate(data) {
  var data = mergeMethods(data);
	return request({
		url: "/QuerySpclArSgnIRate",
		method: "post",
		data
	});
}

//个性化利率签约新增修改删除
export function DoSpclArSgnIRate(data) {
  var data = mergeMethods(data);
	return request({
		url: "/DoSpclArSgnIRate",
		method: "post",
		data
	});
}

// 支付配置价格获取获取币种
export function getCurrency(data) {
  var data = mergeMethods(data);
  return request({
    url: "/getCurrency",
    method: "post",
    data
  });
}


// 个性化利率签约详情
export function QuerySpclArSgnIRateByPk(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QuerySpclArSgnIRateByPk",
    method: "post",
    data
  });
}
