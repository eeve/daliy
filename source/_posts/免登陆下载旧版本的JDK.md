---
title: 免登陆下载旧版本的JDK
date: 2017-01-01 08:20:44
---

JDK已经升到了8.x了，现在想要在官网下载老版本的JDK，需要登录了，非常的麻烦，这里教你一招，绕过登录验证。

<!-- more -->

## 2017-06-05更新
### 下面的绕过方法已经失效！Oracle官网已经加了token校验，所以现在必须要登录才能下载旧版本的JDK

既然必须要登录，大家又懒得注册账号，那就共享一个咯。（请大家不要修改帐户信息，因为这个账号也是我在网上找的！）

```
2696671285#qq.com (#号换成@)
密码：Oracle123
```

## 2017-01-01原文

先去到下载的页面。找到需要下载的版本，右键选择复制链接地址。

{% qn_img qq截图20170105160359.png title:小提示 %}


例如我复制的链接地址是：

`http://download.oracle.com/otn/java/jdk/7u80-b15/jdk-7u80-linux-x64.tar.gz`

我们需要的是其中的：`7u80-b15/jdk-7u80-linux-x64.tar.gz` 这一截


可以直接下载的URL是

```bash
http://download.oracle.com/otn-pub/java/jdk/改为上面那一截字符串
```


例如我下载JDK7u80，下载的URL则是：

```bash
http://download.oracle.com/otn-pub/java/jdk/7u80-b15/jdk-7u80-linux-x64.tar.gz
```

将这个URL粘贴到浏览器中回车就能下载了，非常方便呢~

## 注意
经过测试，以上操作一定要按照步骤来，在浏览器中操作，不能直接拷贝别人给你的url直接下载，这样可能会失败，我猜是官网有cookie等信息需要校验。