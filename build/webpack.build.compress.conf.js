'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const env = require('../config/prod.env')
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './libraries/index.js'
  },
  devtool: config.public.productionSourceMap ? config.public.devtool : false,
  output: {
    path: config.public.assetsRoot,
    filename: utils.assetsPath('we-plugins.min.js'),
    library: 'we-plugins',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.public.productionSourceMap,
      parallel: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('libraries')]
      },
    ]
  }
}
