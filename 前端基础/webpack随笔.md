# webpack随笔

1. url-loader,是设置option:{limit:1024},小于这个数值的会打包到j s文件中

2. --watch,开启热更新的，会有i o的操作

3. webpack-dev-server--open 存放在内存里

4. PATH这个包的函数

5. 文件指纹做一个版本管理,hash,chun-hash,content-hash

6. postcss是个loader,传入参数：option:{plugins:()=>{require("")({插件的参数})}

7. scopehoisting
   1. 本身的打包会形成闭包，如果模块很多，就会导致打包的体积增大。
   2. 使用了scope hoisting之后，他会进行判断，是否为引用，和单引用，单引用会直接内联到相应的模块中，如果是多引用会放在外面然后变量引入。
   3. 只支持es6语法，不适用common js语法。只能识别静态的，不能分析动态引入的require文件。并且将import和export打包成相应的特殊字符

8. split chuck 
   1. syntax-dynamic-import 语法动态
   2. 某些组件的懒加载，tab的切换，import语
   3. ```
      fn(){import（“”）.then((res)=>{
      //需要加载的内容
      })
      }
      //监听事件触发上面的函数,将内容加载到页面中
      ```

9. eslint,

   1. 安装husky,增加npm script 通过lint-staged增量检查修改的文件
   2. eslint与webpack 结合与eslint-loader结合

10. s

11. 

    z

12. 











splitchuncksplugin

htmlwebpackexternalsplugin:{

cacheGRops:{

commons:{

test://,

name:""

chunks:"all"

}

}

}

 **Ij&pKp=$nnvrYC**

![截屏2022-06-05 22.08.54](/Users/caoyuanjie/Library/Application Support/typora-user-images/截屏2022-06-05 22.08.54.png)

 wget https://git.io/vpnsetup -O vpnsetup.sh

chmod +x vpnsetup.sh

sudo sh vpnsetup.sh







source map的类型:  

- eval eval会将js的代码包裹，然后在最后会哟sourcemap 
- cheap 只显示行
- source-map 会单独生成一个map.js文件
- module

代码分割 split chucks

- 公共的模块的打包
- 多次复用的代码打包到一起
- import 动态导入后的打包

webpack的s s r

1. 尝试用express当服务器，首先是配置webpack的config.js文件
2. 然后增加libaray Target:"umd"
3. 在配置相关的express选项，总体来说，就是取得打包好的dist里的首屏j s文件，将其转换为字符串的形式添加到html模版中，这样c s s样式就没有了，我们可以通过require的方法引入，将样式内联，（麻烦），也可以通过在html中添加占位符，然后通过replace的方法将其置换。需要的数据也是同样的方法去做，可以通过axios或者说是fetch将数据请求完了，也使用占位符插入script标签，将其挂载在window上
4. 统计信息
   1. stats
