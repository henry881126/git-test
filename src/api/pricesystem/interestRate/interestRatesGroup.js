/*
 * @Descripttion: 
 * @version: 
 * @Author: tangpy
 * @Date: 2020-10-10 14:01:42
 * @LastEditors: tangpy
 * @LastEditTime: 2020-10-22 17:49:58
 */
/*--
 * @Descripttion:
 * @version:
 * @Author: qiaoxiaoliang
 * @Date: 2020-09-03 11:54:41
 * @LastEditors: qiaoxiaoliang
 * @LastEditTime: 2020-09-03 11:54:41
--*/
import { mergeMethods } from "@/api/pricesystem/serveData";
import request from "@/utils/request";

//列表查询利率计划组
export function QryRatePlnGrp(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QryRatePlnGrp",
    method: "post",
    data
  });
}

//新增利率计划组
export function AddRatePlnGrp(data) {
  var data = mergeMethods(data);
  return request({
    url: "/AddRatePlnGrp",
    method: "post",
    data
  });
}

//修改利率计划组
export function UpdateRatePlnGrp(data) {
  var data = mergeMethods(data);
  return request({
    url: "/UpdateRatePlnGrp",
    method: "post",
    data
  });
}

//删除利率计划组
export function DelRatePlnGrp(data) {
  var data = mergeMethods(data);
  return request({
    url: "/DelRatePlnGrp",
    method: "post",
    data
  });
}

//详情查询利率计划组
export function QueryRatePlnGrpDetrInfo(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QueryRatePlnGrpDetrInfo",
    method: "post",
    data
  });
}

//码值
export function getEnumInfoForXj(data) {
  var data = mergeMethods(data);
  return request({
    url: "/getEnumInfoForXjAtPrice",
    method: "post",
    data
  });
}

//产品编号
export function queryAvailableProductList(data) {
  var data = mergeMethods(data);
  return request({
    url: "/queryAvailableProductList",
    method: "post",
    data
  });
}

// 查询产品功能列表
export function productFunctionQueryList(data) {
  var data = mergeMethods(data);
  return request({
    url: "/productFunctionQueryList",
    method: "post",
    data
  });
}
