---
title: ubuntu下安装时髦的Atom编辑器
date: 2016-06-17 13:44:49
tags: 安装
toc: true
---


最近都快被ubuntu下的Sublime Text3编辑器逼疯了。经常崩溃，各种卡死，有几次机器都被它搞跪了，各种BUG无力吐槽... Sublime Text在ubuntu下的各种鸡肋，让我决定尝试更换一种编辑器来代替Sublime Text，于是我猥琐的尾随了GitHub家的Atom。
<!-- more -->

## 体验Atom

Atom是Github上时髦的，功能丰富的开源文本编辑器。目前，它正处于测试阶段，但如果你和我一样对它很好奇，那我们就来看看如何在 Ubuntu 14.04 上安装 Atom。


无论是在外观，还是在功能上，Atom 都有很多与Sublime Text相似之处。Sublime Text 是一个功能强大，并深受程序员喜爱的跨平台文本编辑器，可惜它是闭源的。事实上，在Sublime Text的灵感下，Atom 并不是唯一即将到来的文本编辑器。Lime Text是 Sublime Text 的开源克隆，目前正处于开发中。

## 开始安装
因为 Atom 正处于测试阶段，截止到我写这篇文章前，还没有 Linux 下的二进制文件。
but 不用担心，你不需要亲自去编译这些代码（当然如果你乐意的话，你也可以这么做）。感谢
[Webupd8 team’s](https://launchpad.net/~nilarimogard/+archive/ubuntu/webupd8)的努力，我们拥有了一个可以很容易将 Atom 安装在32位和64位系统上的PPA。

打开终端，然后使用下面的命令行：
``` bash
sudo add-apt-repository ppa:webupd8team/atom
sudo apt-get update
sudo apt-get install atom
```

全部运行完后，你可以通过 Ubuntu 下的 Unity Dash 里的应用程序菜单启动 Atom 编辑器。就这么简单！

## 关于卸载
OK，可能，你想要从系统中卸载 Atom 的原因有很多种。不稳定可能是主要原因之一，毕竟它还在测试阶段。好吧，不管什么原因，我来说下怎么卸载Atom

``` bash
sudo apt-get remove atom
sudo add-apt-repository --remove ppa:webupd8team/atom
```

这些命令会移除 Atom 和 PPA 仓库，当然你也可以运行 auto remove

``` bash
sudo apt-get autoremove
```

## 后记

欢迎品尝Atom，它会成为你喜欢的编辑器吗？请尽情吐槽！
