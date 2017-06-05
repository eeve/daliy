---
title: 关闭或开启ubuntu的图形界面（桌面）功能
toc: false
comment: true
date: 2017-06-05 15:18:06
meta:
tags:
categories:
---

## 关闭图形界面
修改配置文件 `/etc/default/grub` 将 `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"` 改成 `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash text"`

然后运行下面代码，即可。

```bash
sudo update-grub
```

## 开启图形界面
在控制台下想进入桌面，可以在root用户下输入：

```bash
gdm
```

或者
```bash
startx
```

## 注意：

修改Ubuntu默认启动进入文本模式后，重新启动后停在Checking battery state问题

没关系，实际系统已经启动，按键 ALT+F1 即可进入输入用户名登录得字符提示界面