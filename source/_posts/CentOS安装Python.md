---
title: CentOS安装Python
toc: false
comment: true
date: 2017-06-05 16:04:28
meta:
tags:
categories:
---

从源码编译安装Python各个版本

<!-- more -->

## 环境准备
```
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make
```

## 源码准备
源码可以在`http://mirrors.sohu.com/python`下载到。以安装`3.4.3`为例

```
wget http://mirrors.sohu.com/python/3.4.3/Python-3.4.3.tar.xz
```

## 编译安装
```
xz -d Python-3.4.3.tar.xz
tar -xf Python-3.4.3.tar -C /usr/local/src/
cd /usr/local/src/Python-3.4.3/
./configure --prefix=/usr/local/python343
make -j8 && make install
```

## 说明
安装完成后，安装目录在`/usr/local/python343`

