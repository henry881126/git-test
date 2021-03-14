/*
 * @Descripttion: 接口调用方法封装demo
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:40:51
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-09-22 16:06:43
 */
import { mergeMethods } from "@/api/pricesystem/serveData";
import request from "@/utils/request";

//查询支付工具
export function searchPaymentToolService(data) {
  var data = mergeMethods(data);
  return request({
    url: "/searchPaymentToolService",
    method: "post",
    data
  });
}

//查询可售产品
export function findAvailableProductListSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/findAvailableProductListSop",
    method: "post",
    data
  });
}

//查询产品功能
export function productFunctionQueryListSop(data) {
  var data = mergeMethods(data);
  return request({
    url: "/sop/productFunctionQueryListSop",
    method: "post",
    data
  });
}

//利率试算添加
export function CalRate(data) {
  var data = mergeMethods(data);
  return request({
    url: "/CalRate",
    method: "post",
    data
  });
}

