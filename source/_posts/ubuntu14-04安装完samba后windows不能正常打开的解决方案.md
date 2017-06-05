---
title: ubuntu14.04安装完samba后windows不能正常打开的解决方案
toc: false
comment: true
date: 2016-07-28 16:12:39
meta:
tags:
categories:
---


按照正常步骤安装好samba后。发现在windows上死活连不上，检查了下日志文件：

```bash
tail -f -n 50 /var/log/samba/*
```


发现有类似这样的错误：


```
==> /var/log/samba/log.xxx<==
[2017/01/05 14:05:02.679045,  0] ../source3/lib/popt_common.c:68(popt_s3_talloc_log_fn)
  Bad talloc magic value - access after free
[2017/01/05 14:05:02.679437,  0] ../source3/lib/util.c:789(smb_panic_s3)
  PANIC (pid 2624): Bad talloc magic value - access after free
[2017/01/05 14:05:02.681251,  0] ../source3/lib/util.c:900(log_stack_trace)
  BACKTRACE: 38 stack frames:
   #0 /usr/lib/i386-linux-gnu/samba/libsmbregistry.so.0(log_stack_trace+0x29) [0xb7356459]
   #1 /usr/lib/i386-linux-gnu/samba/libsmbregistry.so.0(smb_panic_s3+0x28) [0xb7356558]
   #2 /usr/lib/i386-linux-gnu/libsamba-util.so.0(smb_panic+0x3a) [0xb76f0cfa]
   #3 /usr/lib/i386-linux-gnu/libtalloc.so.2(+0x1ea3) [0xb6c88ea3]
   #4 /usr/lib/i386-linux-gnu/libtalloc.so.2(+0x158f) [0xb6c8858f]
   #5 /usr/lib/i386-linux-gnu/libtalloc.so.2(_talloc_steal_loc+0xba) [0xb6c8f06a]
   #6 /usr/lib/i386-linux-gnu/libtalloc.so.2(_talloc_move+0x30) [0xb6c8f0c0]
   #7 /usr/lib/i386-linux-gnu/samba/libsmbd-base.so.0(+0x1a9a0b) [0xb7530a0b]
   #8 /usr/lib/i386-linux-gnu/samba/libsmbd-base.so.0(+0x1a9f48) [0xb7530f48]
   #9 /usr/lib/i386-linux-gnu/samba/libdbwrap.so.0(+0x59af) [0xb69469af]
   #10 /usr/lib/i386-linux-gnu/libtdb.so.1(+0x8c7d) [0xb64c7c7d]
   #11 /usr/lib/i386-linux-gnu/libtdb.so.1(tdb_parse_record+0x8b) [0xb64c260b]
   #12 /usr/lib/i386-linux-gnu/samba/libdbwrap.so.0(+0x5e62) [0xb6946e62]
   #13 /usr/lib/i386-linux-gnu/samba/libdbwrap.so.0(dbwrap_parse_record+0x4a) [0xb694380a]
   #14 /usr/lib/i386-linux-gnu/samba/libsmbd-base.so.0(fetch_share_mode_unlocked+0x88) [0xb7531e38]
   #15 /usr/lib/i386-linux-gnu/samba/libsmbd-base.so.0(get_file_infos+0x75) [0xb7528725]
   #16 /usr/lib/i386-linux-gnu/samba/libsmbd-base.so.0(smbd_dirptr_get_entry+0x87f) [0xb742a09f]
   #17 /usr/lib/i386-linux-gnu/samba/libsmbd-base.so.0(smbd_dirptr_lanman2_entry+0x193) [0xb7466d13]
   #18 /usr/lib/i386-linux-gnu/samba/libsmbd-base.so.0(+0x150249) [0xb74d7249]
   ....
```

解决方法很简单：

```bash
sudo apt-get install libtalloc2
```

实在不行，可以：

```bash
sudo apt-get upgrade
```
