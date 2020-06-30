var webpack = require('webpack');
var path = require('path');
var HappyPack = require('happypack');//多线程loader 加快编译速度
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  mode:'development',
  devtool: 'eval-source-map',
  entry: path.join(__dirname, '.', 'mapbox_main.js'),
  output: {
    path: path.join(__dirname, '.', 'output'),//打包后的文件存放的地方
    filename: "webclient-mapboxgl-framework.js"//打包后输出文件的文件名
  },
  externals: {
    // 'mapbox-gl': 'mapboxgl',
    'mapv': "function(){try{return mapv}catch(e){return {}}}()",
    'echarts': 'function(){try{return echarts}catch(e){return {}}}()'
  },
  module: {
      // noParse: /[\/\\]mapbox-gl\.js$/,
      // noParse: /3rdLib[^.*mapbox]\.js$/,

       //script-loader
       rules: [
            {
                test: /(\.js)$/,
                use: 'happypack/loader?id=js',
                exclude: [/node_modules/,/leaflet/,/openlayers/]
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
                    plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties']
                }
            }]
    })
   ]
}