---
title: 通过Homebrew在Mac下安装MySQL
date: 2016-06-17 13:44:30
comment: true
toc: true
tags:
 - 安装
---

MySQL是我经常要使用的一个数据库软件，在新的系统上不想自己动手编译安装，而且时间紧迫的情况下，我们可以借助Homebrew这个工具来帮助我们快速安装配置好MySQL。

<!-- more --> 

Homebrew是Mac系统下的一个包管理工具，具体怎么安装建议去[brew官网](http://brew.sh/index_zh-cn.html)查看

> 以下操作需要先安装好Homebrew


## 开始安装MySQL
真正的安装只需执行一条指令：
``` bash
brew install mysql
```

## 开始使用
不出意外就会安装成功，你可以使用下面那条指令来启动MySQL服务
``` bash
mysql.server start
```

启动后即可登录MySQL，提示输入数据库密码，初始没有密码的情况下直接回车，就进入数据库了
``` bash
mysql -uroot -p
```

## 其他
如果想设置开机启动，执行下面的指令
```
mkdir -p ~/Library/LaunchAgents
```

``` bash
cp /usr/local/Cellar/mysql/5.6.16/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/
```

> 5.6.16是数据库版本号，根据你当时所安装的版本号自己修改

``` bash
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
```

## 问题

如果在成功安装完成，想要登录的时候报了这个错误:
``` bash
ERROR 2002 (HY000): Can not connect to local MySQL server through socket '/tmp/mysql.sock' (2)
```

请依次执行，再执行后续操作
``` bash
unset TMPDIR
```

``` bash
bash mysql_install_db --verbose --user=root --basedir="$(brew --prefix mysql)"--datadir=/usr/local/var/mysql --tmpdir=/tmp
```