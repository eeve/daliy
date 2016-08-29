---
title: 利用Log.io实现日志实时监控
date: 2016-06-20 15:23:08
tags: [教程]
categories: [FE, Node.js]
toc: true
---

一个好用的系统日志，不仅能够帮你快速定位问题，也能够让你在找问题的同时提升自己的技术水平。

<!-- more --> 

一天，你负责的系统在测试环境或线上环境出问题了，你开始打开终端，在一台机器上用 tail -f 监听单个日志或者用 multitail 监听多个日志来查找问题。你可能会想，要是能有一个专门用来查日志的web终端就好了，它能够支持自定义查找，筛选日志，并同时查看多个日志文件，而且最好是实时的，那我就省事多了。
哈哈，其实是有的，log.io就是其中的一种。

## Log.io

Log.io就是一种能纪录`n台机器`、`不同类型`的日志，并能汇集到一个界面里方便查看，还是实时的日志监控工具。

恩，你没听错，Log.io只是一个监控工具，它并不保存日志，只监视日志变动～
它是采用 node.js + socket.io 开发，提供浏览器界面UI，每秒可以处理超过5000条日志变动消息。

Log.io采用服务器－客户端的模式，由两部分组成：`server` 和 `harvester`。

### 客户端：
server运行在服务器A上，用来监视和纪录目标机器发来的日志消息

### 服务端：
log harvester运行在服务器B上，用来监听和收集自己服务上的日志改动，并将改动信息发送给服务器A，每个需要纪录日志的机器都需要一个harvester.


## 如何安装

Log.io是机基于Node.js的，所以，在服务端和客户端都需要安装Node.js

#### 安装Node.js

Node.js的安装方法，请参考我之前的一篇文章：[node环境的安装](/nodehuan-jing-de-an-zhuang/)

安装好后，查看版本号，我的是`node:v0.10.35` `npm:1.4.28`

![](http://7xjo8q.com1.z0.glb.clouddn.com/image/1/72/c0f4ec3ecac05b2e326e78f4ee5cf.png)

#### 安装 Log.io
Log.io是一个node package。 里面包含了 `log server` 和 `log harvester`

你可以通过下面的命令来安装Log.io
```bash
$ sudo npm config set unsafe-perm true
$ sudo npm install log.io -g --prefix=/usr/local
```

安装的时间稍微有点长，视网络情况而定，慢的话稍微等等就好了，实在不行可能就需要调整正确的上网姿势了。

![](http://7xjo8q.com1.z0.glb.clouddn.com/image/6/32/c3fade1d86bcfd12c02631583464a.png)
![](http://7xjo8q.com1.z0.glb.clouddn.com/image/2/4d/a3a8d97f283290e3b481c8aa92d2f.png)

## 在服务器B配置和启动harvester

服务器A server 用来监听各个机器发来的日志消息，服务器B harvester则把本机的日志发送给服务器A server。

所以，harvester在配置的时候，需要指定服务器A server的ip地址（或域名）

如何告诉 harvester哪些日志需要监控呢？

配置：`log_file_paths` 属性，指定日志路径，例如：

```bash
$ sudo vi ~/.log.io/harvester.conf
```

```js
exports.config = {
  nodeName: "test_server",
  logStreams: {
    cat: [
      "/var/log/repair-web.log",
      "/var/log/crm-web.log"
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 28777
  }
}
```
上面的例子配置是 服务器B harvester 把 repair-web.log 和crm-web.log 这两个日志的改动发送给 server

>注意： `~/.log.io/harvester.conf` 是log.io的默认配置路径


## 在服务器A上启动server

```bash
$ sudo log.io-server start
```
## 在服务器B上启动 harvester：

```bash
$ sudo log.io-harvester start
```

## 打开监控页面
服务的默认端口是28777
客户端UI界面的默认端口是28778
可以直接打开浏览器，输入你的ip:28778查看监控界面

## 测试一把

我已经安装好了，手动更新日志文件，可以看到web监控页面是可以正确监听到的。
![](http://7xjo8q.com1.z0.glb.clouddn.com/image/d/31/789a3ac37b457908de5899fb9fecc.png)


## Learn more
- [Log.io GitHub仓库](https://github.com/NarrativeScience/Log.io)

恭喜你获得了`使用Log.io`成就～
