---
title: 使用Koa快速搭建web网站
toc: true
comment: true
date: 2016-06-29 17:48:46
meta:
tags: [Node.js, Koa]
categories:
---

Koa是Node.js的一个web开发框架，与express不同，它不使用回调，而是基于ES6的新功能“协程”，它也非常的轻量。它只负责request和response的监听与处理。

<!-- more -->

## 前提条件
在开始之前，请确保你的电脑已经安装了最新的Node.js环境，具体请访问[nodejs.org](//nodejs.org)

## 新建一个项目
```bash
mkdir koa-test-web
cd koa-test-web
```

## 初始化package.json
```bash
npm init
```
输入以上命令后按提示完成`package.json`的建立

## 安装Koa
```bash
npm install koa --save
```

## 新建项目启动入口文件app.js,并写入如下内容
```
'use strict'
const koa = require('koa');
const app = koa();
app.use(function *(){
  this.body = 'Hello World'
});
app.listen(3000);
console.log('started at %s:  - port:%s', new Date, port);
```

## 启动Web
因为Koa基于es6特性，所以必须使用`--harmony`参数来启动node，并且要在js文件中使用'use strict'严格模式
```bash
node --harmony app.js
```

## 访问
现在可以打开你的浏览器并输入：`127.0.0.1:3000`来访问这个Web网站了，是不是非常简单呢？

## Links
有关于更多的Koa API，请参阅Koa官网
- [http://koajs.com/](http://koajs.com/)





