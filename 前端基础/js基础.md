# js基础
### 数据类型
- 由原始值和对象组成,原始值在底层是不能修改的
- 基本数据类型：`number、string、boolean、null、undefined、bigint、symbol`
- 字符串类型是不可变的，操作了他肯定是返回了一个新的字符串
- 引用数据类型：Object,function,
### 类型转换
- 原始值转布尔值
  ''、false、+0、-0、undefined、null、NAN
- 原始值转数字
  调用toNumber()、undefined->NaN,null->0,数字->数字,false->0,true->1,string->(如果是数字->数字,如果是不是数字->NaN)
- 原始值转字符
  底层调用toString(),boolean->'boolean',number->'number',undefined->'undefined',string->string,null->'null'
- 对象转字符串和数字
  都是通过调用被转换对象的方法来完成，有两种valueOf
  - toString
     其实是调用Object.prototype.toString
     数组的toString、将每个元素转为字符串，然后使用逗号隔开
     函数的toString，直接返回源代码
     日期的toString 直接返回一个日期和事件的字符串
     正则的toString 返回正则直接量的表达式
  - ValueOf
    返回对象本身，如果是一个日期格式则返回1970年往后的时间戳毫秒数
  ToPrimitive(input[, PreferredType])
    如果是基本类型直接返回,PreferredType默认是number,除了日期PreferredType是string,
    是number的情况下是先调用valueOf，如果返回的是一个原始值，则将他返回，否则再调用toString,如果返回一个原始值，则将其返回，否则typeError类型错误
    是number的情况下是先调用toString，如果返回的是一个原始值，则将他返回，否则再调用valueOf,如果返回一个原始值，则将其返回，否则typeError类型错误
  - JSON.Stringify
    如果是boolean，数字，字符串的包装对象,则会将他们置为原始值
    如果是数组中包含undefined和函数,symbol,则会变成null,对象中的则是置空.
    第三个参数replacer
    如果对象内置toJson方法则会替代
  - 一元操作符+
    - 内部调用toNumber
  - 二元操作符+  
    - 内部调用ToPrimitive(input[,PreferedType]),只要由一个是字符串就是按照字符串相加，否则就是按照toNumber()相加
    
### 内存的清理
- 栈内存
  1. 私有作用域
     - 在代码块中的内容运行完，就会主动释放销毁
     - 当前私有作用域中的部分内存被以外的内容占用了，那么他就不会销毁。最直接的体现是里面的私有变量也不能销毁。（例如闭包）
     - 操作dom的绑定的方法不会主动销毁（准确来说是设计者故意这么设计来实现这样不会解绑的效果）
     - 当前私有作用域中没有被占用，但还需要执行一次，当前私有作用域不会立即销毁，会执行完等待浏览器来垃圾回收。
  2. 全局作用域
     在浏览器关闭的时候才会释放
- 堆内存
  1. 可以手动设置null，取消指针。
  2. 等待浏览器自动垃圾回收
### 面向对象
1. 函数对象`Function`
   - 作为一个普通函数，执行的时候形成自己的私有作用域，形参赋值，预解释，代码执行，然后栈和堆的释放等
   - 作为一个类，他有自己的实例。然后有自己的prototype的属性,指向自己的原型,有着自己的constructor指向自己
   - 作为一个普通的对象，他有自己的私有属性，他有__proto__执行function的propotype
1. 对象
   1. 工厂模式
   2. 构造函数模式
   3. 组合模式
1. 函数的执行，形成私有的作用域，形参赋值，预解释，代码执行，然后堆和栈的释放。
   - 每一个对象都有一个prototype的属性，属性里有一个constructor属性指向.   --prototype指向原型object。object有__proto__指向null
   - new 一个是实例对象，constructor指向自身。自身又有prototype属性，属性里又有constructor属性，无限循环。prototype
### 数组中常用的方法
1. sort、slice .join pop,map,foreach,indexof
```text
140.82.114.3 github.com
140.82.114.10 codeload.github.com
```
### 两种
1. 全部打包，需要什么那些就引用哪些，（这样就有问题，有同名的class类打包在一了一起）解决这个问题，就需要将不同的css打包，并且引用不同
2. 将不要的css代码tree shaking掉，（不同的在于全局修改的element UI 样式）
3. 有两种common的，一种是定义class类的不同来控制变量，另外一种是直接覆盖elemet ui的颜色
