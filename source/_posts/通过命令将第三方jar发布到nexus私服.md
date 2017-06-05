---
title: 通过命令将第三方jar发布到nexus私服
toc: false
comment: true
date: 2017-06-05 15:34:40
meta:
tags:
categories:
---

通过maven的deploy命令的方式添加第三方jar，需要先在maven的settings.xml中配置好nexus私服的相关信息

<!--more-->

- 在servers标签下添加server
  ```xml
  <!-- id可自己定义一个名称  以及私服的管理管的账号密码 -->
  <server>
    <id>nexus</id>
    <username>你的nexus的管理员用户名</username>
    <password>你的nexus的管理员密码</password>
  </server>
  ```

- 在mirrors和profiles下配置nexus私服
  ```xml
  <mirrors>
      <mirror>
        <id>nexus</id>
        <mirrorOf>*</mirrorOf>
        <!-- nexus 3.0 用这个-->
        <url>http://172.24.4.180:8081/repository/maven-public/</url>
        <!-- sonatype nexus 用这个 -->
        <!--<url>http://192.168.10.8:18080/nexus/content/groups/public/</url>-->
      </mirror>
  </mirrors>
  ```
  ```xml
  <profiles>
    <profile>
      <id>nexus</id>
      <repositories>
        <repository>
          <id>central</id>
          <url>http://central</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
        </repository>
      </repositories>
      <pluginRepositories>
        <pluginRepository>
          <id>central</id>
          <url>http://central</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
        </pluginRepository>
      </pluginRepositories>
    </profile>
  </profiles>

  <activeProfiles>
    <activeProfile>nexus</activeProfile>
  </activeProfiles>
  ```

## 发布jar包命令
```bash
$M2_HOME/bin/mvn deploy:deploy-file \
-DgroupId=org.java-websocket \
-DartifactId=Java-WebSocket \
-Dversion=1.3.0 \
-Dpackaging=jar \
-Dfile=./java_websocket.jar \
-Durl=http://172.24.4.180:8081/repository/3rd-party/ \
-DrepositoryId=nexus
```

## 踩坑提示

- -Durl=http://172.24.4.180:8081/repository/3rd-party/ 的路径是你要上传你的路径，你可以检查下nexus的components里有无3rd-party，没有的话自己建一个，名字随便取

- -DrepositoryId=nexus 这里的nexus是maven setting.xml里配置的server的id
```xml
<servers>
  <server>
    <id>nexus</id>
    <username>admin</username>
    <password>123</password>
  </server>
</servers>
```