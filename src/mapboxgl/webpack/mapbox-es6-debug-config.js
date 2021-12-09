var webpack = require('webpack');
var path = require('path');
var HappyPack = require('happypack'); //多线程loader 加快编译速度
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
var HtmlWebpackPlugin = require('html-webpack-plugin');
const BuildInfo = require('./version/version.js');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.join(__dirname, '..', 'index.js'),
    output: {
        path: path.join(__dirname, '..', 'dist-libs'), //打包后的文件存放的地方
        filename: 'webclient-es6-mapboxgl.js' //打包后输出文件的文件名
    },
    externals: {
        '@mapgis/mapbox-gl': 'mapboxgl',
        mapv: 'function(){try{return mapv}catch(e){return {}}}()',
        echarts: 'function(){try{return echarts}catch(e){return {}}}()'
    },
    module: {
        // noParse: /[\/\\]mapbox-gl\.js$/,
        // noParse: /3rdLib[^.*mapbox]\.js$/,

        //script-loader
        rules: [
            {
                test: /(\.js)$/,
                use: 'happypack/loader?id=js',
                exclude: [/node_modules/, /leaflet/, /openlayers/]
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'js',
            // threads: 4,
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        cacheDirectory: true,
                        plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties']
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'webclient-es6-mapboxgl.html',
            inject: false, //不插入生成的js 仅用于版本声明
            minify: {
                removeComments: false,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            buildInfo: BuildInfo
        })
    ]
};
