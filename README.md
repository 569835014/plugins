# we-plugins

<p align="center">
  <a href="https://npmcharts.com/compare/we-plugins?minimal=true">
    <img src="https://img.shields.io/npm/dm/we-plugins.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/we-plugins">
    <img src="https://img.shields.io/npm/v/we-plugins.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/we-plugins">
    <img src="https://img.shields.io/npm/l/we-plugins.svg" alt="License">
  </a>
</p>

> 一个简单实用的工具函数库，可用于日常工作中。

*目前还在开发中，谨慎使用。*


## 项目结构说明


## 常用命令说明


### 库文件相关命令

#### `npm run build`

编译生成umd格式的`we-plugins.min.js`库文件，浏览器端可直接通过script标签引用该文件后进行使用。

#### `npm run rollup`

尝试用`rollup`进行库文件的构建（*暂不可用*）。


### 开发文档相关命令

#### `npm run docs:dev`

提供开发文档网站本地开发环境，支持热更新、ES6、Less。

#### `npm run docs:build`

编译出供发布到生产环境用的开发文档网站。编译后的文件会存放在`dist`目录下。

#### `npm run docs:publish`

将dist目录下的文件（即开发文档网站静态内容）发布到`gh-pages`分支上。


## 意见/建议


## 贡献代码/开发说明

### 包管理

本项目采用yarn进行包管理，使用方法请移步[Yarn官网](https://yarnpkg.com/en/)查看。

## 协议


## 参考
