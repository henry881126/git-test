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

//列表查询利率计划模板
export function QryRatePlnTpl(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QryRatePlnTpl",
    method: "post",
    data
  });
}

//新增利率计划模板
export function AddRatePlnTpl(data) {
  var data = mergeMethods(data);
  return request({
    url: "/AddRatePlnTpl",
    method: "post",
    data
  });
}

//修改利率计划模板
export function UpdateRatePlnTpl(data) {
  var data = mergeMethods(data);
  return request({
    url: "/UpdateRatePlnTpl",
    method: "post",
    data
  });
}

//删除利率计划模板
export function DelRatePlnTpl(data) {
  var data = mergeMethods(data);
  return request({
    url: "/DelRatePlnTpl",
    method: "post",
    data
  });
}

//详情查询利率计划模板
export function QryRatePlnDtl(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QryRatePlnDtl",
    method: "post",
    data
  });
}
