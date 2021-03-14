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

//列表查询利率计划
export function QryRatePlnList(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QryRatePlnList",
    method: "post",
    data
  });
}

//利率计划新增
export function AddRatePln(data) {
  var data = mergeMethods(data);
  return request({
    url: "/AddRatePln",
    method: "post",
    data
  });
}

//利率计划修改
export function UpdateRatePln(data) {
  var data = mergeMethods(data);
  return request({
    url: "/UpdateRatePln",
    method: "post",
    data
  });
}

//利率计划删除
export function DelRatePln(data) {
  var data = mergeMethods(data);
  return request({
    url: "/DelRatePln",
    method: "post",
    data
  });
}

//利率计划详情查询
export function QryRatePlnDetail(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QryRatePlnDetail",
    method: "post",
    data
  });
}
