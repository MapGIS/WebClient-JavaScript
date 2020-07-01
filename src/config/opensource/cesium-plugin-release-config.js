var webpack = require('webpack');
var path = require('path');
// const CopywebpackPlugin = require('copy-webpack-plugin');

var packageName = "webclient-cesium-plugins.min";
var banner = `
    datastore-cesium.(www.smaryun.com)
    Copyright© 2000-2018 MapGis
    license: Apache-2.0
    version: 10.0.2
`;

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
    mode: "production",
    //页面入口文件配置
    entry: __dirname + '/../../cesiumjs/index.js',
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, './output'),
        filename: packageName + ".js",
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },
    externals: {
        '../../../node_modules/cesium/Source/Cesium': 'Cesium',
        '../../../../node_modules/cesium/Source/Cesium': 'Cesium',
        'mapv': "function(){try{return mapv}catch(e){return {}}}()",
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml)$/,
            use: ['url-loader']
        }]
    },
    resolve: {
        alias: {
            // Cesium module name
            cesium: __dirname + '../node_modules/cesium/Source'
        }
    },
    plugins: [
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        /* new CopywebpackPlugin([{
            from: path.join(cesiumSource, cesiumWorkers),
            to: 'Workers'
        }]),
        new CopywebpackPlugin([{
            from: path.join(cesiumSource, 'Assets'),
            to: 'Assets'
        }]),
        new CopywebpackPlugin([{
            from: path.join(cesiumSource, 'Widgets'),
            to: 'Widgets'
        }]), */
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        })
    ]
};