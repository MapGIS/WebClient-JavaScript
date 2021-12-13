var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '..', 'index.js'), //唯一入口文件
  output: {
    path: path.join(__dirname, '..', 'dist-libs'), //打包后的文件存放的地方
    filename: 'webclient-es6-service.min.js', //打包后输出文件的文件名
    // libraryTarget: 'commonjs'
  },
  externals: {},
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
  }
};
