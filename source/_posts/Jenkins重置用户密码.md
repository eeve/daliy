---
title: Jenkins重置用户密码
toc: false
comment: true
date: 2016-07-06 09:53:45
meta: 
tags: [教程]
categories:
---


Jenkins重置密码方法，如果忘记了Jenkins的登录密码，可以通过此方式重置
<!-- more -->

Jenkins的用户登录和权限等配置信息都是存储在XML文件中的，因此可以通过修改XML来改变原有的配置信息。
这里修改密码就是通过这种方式来做的。

进入/var/lib/jenkins
```bash
cd /var/lib/jenkins
ll
```

{% qn_img 1.png %}

可以看到有一个users目录，此目录就包含了你的Jenkins所有用户的配置信息，进入其中
```bash
cd users
ll
```
{% qn_img 2.png %}


可以看到所有的用户名字对应的文件夹,进入需要修改的用户文件夹，例如：jk
```bash
cd jk
ll
```
{% qn_img 3.png %}

可以看到，只有一个config.xml配置文件，可以先备份一下
```bash
cp -a config.xml config.xml.bak
```

然后修改config.xml文件
```bash
vi config.xml
```
{% qn_img 4.png %}

## 重置密码
在config.xml配置文件中，找到 `<passwordHash>` 节点，并将其中的值修改为：
`#jbcrypt:$2a$10$DdaWzN64JgUtLdvxWIflcuQu2fgrrMSAMabF5TSrGK5nXitqK9ZMS`

此密文对应的密码是111111 (6个1)

## 重启Jenkins
```bash
service jenkins restart
```
重启完成之后，就可以使用111111 (6个1)密码登录了。

## 删除备份文件
如果成功使用111111登录，则可以删除刚才备份的config.xml文件了。
```
rm /var/lib/jenkins/users/xxx/config.xml.bak
```

## 使用Jenkins界面修改密码
如果你想将111111修改为自己想要的密码的话，请使用111111登录Jenkins，然后继续下面步骤：
登录之后在有上角找到自己的用户名，并点击：
{% qn_img 2.1.png %}


在接下来的页面左侧点击设置链接，进入设置页面
{% qn_img 2.2.png %}

在设置页面中找到`密码`项，输入新密码，然后点击页面最下方的Save按钮即可。
{% qn_img 2.3.png %}









