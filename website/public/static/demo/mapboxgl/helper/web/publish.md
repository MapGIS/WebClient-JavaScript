# Nginx 

## 安装 & 权限
> Nginx最常见的问题是安全权限问题

1. 安装指南
   ``` sh
   yum install epel-release -y
   yum install nginx -y
   ``` 
2. 配置规则 /etc/nginx/nginx.conf
   ``` conf
   user root;  # 用户建议改成root
    server {
        listen       8086;

        root         /opt/webclient/site;  # 指定位置，关键点1
	    index        index.html   # 指定入口得index.html
    }
   ```
3. 修改指定位置权限，由于关键点1使用的是自定义的位置  /opt/webclient/site，因此需要修改系统权限，详情请看[Nginx-SELinux](https://goodmemory.cc/selinux%E7%9B%B8%E5%85%B3%E7%9A%84permission-denied%E9%97%AE%E9%A2%98/)
    ``` sh
    chcon -R -u system_u /opt/webclient/site/
    chcon -R -t usr_t /opt/webclient/site/
    ```

## Https / Http的处理方式

``` conf
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       6163;
        server_name  develop.smaryun.com;
        root   html;
        index  index.html index.htm;
        location / {
		    #下面的改成自己tomcat项目的地址 9007必须是内部非对外开放的端口 可以再igserver里面修改
            proxy_pass   http://127.0.0.1:9007;
        }
    }
    server {
        listen       443 ssl;
        server_name  develop.smaryun.com;

        ssl_certificate      cert/develop.pem;
        ssl_certificate_key  cert/develop.key;

        # ssl_session_cache    shared:SSL:1m;
        # ssl_session_timeout  5m;

        # ssl_ciphers  HIGH:!aNULL:!MD5;
        # ssl_prefer_server_ciphers  on;

        location / {
            #下面的改成自己tomcat项目的地址 9007必须是内部非对外开放的端口 可以再igserver里面修改
            proxy_pass http://127.0.0.1:9007;
        }

        # location / {
        #     root   html;
        #     index  index.html index.htm;
        # }
    }
}
```