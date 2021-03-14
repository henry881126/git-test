/*
 * @Descripttion: 接口调用方法封装demo
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:40:51
 * @LastEditors: tangpy
 * @LastEditTime: 2020-10-22 17:24:04
 */
import { mergeMethods } from "@/api/pricesystem/serveData";
import request from "@/utils/request";

//码值接口-枚举类通用
export function getEnumInfoForXj(data) {
  var data = mergeMethods(data);
  return request({
    url: "/getEnumInfoForXjAtPrice",
    method: "post",
    data
  });
}
// 查询机构树
export function getOrgTree(data) {
  var data = mergeMethods(data)
  return request({
    url: '/getOrgTree',
    method: 'post',
    data
  })
}
