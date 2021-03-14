import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)
// 获取pricesystem目录下的所有js文件

// require.context(directory, useSubdirectories, regExp)
// directory: 要查找的文件路径
// useSubdirectories: 是否查
// regExp: 要匹配文件的正则

// require.context返回一个require 函数，此函数可以接收一个参数
// 返回的函数：function webpackContext(req) {return __webpack_require__(webpackContextResolve(req))};
// 函数有三个属性：resolve 、keys、id
// · resolve: 是一个函数，他返回的是被解析模块的id ，接受一个参数request。
// · keys: 也是一个函数，他返回的是一个数组，该数组是由所有可能被上下文模块解析的请求对象组成
// · id：上下文模块的id
// resolve: 接受一个参数request，request为test文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径
// id: 执行环境的id，返回的是一个字符串，主要用在module.hot.accept，应该是热加载
// 看下keys是作用
const modulesFiles = require.context("./pricesystem", true, /\.js$/)
// keys: 返回匹配成功模块的名字组成的数组
console.log("------------modulesFiles.keys()")
console.log(modulesFiles.keys())
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // reduce初始参数modules为空对象{}
  // modulePath为当前目录下文件名

  let moduleName = modulePath
    .replace(/^\.\/(.*)\.\w+$/, "$1")
    .replace(/[*/]/g, "_")
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
console.log(modules)
// modules
let routes = []
Object.keys(modules).forEach((key) => {
  routes.push(modules[key])
})

export default new Router({
  // mode: 'history', // require service support
  mode: "hash",
  routes: routes.flat(Infinity),
})
