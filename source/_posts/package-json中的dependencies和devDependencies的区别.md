---
title: package.json中的dependencies和devDependencies的区别
toc: false
comment: true
date: 2016-07-13 14:11:14
meta:
tags: [NPM,Node.js]
categories:
---

使用过NPM的同学应该都有一个疑问，那就是package.json文件中`dependencies`和`devDependencies`这两个选项到底有什么区别呢？接下来我来揭晓答案。

<!-- more -->

首先大家都知道，这两个选项是NPM包的依赖配置选项，可以配置此NPM包的模块依赖信息，而且从字面上的意思来看，`dependencies`就是指的依赖，而`devDependencies`在前面加了个`dev`，由此可以看出，它可能是跟NPM包的运行环境有关？但是这都是猜测。实际上是什么呢？

通过查阅相关资料，可以发现
> "dependencies": these packages are required by your application in production
> "devDependencies": these packages are only needed for development and testing

- `dependencies`配置的依赖是在正常运行（一般为生产环境）该包时必须要的依赖项

	什么意思？很简单，就是假设你的包被别人依赖了，那么别人在安装你的包时会自动安装你的包里的`dependencies`中配置的这些依赖包，也就是说你的包没有这些包就不能正常使用。

- `devDependencies`配置的依赖是你在开发你的包时安装的一些在生产环境非必要的依赖项。

	那什么是`生产环境非必要的依赖项`？比如说：你想使用mocha来测试你的包，那么就可以安装mocha到devDependencies,而不是dependencies，因为他不是生产环境所必须的。依赖你的包的人，是想依赖你的核心代码，而不是需要使用你包里的mocha

## 小技巧
一般我们使用`npm install xxx`来安装依赖，需要手动将依赖包的信息写入package.json文件中，那如何快速将需要依赖的包写入package.json文件中呢？又如何区分`dependencies`和`devDependencies`呢？
答案是非常简单的，NPM可以通过命令选项来自动写入依赖信息到package.json

假设，我们需要依赖`lodash`包。

1. 将`lodash`包信息写入`dependencies`中，只需加上`--save`选项即可
	```bash
	npm install lodash --save
	```

2. 将`lodash`包信息写入`devDependencies`中，只需加上`--dev-save`或者`--D`选项即可
	```bash
	npm install lodash --dev-save
	```
	or 
	```bash
	npm install lodash --D
	```




## 附录
- [using-a-package.json](https://docs.npmjs.com/getting-started/using-a-package.json#specifying-packages)
- [npm cli install](https://docs.npmjs.com/cli/install)
