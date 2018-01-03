const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        "index":"./src/index.ts" // 入口文件可以多个
    },
    output: {
        filename: "[name].js",  // 这里会自动生成index.js
        path:__dirname+"/dist" // 输出到哪个文件夹
    },
    resolve: {
         extensions: [".ts",".js"]     // 自动补全，很重要
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" }   // 使用了ts-loader
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebPackPlugin({template: './src/index.html'})
    ]
};