# Ajax

## 简介

1. 无刷新获取数据

xml 可扩展标记语言，储存和传输数据，html有预先定义好的标签

## Ajax的优缺点

### 优点
1. 无须刷新页面就可以通信
2. 允许你根据用户事件来更新部分的网页内容

### 缺点
1. 不能像普通的网页那样后退
2. seo差，所有的数据都是存放在后端的，对于爬虫很不友好

## http协议

### 请求报文

```
请求行  get  /url/. http/1.1的版本
请求头
空行
体 body
```



### 响应报文

```
响应行  http版本 +200+ ok
请求头 对这个信息的描述
空行
体  <html>
    <head></head>
    <body></body>
		</html>
```



## Ajax的格式

```
const xhr =new XMLHttpRequest()
//设置请求超时的响应
xhr.timeout(3000)
xhr.ontimeout=function(){
//请求超时的调用
}
xhr.onerror=function(){
//请求网络错误的调用
}
//转换返回的值为json格式
xhr.response="json"
xhr.open("get","http://127.0.0.1:8000:/ie?t="+Date.now())
//设置请求头信息 需后端人员配合
xhr.setResquest("Conte nt-Type","applicaton")
//发送的请求体
xhr.send()
有五个状态值 0，1，2，3，4
xhr.onreadystatechange=function(){
if(xhr.readyState===4){
if(xhr.status>=200&&xhr.status<300){
		//处理结果
		console.log(xhr.status)//状态码
		console.log(xhr.statusText)//状态字符串
		conosle.log(xhr.AllResponseHeaders())//所有的响应头
		console.log(xhr.response)
		
	
}else{

}
}
```



协议、域名、端口号

## jsonp解决跨域问题

script标签跨域请求，后段传来的是一个j s代码，里面可以是前端已经写好的函数。

cors解决跨域问题的配置