/*
 * @Descripttion:
 * @version:
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-08 13:39:48
 */
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const modulesFiles = require.context("./modules", true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  let moduleName = modulePath
    .replace(/^\.\/(.*)\.\w+$/, "$1")
    .replace(/[*/]/g, "_")
  const value = modulesFiles(modulePath)
  console.dir(modulesFiles)
  console.log(value)
  modules[moduleName] = value.default
  return modules
}, {})
console.log(modules)
const store = new Vuex.Store({
  modules: {
    ...modules,
  },
})
export default store
