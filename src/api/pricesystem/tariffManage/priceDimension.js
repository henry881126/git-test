/**
 * @Author   ui_liuhan
 * @Email    ui_liuhan@csftgroup.com
 * @Description   定价维度
 **/

import { mergeMethods } from "@/api/pricesystem/serveData";
import request from "@/utils/request";

// 查询定价维度列表
export function QueryDimeService(data) {
  return request({
    url: "/QueryDimeService",
    method: "post",
    data: mergeMethods(data)
  });
}
