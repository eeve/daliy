---
title: pip自身升级方法
toc: false
comment: true
date: 2017-06-05 16:10:19
meta:
tags:
categories:
---

今天在安装superset的依赖时，运行：
```
pip install -r requirements.txt
```
抛出如下错误，发现原来是pip版本过低，通过以下命令升级pip版本即可解决错误：
`ValueError: ('Expected version spec in'...`

```
python -m pip install -U pip
# or 
pip install --upgrade pip
```