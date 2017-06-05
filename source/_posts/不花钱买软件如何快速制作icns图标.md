---
title: 不花钱买软件如何快速制作icns图标
toc: false
comment: true
date: 2017-06-05 15:23:45
meta:
tags:
categories:
---

新标准的icns制作步骤显得非常繁琐，今天我利用OSX系统上自带的Automator制作了一个工作流程（service），使用它之后便可以在任意的png图片上右键点击”制作高清ICON”，便立即在同目录下生成对应的icns文件了。

<!--more-->

## 方法一：Automator 小脚本 （推荐）
目前我在10.8，10.12上测试OK，低于10.8的系统有待测试！

懒人们，点此下载(双击选择安装)：[制作高清ICON](http://dokuwiki/lib/exe/fetch.php?media=%E5%B0%8F%E6%8F%90%E7%A4%BA:%E5%88%B6%E4%BD%9C%E9%AB%98%E6%B8%85icon.zip)


## 方法二：手工方式

基于MacOS系统自带的`iconutil`命令

`iconutil -c icns "/Users/username/icon.iconset"`

`icon.iconset` 是一个文件夹，文件夹里面放以下文件，命名如下，@2x.png是双倍大小的

```
icon_16x16.png

icon_16x16@2x.png

icon_32x32.png

icon_32x32@2x.png

icon_128x128.png

icon_128x128@2x.png

icon_256x256.png

icon_256x256@2x.png

icon_512x512.png

icon_512x512@2x.png
```