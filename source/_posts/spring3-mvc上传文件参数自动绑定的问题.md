---
title: spring3 mvc上传文件参数自动绑定的问题
date: 2016-06-17 13:43:58
tags:
---

<!-- more --> 

``` java
    @RequestMapping(value = "upload", method = RequestMethod.POST)
    @ResponseBody
    public Object upload(MultipartFile file) {
        //some code
        return xxx;
    }
```

以上代码在运行时报错。

``` bash
2014-8-4 18:29:42 org.apache.catalina.core.StandardWrapperValve invoke
严重: Servlet.service() for servlet springServlet threw exception
java.lang.IllegalArgumentException: Expected MultipartHttpServletRequest: is a MultipartResolver configured?
    at org.springframework.util.Assert.notNull(Assert.java:112)
    at org.springframework.web.method.annotation.RequestParamMethodArgumentResolver.resolveName(RequestParamMethodArgumentResolver.java:151)
    at org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver.resolveArgument(AbstractNamedValueMethodArgumentResolver.java:86)
    ...
    at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:102)
    at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:109)
    at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:298)
    at org.apache.coyote.http11.Http11Processor.process(Http11Processor.java:857)
    at org.apache.coyote.http11.Http11Protocol$Http11ConnectionHandler.process(Http11Protocol.java:588)
    at org.apache.tomcat.util.net.JIoEndpoint$Worker.run(JIoEndpoint.java:489)
    at java.lang.Thread.run(Thread.java:662)
```

解决方法：

spring mvc中上传附件，需要做两步操作

1.引入包commons-fileupload-1.3.jar或添加maven依赖，版本号可以根据项目情况调整；
``` xml
      <dependency>
        <groupId>commons-fileupload</groupId>
        <artifactId>commons-fileupload</artifactId>
        <version>1.3.1</version>
      </dependency>
```
2.在spring mvc配置文件中增加配置，文件大小限制可根据项目情况调整：
``` xml
<!-- 上传文件拦截，设置最大上传文件大小   10M=10*1024*1024(B)=10485760 bytes -->  
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">  
    <property name="maxUploadSize" value="10485760" />  
</bean>
```