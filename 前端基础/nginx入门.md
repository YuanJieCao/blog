## nginx 的初识
首先是安装 是在centos下的，ubantu没试应该差不多。
yum -y install gcc gcc-c++ autoconf pcre-devel make automake
yum -y install wget httpd-tools vim
下载一些的基本的环境
nginx.conf是总配置文件，conf.d文件夹里是子配置项，前端的反向代理一般都在里面实现
一个基本的server配置项
server{
listen 80;//监听的端口
server_name localhost；//域名
location / {
root /usr/share/nginx/html //默认的启动项目录
index index.html //默认的访问文件

}
//配置多个错误状态吗对应一个页面
error_page 500等 /50x.html；
location = /50x.html{
root /usr/        //精确匹配这个页面去那个文件夹下找
}
error_page 404 /404.html

//匹配所有的路径都代理到 baidu.com 这个域名下
location / {
proxy_pass http://ww.baidu.com；

//以下配置未看
proxy_set_header :在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。
proxy_connect_timeout:配置Nginx与后端代理服务器尝试建立连接的超时时间。
proxy_read_timeout : 配置Nginx向后端服务器组发出read请求后，等待相应的超时时间。
proxy_send_timeout：配置Nginx向后端服务器组发出write请求后，等待相应的超时时间。
proxy_redirect :用于修改后端服务器返回的响应头中的Location和Refresh。
}

location / {
//权限问题 所有的都拒绝请求
deny all;
allow ip; //允许那个ip进行访问
}
location =/admin{
//对于这个网站下的admin目录下进行权限的控制
//deny 和allow 会有前者覆盖后者 deny all ; allow ip ;及所有的都无法访问
}
//移动端的适配
location{
root ...;
//用他给的参数进行正则的匹配
if($http_user_agent ~*'(iphone)'){
root ...//
}
index ...;
}

nginx 配置g-zip
g-zip  on;
gzip_type text/plain application/javascipt text/css;//进行压缩的文本类型



}
基本的命令：再高级的版本可以直接nginx 直接启动，
也可以nginx -s start，stop等。也可以直接使用最通用的systemctl start nginx.service指令。
netstat -tlnp 查看占用的端口号

可以多端口 访问不同路径，可以设置多ip 访问不同路径 等等