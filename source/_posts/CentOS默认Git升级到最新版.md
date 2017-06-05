---
title: CentOS默认Git升级到最新版
toc: false
comment: true
date: 2016-06-05 16:19:38
meta: 
tags: ['CentOS']
categories:
---

## 先安装libiconv

可以在 [http://ftp.gnu.org/pub/gnu/libiconv/](http://ftp.gnu.org/pub/gnu/libiconv/) 找到最新的libiconv，下载并安装。

参考命令：
```bash
wget http://ftp.gnu.org/pub/gnu/libiconv/libiconv-1.14.tar.gz
tar -zxvf libiconv-1.14.tar.gz
cd libiconv-1.14
./configure --prefix=/usr/local/libiconv
make && make install
```



## 卸载现有的Git
参考命令：

```bash
yum remove git
```

## 下载最新版的Git
可以到 [https://github.com/git/git](https://github.com/git/git/releases) 查看最新版本，下载并安装。参考命令：
```bash
wget https://github.com/git/git/archive/v版本号.tar.gz
tar -zxvf vx.x.x.tar.gz
cd x.x.x
make configure
./configure --prefix=/usr/local/git --with-iconv=/usr/local/libiconv
make all doc
make install install-doc install-html
echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
source /etc/bashrc
```

## 检查是否更新成功

```bash
git --version
```



