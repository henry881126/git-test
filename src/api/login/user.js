/*
 * @Descripttion:
 * @version:
 * @Author: Ray Haiyoung
 * @Date: 2020-08-26 10:00:46
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-09-07 17:22:54
 */
import { mergeMethods } from './serveData'
import request from '@/utils/request'
// 登录
export function login(data) {
  var data = mergeMethods(data)
  return request({
    url: '/sgp/sgpTellerLogin.auth',
    method: 'post',
    data
  })
}
// 获取验证码
export function getLonginCode(data) {
  var data = mergeMethods(data)
  return request({
    url: '/sgp/queryVerificationCode.auth',
    method: 'post',
    data
  })
}

// 获取登录方式
export function getVerificationWay(data) {
  var data = mergeMethods(data)
  return request({
    url: '/sgp/getVerificationWay.auth',
    method: 'post',
    data
  })
}

//获取登出方式
export function sgpTellerLogout(data) {
  var data = mergeMethods(data)
  return request({
    url: '/sgp/sgpTellerLogout.auth',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

//通过用户ID获取用户信息
export function queryTellerById(data) {
  return request({
    url: '/queryTellerById',
    method: 'post',
    data: mergeMethods(data)
  })
}

//获取所有的菜单信息
export function queryMenuListForTree(data) {
  return request({
    url: '/queryMenuListForTree',
    method: 'post',
    data: mergeMethods(data)
  })
}
