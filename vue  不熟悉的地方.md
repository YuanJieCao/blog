# vue  不熟悉的地方

## 两种携带参数的方法

- params  申明式导航里面 使用对象写法需要使用name配置项进行跳转 并且需要在路由里面配置占位符。
- query  申明式导航里面  

接收参数则通过`this.$routes.params`来获取或者`this.routes.query`来获取

## 路由的props 配置

1.props的对象写法

```
{
name:"",
path:"/:id/:title",
component:"",
props:{a:1,b:"hello"}
}
在需要的props值得地方在用props：[]接收
```

2.`props:true` 那么将会把所有的params的参数全都以props传递 ----只会传递params

3.props的第三种方法

```
props($route){
return {id:$route.query.id,titile:"123"}
}
```

## 路由的replace模式

replace模式是替换当前的路由，一种类似于push 往栈的里面追加

```
<replace=true>//启用
```

前进forward 后退back 还有go()

缓存组件 让不展示的路由保持挂载

`<keep-alive include='news'>`

新的生命钩子

`activated(){`

`}`---->激活时启用

`deactivated(){}`---------->失活时调用

#### 路由守卫

```
router.beforeEach（to,from next）前置守卫
router.afterEach(to, from) 路由后置守卫
beforeEnter 路由独享
beforeRouterEnter 通过路由规则时嗲用
beforeRouterLeave 离开路由时调用
```

`meta`路由的元数据

### 路由的两种模式

1. hash
2.  history 