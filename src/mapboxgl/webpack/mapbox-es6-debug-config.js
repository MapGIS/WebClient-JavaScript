var webpack = require('webpack');
var path = require('path');
var os = require('os');

module.exports = {
  mode: 'development',
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
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      { test: /\.ts$/, use: 'ts-loader' },
    ]
  },
  plugins: [

  ]
};
