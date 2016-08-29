---
title: SSH配置之免密码登录
toc: true
comment: true
date: 2016-06-24 10:32:59
meta:
tags: [教程]
categories:
---

在日常的工作中,登录服务器操作中复杂的密码输入是不是经常让你抓狂,输入完密码还得输入自定义端口是否让你吐血,那么问题来了,怎样才能优雅的登录服务器呢?

<!-- more -->

# SSH安全验证
## 基于密码
采用这种方式，只需要知道远程服务器的帐号和密码，就可以登录到远程服务器。所有传输的数据都会被加密，但是不能保证你正在连接的服务器就是你想连接的服务器。
可能会有别的服务器在冒充真正的服务器，也就是说这种方式的连接有可能会受到“中间人”这种方式的攻击。

## 基于密钥
这种方式，需要依靠密钥，也就是说你必须为自己创建一对密钥对（公钥和私钥），并且把该公钥放到需要访问的服务器上(相当于:在目标服务器登记你的信息)。
如果你要连接到SSH服务器，SSH客户端会向SSH服务器发出请求，请求用你的密钥进行安全验证。
SSH服务器在收到该请求之后，会先在ssh服务器上，检查你登陆的用户的主目录下寻找对应的公钥，然后把它和你发送过来的公钥进行比较。
如果两个公钥一致，SSH服务器就用公钥加密“质询”（challenge）并把它发送给SSH客户端。SSH客户端在收到“质询”之后就可以用你的私钥解密该“质询”，再把它发送给SSH服务器。

这种安全验证方式，你必须知道自己密钥的加密口令。当然，自己的密钥也可以不加密，而且这种不加密密钥的方式，在平时工作中使用的也比较多。


通过以上对比，我们可以很容易看出。与基于密码的安全验证相比，基于密钥的安全验证是不需要在网络上传输密码。除此之外，我们还可以看出，“中间人”这种攻击方式也是不可能的（因为他没有你的私钥）。

# SSH无密码登录
通过以上SSH的两种安全验证方式可以知道，要做到SSH无密码登陆服务器，我们就需要使用SSH密钥验证的这种方式。

## 名词约定
下面的操作涉及到的几个对象:
- 本地主机,想要去登录远程主机的主机(A主机)
- 远程主机,想要免密码登录的目标主机(B主机)

## 创建SSH密钥
在A主机上,生成一对密匙(公钥和私钥),具体命令:`ssh-keygen -t rsa`


```bash
➜  ~ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/imacforeeve/.ssh/id_rsa):
```
请根据命令提示输入你要保存密匙的路径及文件名称,默认是~/.ssh/id_rsa。(上图是:/Users/imacforeeve/.ssh/id_rsa)
可以直接回车使用默认路径。

接下来会询问你要为密匙设置的密码,以及确认密码。(此时不要输入任何密码,直接回车。)
```bash
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

然后你会看到密匙生成成功提示:
```bash
Your identification has been saved in /Users/imacforeeve/.ssh/id_rsa.
Your public key has been saved in /Users/imacforeeve/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:oTaSoq2s29I87oV8DepqATZGBr7hPK4S0pHXyc+g2UY imacforeeve@iMacdeiMac-3.local
The key's randomart image is:
+---[RSA 2048]----+
|o                |
|.o               |
|oo . o ..        |
|++= ..E. .       |
|+*oo+=++S        |
|+=o+o=o.o        |
|o=* o..          |
|==+o             |
|XB=.             |
+----[SHA256]-----+
```

到此为止,你已经在A主机成功生成了没有密码的公钥(id_rsa)和私钥(id_rsa.pub)。

## 将公钥放到B主机上
有了公钥以后,需要将公钥上传至B主机上完成登记。用到的命令如下:
```bash
scp ~/.ssh/id_rsa.pub root@111.111.111.111:.ssh/id_rsa_xxx.pub
```
请将root@111.111.111替换成你的主机地址,id_rsa_xxx.pub可以随便取名

如果成功,到此为你在A主机的操作就基本完成了。

## B主机配置
现在B主机已经有了A主机的SSH公钥了。

### 将公钥中的内容添加到`~/.ssh/authorized_keys`中
该文件用于保存SSH客户端生成的公钥，可以修改服务器的SSH服务端配置文件`/etc/ssh/sshd_config`来指定其他文件名

请先确保`~/.ssh/authorized_keys`文件是存在的,如果已经存在,请跳过下面的创建命令,如果不存在,请执行下面的命令手动创建一个。
```bash
touch /root/.ssh/authorized_keys
```

### 修改authorized_keys的权限
必须将`~/.ssh/authorized_keys`的权限改为600。

```bash
chmod 600 ~/.ssh/authorized_keys
```

### 将A主机的公钥(id_rsa.pub)的内容追加到authorized_keys中
> 注意: 请不要使用 > ，否则会清空原有的内容，使其他人无法使用原有的密钥登录

```bash
 cat ~/.ssh/id_rsa.pub  >> ~/.ssh/authorized_keys
```

## 测试无密码登录
到此,整个配置都完成了。
请回到A机器:
```bash
ssh root@111.111.111.111 -p 22 -i ~/.ssh/id_rsa (不需要密码, 登录成功)
```
> 注意:假如在生成密钥对的时候指定了其他文件名,则需要使用参数-i指定私钥文件,否则-i参数可以省略

# 其他优化

## 免密码登录控制N台机器
想要控制N台机器，你可以生成多对密钥，使用参数-i指定私钥文件就可以快速登录到不同的服务器了

scp也是一样，如：
```bash
scp -i ~/.ssh/id_rsa root@111.111.111.111:/home/www/xxx
```

## 使用alias别名
可以使用alias配置别名,然后使用别名快速登录。比如在~/.bashrc或~/.zshrc中添加类似下面的配置:

```
alias sshServer1="ssh root@111.111.111.111 -p 22 -i ~/.ssh/id_rsa"
alias sshServer2="ssh root@111.111.111.111 -p 22 -i ~/.ssh/server2_id_rsa"
alias sshServer2="ssh root@111.111.111.111 -p 22 -i ~/.ssh/server3_id_rsa"
```

然后
```bash
source ~/.bashrc
```
或
```bash
source ~/.zshrc
```

最后直接使用别名登录
```bash
sshServer1
```

## 其他
因为默认情况下ssh命令会使用~/.ssh/id_rsa作为私钥文件进行登录，如果需要连接多台服务器而又不希望每次使用SSH命令时指定私钥文件，
可以在SSH的客户端(A机器)全局配置文件/etc/ssh/ssh_config（或本地配置文件~/.ssh/config, 如果该文件不存在则建立一份）中增加如下配置:
```
IdentityFile /path/to/your_id_rsa
```
也可以为每个服务器指定一个Host配置:
```
Host 111.111.111.111
    IdentityFile /path/to/your_id_rsa
```
如果连接时出现如下的错误：
`Agent admitted failure to sign using the key`
则使用 `ssh-add` 指令将私钥加进来 （id_rsa为私钥名称）
```bash
ssh-add   ~/.ssh/id_rsa
```