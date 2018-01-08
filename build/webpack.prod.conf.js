const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const webpackConfig = {
  entry: {
    index: "../src/index.ts" // 入口文件可以多个
  },
  output: {
    path: path.resolve(__dirname, '../dist'),  
    filename: "[name].js", // 这里会自动生成index.js
    publicPath: '/'
  },
  resolve: {
    extensions: [".ts", ".js"] // 自动补全，很重要
  },
  module: {
    rules: [
      { test: /\.ts$/, use: "ts-loader" } // 使用了ts-loader
    ]
  },
  devtool: 'false',
  output: {
    filename:"[name].js",
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [ 
    new HtmlWebPackPlugin({
      filename: "../dist/index.html",
      template: "index.html",
      inject: true
    })
  ]
};
module.exports = webpackConfig;