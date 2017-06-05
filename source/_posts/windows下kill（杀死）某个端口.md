---
title: windows下kill（杀死）某个端口
toc: false
comment: true
date: 2016-08-08 12:18:23
meta:
tags:
categories:
---


step1 : `netstat -ano | findstr 端口号`

step2 : `taillist 5704` (可不做，只是查看是win下面的那个exe占用了。)

step3 : `taskkill /pid` [加上step1查询出来的pid端口号] /F