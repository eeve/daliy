---
title: CocoaPods卡在Setting up CocoaPods master repo的解决方案
toc: false
comment: true
date: 2016-07-20 15:51:40
meta:
tags: [CoCoaPods,iOS,教程]
categories:
---

 出现这个的原因一般都是初始化CoCoaPods时，github的代码下载不动造成的。
 因为运行`pod setup`会将`https://github.com/CocoaPods/Specs.git`的代码下载到`~/.cocoapods/repo/master`中,因为github下载速度慢，所以慢，(悲伤脸)。

 解决方案是将github上的specs仓库镜像换成`coding`上的镜像或者是`oschina`上的镜像
 最好用ssh的方式clone，需要到官网登录账户去配置ssh key
 ```bash
 pod repo remove master

 //coding.net 每日更新，建议使用这个
 pod repo add master https://git.coding.net/CocoaPods/Specs.git
 // ssh 地址：git@git.coding.net:CocoaPods/Specs.git

 //或者用oschina
 pod repo add master https://git.oschina.net/akuandev/Specs.git
 // ssh 地址：git@git.oschina.net:akuandev/Specs.git
 ```

 如果出现下面一样提示失败或者setup不成功，可以手动将代码clone下来
```bash
[!] To setup the master specs repo, please run `pod setup`.
```

 ```bash
 git clone https://git.coding.net/CocoaPods/Specs.git ~/.cocoapods/repos/master
 pod setup  //务必在手动下载代码后执行一次,执行后 Setup completed
 // 再执行
 pod install --verbose --no-repo-update //避免去更新了
 ```

最后，祝好运！
