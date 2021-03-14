/**
 * @Author   ui_liuhan
 * @Email    ui_liuhan@csftgroup.com
 * @Description   优惠规则组
 **/

import { mergeMethods } from "@/api/pricesystem/serveData";
import request from "@/utils/request";

// 查询优惠规则组列表
export function QueryFeeDfrtnRuleGrp(data) {
  return request({
    url: "/QueryFeeDfrtnRuleGrp",
    method: "post",
    data: mergeMethods(data)
  });
}
