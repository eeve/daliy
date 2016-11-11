---
title: iPhone科学上网正确姿势
toc: false
comment: true
date: 2016-07-14 11:49:33
meta:
tags: [科学上网]
categories:
---

相信很多人和我一样，很想利用手上的iPhone自由地享受互联网。在天朝，你必须借助梯子才能看到真正的世界！
在PC端，可以有很多梯子可以选择，而在未越狱的iPhone上却不是那么容易，那什么才是简单而又方便的科学上网姿势呢？希望通过此文能够让你进入新世界的大门！

<!-- more -->

其实翻墙无非就是使用代理服务器，利用一台没有被墙的、并且能够自由访问互联网的机器来上网。
{% asset_img 350px-Schematic_Proxy_Server.png 350px-Schematic_Proxy_Server.png %}
> 图解：左边和右边的电脑在通讯时候，需要经过中间的电脑中转，而中间的那部电脑就是代理服务器。


代理服务器根据协议来区分的话，一般分为以下几种：

| 代理类型  |  说明 | 常用端口  |
|---|---|---|---|---|
| FTP  |  主要用于访问FTP服务器，一般有上传、下载以及缓存功能。 |  21、2121  |
| HTTP  |  主要用于访问网页，一般有内容过滤和缓存功能。 | 80、8080、3128  |
| SSL/TLS  |  主要用于访问加密网站，一般有SSL或TLS加密功能（最高支持128位加密强度）。 |  443 |
| RTSP  |  主要用于Realplayer访问Real流媒体服务器，一般有缓存功能。 |  443 |
| Telnet  |  主要用于telnet远程控制（黑客入侵计算机时常用于隐藏身份）。 |  23 |
| POP3/SMTP  |  主要用于POP3/SMTP方式收发邮件，一般有缓存功能。 |  110/25 |
| SOCKS |  只是单纯传递数据包，不关心具体协议和用法，所以速度快很多。一般有缓存功能。（SOCKS代理协议又分为SOCKS4和SOCKS5，SOCKS4协议只支持TCP，而SOCKS5协议支持TCP和UDP，还支持各种身份验证机制、服务器端域名解析等。简单来说：SOCK4能做到的SOCKS5都可以做到，但SOCKS5能做到的SOCK4不一定能做到） |  1080 |

综上所述，我们需要`一台没有被墙的、并且能够自由访问互联网的机器`，而且还要通过其中的一种代理类型来实现代理。



我们必须利用其中一种代理方式来实现在iPhone上科学上网，目前iPhone支持HTTP与SOCKS这种方式。

> 注意：在iPhone设备的 `设置` -> `无线局域网` 的详情下只能看到`HTTP代理`，并且可以看到iPhone的HTTP代理支持两种模式，即：手动，自动。如下图：
{% asset_img iphone-settings-wlan-detail.png %}

## SOCKS代理配置方法

想用SOCKS代理协议，请将HTTP代理模式设置为`自动`

```javascript
function FindProxyForURL(url, host) {
    // 局域网流量不走代理
    if (isInNet(host, "192.168.1.0", "255.255.255.0"))
        return "DIRECT";
    // 其他使用SOCKS代理
    return "SOCKS proxy_host:proxy_port";
}
```
将以上代码中的`proxy_host`替换成 SOCKS服务器实际的IP地址
将以上代码中的`proxy_port`替换成 SOCKS服务器实际的端口号

然后保存为 `proxy.pac`，并且放到一个文件服务器上，得到他的访问地址，例如：`https://eeve.me/proxy.pac`

填写iPhone上的 `URL`配置项为上面的文件访问地址，就可以使用SOCKS代理了

## HTTP代理配置方法

请将HTTP代理模式设置为`手动`，然后在填入HTTP代理服务器的地址（ 需写上http协议前缀: http:// or https:// ）和端口号即可


## 参考资料
- [https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8)
- [https://zh.wikipedia.org/zh/%E4%BB%A3%E7%90%86%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE](https://zh.wikipedia.org/zh/%E4%BB%A3%E7%90%86%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE)



