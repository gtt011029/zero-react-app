/*
插件（plugin）: loader用于转换某些剋行的模块， 而插件可以用于执行范围更广的任务
例如：打包优化、资源管理、注入环境变量。
webpack插件是一个具有apply方法的js对象
apply方法会被webpack compiler调用， 并且在整个编译生命周期都可以访问compiler对象
*/


const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',  // 入口文件 指示webpack 应该使用哪个模块作为构建内部依赖图的开始
    output: { // 告诉webpack在哪里输出它所创建的bundle
        filename: '[name].[contenthash].js', // 打包后文件输出位置
        chunkFilename: '[name].[contenthash].js',
        clean: true,
        publicPath: '/'
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './styles/[contenthash].css',
            linkType: 'text/css' // 设置link标签的type属性为text/css
        }),
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                filename: 'index.html',
                inject: 'body' // script标签插入的地方
            }
        )
    ],
    module: {  // loader: webpack 只能理解JS和JSON文件，这是webpack自带的能力。loader让webpack能够处理其他类型的文件， 并将它们转化为有效模块
        rules: [ // 允许你在webpack中指定多个loader
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader', // 用于把es6转化为es5 (这个地方的作用不止如此)
                    options: {
                        presets: [ // preset-react的作用很重要
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime', // 可兼容async await语法
                            'react-refresh/babel'
                        ]
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'less-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // 如果文件小于8KB，将转换为Base64编码
                    name: '[name].[hash].[ext]', // 指定输出的文件名格式
                    outputPath: 'images' // 指定输出的文件夹位置
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        chunkIds: 'named',
        runtimeChunk: 'single',
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    devServer: { // 热更新（但是正常情况下）
        hot: true,
        historyApiFallback: true,
        devMiddleware: {
            publicPath: '/' // 将 publicPath 移动到 devMiddleware 中
        },
        static: {
            directory: './dist', // 确认静态资源目录配置为输出目录
            publicPath: '/', // 添加publicPath配置项
            serveIndex: true, // 启用目录列表
            watch: true // 启用文件变化监控
        }
    },
    resolve: { // 这样的话导入 .jsx 文件就不用加后缀了
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    }
};
