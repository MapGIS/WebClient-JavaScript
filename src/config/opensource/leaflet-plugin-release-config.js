﻿var webpack = require('webpack');
var path = require('path');

var HappyPack = require('happypack');//多线程loader 加快编译速度
const uglify = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const BuildInfo = require('./version/version.js')
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
    mode: "none",
    entry: path.join(__dirname, '.', 'leaflet_main.js'),//已多次提及的唯一入口文件
    output: {
        path: path.join(__dirname, '.', 'output'),//打包后的文件存放的地方
        filename: "webclient-leaflet-plugin.min.js"//打包后输出文件的文件名
    },
    devtool: "sourcemap", //生成用来调试的map
    externals: {
        'leaflet': 'L',
        'mapv': "function(){try{return mapv}catch(e){return {}}}()",
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()'
    },
    module: {
        // rules: [
        //     {
        //         test: /(\.js)$/,
        //         use: {
        //             loader: "babel-loader",
        //             options: {
        //                 presets: ["es2015"]
        //             }
        //         },
        //         exclude: [/node_modules/,/mapgislayerForMapbox/,/clientThemeMapbox/]
        //     }
        // ]
        rules: [
            {
                test: /(\.js)$/,
                use: 'happypack/loader?id=js',
                exclude: [/node_modules/, /mapboxgl/, /openlayers/]
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'js',
            // threads: 4,
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    cacheDirectory: true,
                    // plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties']
                    plugins: ['transform-decorators-legacy', 'transform-class-properties']
                }
            }]
        }),
        new uglify(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'webclient-leaflet-plugin.min.html',
            template: 'src/config/opensource/version/version.html',
            inject: false,//不插入生成的js 仅用于版本声明
            minify: {
              removeComments: false,
              collapseWhitespace: true,
              removeAttributeQuotes: true
            },
            buildInfo: BuildInfo
          })
    ]
}
