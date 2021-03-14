/*
 * @Descripttion:
 * @version:
 * @Author: tangpingying
 * @Date: 2020-08-04 13:45:51
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-11 15:37:47
 */

/**
 * 国际化语言处理公共方法
 * Created by gcc on 20/08/01.
 */

import vue from "Vue"
import Cookies from "js-cookie"

const chooseLanguage = Cookies.get("language") || "zh-CN"
/**
 * @param {string} str 提示用户要输出的文本内容
 * @returns {string} 拼接好的文本
 */
export function getPlaceholderMsg(str) {
  if (str) {
    if (chooseLanguage === "zh-CN") {
      return `${vue.$t("common.placeholder.input")}${str}`
    } else {
      return `${vue.$t("common.placeholder.input")} ${str}`
    }
  }
}

/**
 * @param {string} str 提示用户下拉框要选择的内容
 * @returns {string} 拼接好的文本
 */
export function getPlaceholderMsgForSelect(str) {
  if (str) {
    if (chooseLanguage === "zh-CN") {
      return `${vue.$t("common.placeholder.select")}${str}`
    } else {
      return `${vue.$t("common.placeholder.select")} ${str}`
    }
  }
}
