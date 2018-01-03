const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    index: "./src/index.ts" // 入口文件可以多个
  },
  output: {
    path: path.resolve(__dirname, '../dist'),  
    filename: "[name].js", // 这里会自动生成index.js
    publicPath: '/'
  },
  resolve: {
    extensions: [".ts", ".js"] // 自动补全，很重要
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: '/'
  },

  module: {
    rules: [
      { test: /\.ts$/, use: "ts-loader" } // 使用了ts-loader
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    })
  ]
};
