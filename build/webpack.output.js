const path = require("path")
const webpackConfig = {
    entry: {
        app: '../src/output.js',
        search: '../src/serach.js'
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname,"../dist")
        //  publicPath: ""     //cdn的
    }

}

// entry  key 是文件名   value 是资源
// output  path: 必须是绝对路径

module.exports = webpackConfig;
