var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline_sourcemap" : null,
    entry: "./js/App.js",
    devServer: {
        inline: true,
        port: 3333,
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react', '@babel/preset-env'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'react-hot-loader/babel']
                }
            }]
        }]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'bundle.min.js'
    },
    plugins: debug ? [new HtmlWebPackPlugin({
        filename: "./index.html",
        template:"./index.html"
    })] : [
        new HtmlWebPackPlugin({
            filename: "./index.html"
        }),
        new webpack.optimize.DedupePlugin({
            filename: 'index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            warnings: true,
            minimize: true
        })
    ]
}