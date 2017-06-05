---
title: vmware ubuntu14.04安装vmwa_tools报错解决方案
toc: false
comment: true
date: 2016-07-28 17:15:31
meta:
tags:
categories:
---


今天在Vmware10中ubuntu14.04下安装VmwareTools报错了，在网上找到了解决方案，记录下来，方便以后查阅！

<!--more-->

## 版本信息

Vmware版本：VMware® Workstation 10.0.0 build-1295980

ubuntu版本：10.04

## 错报内容

```bash
Searching for GCC...
Detected GCC binary at "/usr/bin/gcc".
The path "/usr/bin/gcc" appears to be a valid path to the gcc binary.
Would you like to change it? [no] 

Searching for a valid kernel header path...
Detected the kernel headers at "/lib/modules/3.13.0-32-generic/build/include".
The path "/lib/modules/3.13.0-32-generic/build/include" appears to be a valid 
path to the 3.13.0-32-generic kernel headers.
Would you like to change it? [no] 

Using 2.6.x kernel build system.
make: Entering directory `/tmp/modconfig-ptB0j3/vmhgfs-only'
/usr/bin/make -C /lib/modules/3.13.0-32-generic/build/include/.. SUBDIRS=$PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= modules
make[1]: Entering directory `/usr/src/linux-headers-3.13.0-32-generic'
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/backdoor.o
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/backdoorGcc32.o
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/bdhandler.o
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/cpName.o
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/cpNameLinux.o
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/cpNameLite.o
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/dentry.o
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/dir.o
  CC [M]  /tmp/modconfig-ptB0j3/vmhgfs-only/file.o
/tmp/modconfig-ptB0j3/vmhgfs-only/file.c: In function ‘HgfsOpen’:
/tmp/modconfig-ptB0j3/vmhgfs-only/file.c:659:27: error: incompatible type for argument 3 of ‘HgfsSetUidGid’
                           current_fsuid(), current_fsgid());
                           ^
In file included from /tmp/modconfig-ptB0j3/vmhgfs-only/file.c:46:0:
/tmp/modconfig-ptB0j3/vmhgfs-only/fsutil.h:92:6: note: expected ‘uid_t’ but argument is of type ‘kuid_t’
 void HgfsSetUidGid(struct inode *parent,
      ^
/tmp/modconfig-ptB0j3/vmhgfs-only/file.c:659:27: error: incompatible type for argument 4 of ‘HgfsSetUidGid’
                           current_fsuid(), current_fsgid());
                           ^
In file included from /tmp/modconfig-ptB0j3/vmhgfs-only/file.c:46:0:
/tmp/modconfig-ptB0j3/vmhgfs-only/fsutil.h:92:6: note: expected ‘gid_t’ but argument is of type ‘kgid_t’
 void HgfsSetUidGid(struct inode *parent,
      ^
make[2]: *** [/tmp/modconfig-ptB0j3/vmhgfs-only/file.o] Error 1
make[1]: *** [_module_/tmp/modconfig-ptB0j3/vmhgfs-only] Error 2
make[1]: Leaving directory `/usr/src/linux-headers-3.13.0-32-generic'
make: *** [vmhgfs.ko] Error 2
make: Leaving directory `/tmp/modconfig-ptB0j3/vmhgfs-only'

The filesystem driver (vmhgfs module) is used only for the shared folder 
feature. The rest of the software provided by VMware Tools is designed to work 
independently of this feature.

If you wish to have the shared folders feature, you can install the driver by 
running vmware-config-tools.pl again after making sure that gcc, binutils, make
and the kernel sources for your running kernel are installed on your machine. 
These packages are available on your distribution's installation CD.
[ Press Enter key to continue ]
```

## 解决方案

依次执行下列命令
```
- apt-get install dkms linux-headers-$(uname -r) build-essential psmisc
- git clone https://github.com/rasa/vmware-tools-patches.git
- cd vmware-tools-patches/patches
- Remove every folder except "vmhgfs".
- Get the last version of VMwareTools clicking on VMWare Bar > VM > Install/Reinstall VMWare Tools. It will open a virtual CD containing the "tar" file.
- Copy VMwareTools-9.2.4-1398046.tar.gz to "vmware-tools-patches" folder.
- On "vmware-tools-patches" folder, run: ./untar-and-patch-and-compile.sh
```

