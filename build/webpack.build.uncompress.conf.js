'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
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
    filename: utils.assetsPath('we-plugins.js'),
    library: 'we-plugins',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
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
