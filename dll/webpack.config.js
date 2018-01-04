const path = require("path");
const webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: ["./example-vendor"],
    output: {
        filename: "vendor.js",
        path: path.resolve(__dirname,"js"),
        library: "vendor_lib_[hash]",
    },
    plugins: [
        new webpack.DllPlugin({
            name: "vendor_lib_[hash]",
            path:path.resolve(__dirname,"js/vendor-manifest.json")
        })
    ]
}