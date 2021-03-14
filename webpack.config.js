var ExtractTextPlugin = require("extract-text-webpack-plugin") //css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
module.exports = {
  module: {
    loaders: [
      //解析.css文件
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css"),
      },
      //解析.vue文件
      {
        test: /\.vue$/,
        loader: "vue",
      },
      //解析.scss文件,对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
    ],
  },
  //.vue文件的配置，以下是为了在.vue文件中使用ES6语法（必须安装babel相关的依赖包），以及把使用css或sass语法的样式提取出来，如果不需要可以忽略
  vue: {
    loaders: {
      js: "babel",
      css: ExtractTextPlugin.extract("css"),
      sass: ExtractTextPlugin.extract("css!sass"),
    },
  },
  plugins: [
    new ExtractTextPlugin("style.css"), //提取出来的样式放在style.css文件中
  ],
}
