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

//列表查询利率计划组模板
export function QueryRatePlnGrpTplList(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QueryRatePlnGrpTplList",
    method: "post",
    data
  });
}

//新增利率计划组模板
export function AddRatePlnGrpTpl(data) {
  var data = mergeMethods(data);
  return request({
    url: "/AddRatePlnGrpTpl",
    method: "post",
    data
  });
}

//修改利率计划组模板
export function EditRatePlnGrpTpl(data) {
  var data = mergeMethods(data);
  return request({
    url: "/EditRatePlnGrpTpl",
    method: "post",
    data
  });
}

//删除利率计划组模板
export function DelRatePlnGrpTpl(data) {
  var data = mergeMethods(data);
  return request({
    url: "/DelRatePlnGrpTpl",
    method: "post",
    data
  });
}

//详情查询利率计划组模板
export function QueryRatePlnGrpTplInfo(data) {
  var data = mergeMethods(data);
  return request({
    url: "/QueryRatePlnGrpTplInfo",
    method: "post",
    data
  });
}
