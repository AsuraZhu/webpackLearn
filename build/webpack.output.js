const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin");
//为了 方便构建多入口文件  可以专门提供 一个文件夹 用于放置 入口文件 
// 入口文件 之间不能存在引用关系 
const webpackConfig = {
    entry: {
        app: '../src/output.js',
        search: '../src/serach.js'
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname,"../dist"),
        chunkFilename:'[id].[chunkhash].js'
        //  publicPath: ""     //cdn的
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:false,
                drop_debugger:true,
                drop_console: true
            },
            sourceMap: false,
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:"chunk",
           // filename:"chunk"
        }),
        new HtmlWebPackPlugin({
            filename: path.resolve(__dirname,"../dist/index.html"),
            template: '../index.html'
        })
    ]


}

// entry  key 是文件名   value 是资源
// output  path: 必须是绝对路径


// webpack 自带的插件 压缩 （可以去掉 console warnings等） 可以选取是否开启 sourcemap

module.exports = webpackConfig;
