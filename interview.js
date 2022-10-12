//执行上下文
// 代码运行的环境 执行上下文对象

let obj = {
    name: "打印出来的call",
    age: 18
}

let globalName = {
    name: "globalName",
    printLog() {
        console.log(this.name)
    }
}
const globalNameFn = globalName.printLog
Function.prototype.myCall = function (thisArg, ...args) {
    let fn = Symbol("thisFn")
    thisArg = thisArg || global
    thisArg.fn = this
    let reg = thisArg.fn(...args)
    delete thisArg.fn
    return reg
}


// const bindElement = globalNameFn.mybind(obj)
// bindElement()
// bindElement()

Function.prototype.myBind = function (context, ...args) {
    if (!context || context === null) {
        context = window
    }
    let fn = this
    let f = Symbol()
    const result = function (...args1) {
        if (this instanceof fn) {
            this[f] = fn
            this[f](...arg1)
        }
    }
}


var ArrayPrototypeSlice = Array.prototype.slice;
Function.prototype.browser = function (otherThis) {
    if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var baseArgs = ArrayPrototypeSlice.call(arguments, 1)//截取一位
    let baseArgsLength = baseArgs.length//
    let fToBind = this//是这个函数
    let fNOP = function () {
    }//一个空函数
    let fBound = function () {
        baseArgs.length = baseArgsLength; // reset to default base arguments
        baseArgs.push.apply(baseArgs, arguments);
        return fToBind.apply(
            fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
        );
    };

    if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
};
const bindElement = globalNameFn.browser(obj)
bindElement()


//typeof instanceof区别
//基本类型 string number null undefined Symbol boolean object
//instanceof 判断一个对象上的原型链上是否有次元修


//作用域链
// 当你查找变量的时候会在当前上下文的变量对象中查找，
// 如果没有找到就会从父级的执行上下文的变量中查找，
// 一直找到全局上下文中的变量对象，也就是全局对象，这样由多个执行上下文的变量对象构成的链表


//this的绑定方式
// 非严格模式下this指向全局对象，严格模式下指向undefined
//隐氏绑定 谁调用他指向谁
//显示绑定 bind call apply
//new 构造函数绑定，this指向新生成的对象


//原型的作用
//原型被定义为给其他对象提供共享属性的对象，函数的实例可以共享原型上的属性和方法

//原型链
//当你访问一个对象上的属性的时候，如果该对象的内部不存在这个属性，那么他会沿着__proto__属性所指向的对象上去查找
//如果原型对象上不存在，他回去其原型上的__proto__属性所指的原型对象上去查找，直到找到null,这个路线构成我们常说的原型链
//原型链是查找对象上的属性，作用域是查找当前上下文的变量

// function 独有的prototype，它包含给特定类型的所有实例提供属性和方法
//constructor 指向该对象的构造函数
//__proto__指向其构造函数的prototype


//instanceof 判断一个对象上的原型链上是否包含该构造函数的原型，

function instanceOf(obj, fn) {
    let proto = obj.__proto__//指向其构造函数的prototype
    if (proto) {
        if (propto === fn.prototype) {
            return true
        } else {
            instanceOf(propto, fn)
        }
    } else {
        return false
    }
}

function selfNew(fn, ...args) {
    const instance = Object.create(fn)
    let res = fn.apply(instance, ...args)
    return typeof res === "object" || typeof res === "function" ? res : instance
}

//多种继承

//原型链继承
//借用构造函数继承

class myPromise {
    constructor(fn) {
        this.resloveTask = []
        this.rejectTask = []
        this.status = "pending"
        let resolve = value => {
            if (this.status !== "pending") return;
            this.status = "fulfilled"
            this.data = value
            setTimeout(() => {
                this.resloveTask.forEach(cb => cb(value))
            })
        }
        let reject = err => {
            if (this.status !== "pending") return;
            this.status = "fulfilled"
            this.error = err
            setTimeout(() => {
                this.rejectTask.forEach(cb => cb(err))
            })
        }
        try {
            console.log(fn)
            fn(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(resolveCallback, rejectCallback) {
        return new myPromise((resolve, reject) => {
            this.resloveTask.push(() => {
                const res = resolveCallback(this.data)
                if (res instanceof myPromise) {
                    res.then(resolve, reject)
                } else {
                    resolve(res)
                }
            })
            this.rejectTask.push(() => {
                const res = rejectCallback(this.error)
                if (res instanceof myPromise) {
                    res.then(resolve, reject)
                } else {
                    reject(res)
                }
            })
        })
    }

}

// 测试
// 打印结果：依次打印1、2
// new myPromise((resolve, reject) => {
//     setTimeout(() => {
//         reject(1);
//     }, 500);
// })


Array.prototype.myReduce = function (fn, initialValue) {
    let pre, index
    let arr = this.slice()
    if (initialValue === undefined) {
        for (let i = 0; i < arr.length; i++) {
            if (!arr.hasOwnProperty(i)) continue;
            pre = arr[i]
            index = i + 1
            break
        }
    } else {
        pre = initialValue
        index = 0
    }
    for (let i = index; i < arr.length; i++) {
        //循环一次，调用一次这个回调函数，将，这些值都放进去，最后变化的是pre,赋值给pre
        if (!arr.hasOwnProperty(i)) continue;
        pre = fn.call(null, pre, arr[i], i, this)
    }
    return pre
}
console.log([, , , 1, 2, 3, 4].myReduce((pre, cur) => pre + cur)); // 10


//手写compose


// //数组的扁平化
Array.prototype.Myfalt = function (deep = 1) {
    let newArray = []
    if (deep < 0) {
        deep = 0
    }
    //首先数组肯定循环解决问题
    const Fn = (array, deep) => array.map((item) => {
        console.log(deep)
        //如果有deep并且有数组，就是递归调用
        if (deep) {
            if (item instanceof Array) {
                Fn(item, deep - 1)
            } else {
                newArray.push(item)
            }
        } else {
            newArray.push(item)
        }
    })
    Fn(this, deep)
    return newArray
}

// deep初始值为1
Array.prototype.myFlat = function (deep = 1) {
    let arr = this;
    // deep为0则返回，递归结束
    if (deep == 0) return arr;
    // 使用reduce作为累加器
    return arr.reduce((pre, cur) => {
        // cur为数组，继续递归，deep-1
        if (Array.isArray(cur)) {
            return [...pre, ...cur.myFlat(deep - 1)];
        } else {
            return [...pre, cur];
        }
    }, []);
};

// let deepArray = [[1, 2], [1, 3, [2, 3, [3, 4]]]]

//模仿map
Array.prototype.myMap = function (fn, content) {
    let newArray = []
    // console.log(this)
    console.log(content)
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i) == false) continue;//跳出本轮循环

        newArray[i] = fn.call(content, this[i])//content是当前的数组,fn = function(){console.log(this)}
    }
    return newArray
}


//模仿some 只要有一个满足就是跳出true

Array.prototype.mySome = function (fn, content) {
    let result
    for (let i = 0; i < this.length; i++) {
        result = fn.call(content, this[i])
        if (result) {
            return result
        }
    }
    return result
}
let testArray = [1, 2, 3, 4]
const result = testArray.mySome((item) => {
    return item > 3
})
console.log(result)


//判断所有数据的类型 toString检测类型
function getDataType(target) {
    return Object.prototype.toString.call(target)
    // return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

console.log(getDataType(undefined));
console.log(getDataType(null));
console.log(getDataType(Symbol()));


// es6 模板字符串
let name = "小明";
let age = 20;
let str1 = "我叫 ${name},我的年龄 ${age}";
//正则
let test = /\$\{(.*?)\}/g   //.匹配除了换行符的任意字符，*零次到多次 ?加在量词之后使其非贪婪
let value = "${123}"
console.log(test.exec(value))

function tempalteStr(str) {
    return str.replace(/\$\{(.*?)\}/g, function (str, k) {
        // eval(name) 替换成 小明
        // // eval(age) 替换成 20
        return eval(k);
    });
}

// console.log(tempalteStr(str1)); // 我叫小明,我的年龄20

// 函数的柯里化
function myCurry(fn) {
    if (fn.length === 1) return fn;
    // 否则就要迭代他
    const generator = (...args) => {
        if (args.length == fn.length)//终止条件
        {
            return fn(...args)
        } else {
            return (...args2) => {
                return generator(...args, ...args2)
            }
        }
    }
    return generator
}

function add(a, b, c, d) {
    return a + b + c + d
}

const Res = myCurry(add)
console.log(Res(1)(2)(3, 4))
//防抖
// 应用场景：搜索框输入文字后调用对应搜索接口
// 利用闭包，不管触发频率多高，在停止触发n秒后才会执行，如果重复触发，会清空之前的定时器，重新计时，直到最后一次n秒后执行
function debounce(fn, time, flag) {
    let timer;
    return function (...args) {
        // 在time时间段内重复执行，会清空之前的定时器，然后重新计时
        timer && clearTimeout(timer);
        if (flag && !timer) {
            // flag为true 第一次默认执行
            fn.apply(this, args);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, time);
    };
}


// 例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。


// 虚拟dom转化为真实dom
function render(node) {
    if (typeof node === "string") {
        // 创建文本节点
        return document.createTextNode(node);
    }
    // 创建对应的dom节点
    let dom = document.createElement(node.tag);
    if (node.attrs) {
        // 设置dom属性
        Object.keys(node.attrs).forEach(key => {
            dom.setAttribute(key, node.attrs[key]);
        });
    }
    // 递归生成子节点
    if (node.children) {
        node.children.forEach(item => {
            dom.appendChild(render(item));
        });
    }
    return dom;
}

// html内容
// <img src="./loading.jpg" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
// <img src="./loading.jpg" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
//当出现在视口才刷新
function observerImg() {
    // 获取所有的图片元素
    let imgList = document.getElementsByTagName("img");
    let observer = new IntersectionObserver(list => {
        // 回调的数据是一个数组
        list.forEach(item => {
            // 判断元素是否出现在视口
            if (item.intersectionRatio > 0) {
                // 设置img的src属性
                item.target.src = item.target.getAttribute("src");
                // 设置src属性后，停止监听
                observer.unobserve(item.target);
            }
        });
    });
    //监听每一个图片
    for (let i = 0; i < imgList.length; i++) {
        // 监听每个img元素
        observer.observe(imgList[i]);
    }
}


// 将真实dom转化为虚拟dom
function dom2Json(dom) {
    if (!dom.tagName) return;
    let obj = {};
    obj.tag = dom.tagName;
    obj.children = [];
    dom.childNodes.forEach(item => {
        // 去掉空的节点
        dom2Json(item) && obj.children.push(dom2Json(item));
    });
    return obj;
}


//
class LazyMan {
    constructor(name) {
        this.name = name;
        this.task = []; // 任务列表
        function fn() {
            console.log("hi" + this.name);
            this.next();
        }

        this.task.push(fn);
        // 重点：使用setTimeout宏任务，确保所有的任务都注册到task列表中
        setTimeout(() => {
            this.next();
        });
    }

    next() {
        // 取出第一个任务并执行
        let fn = this.task.shift();
        fn && fn.call(this);
    }

    sleepFirst(time) {
        function fn() {
            console.log("sleepFirst" + time);
            setTimeout(() => {
                this.next();
            }, time);
        }

        // 插入到第一个
        this.task.unshift(fn);
        // 返回this 可以链式调用
        return this;
    }

    sleep(time) {
        function fn() {
            console.log("sleep" + time);
            setTimeout(() => {
                this.next();
            }, time);
        }

        this.task.push(fn);
        return this;
    }

    eat(something) {
        function fn() {
            console.log("eat" + something);
            this.next();
        }

        this.task.push(fn);
        return this;
    }
}

// new LazyMan("王")
//     .sleepFirst(3000)
//     .eat("breakfast")
//     .sleep(3000)
//     .eat("dinner");

//  最长递增子序列
//  [3,5,7,1,2,8] 的 LIS 是 [3,5,7,8]
//  动态规划  一段序列  dp[i]


//compose 函数

//防抖节流
function MyDebounce(fn, time, flag) {
    let timer;
    return function (...args) {
        timer && clearTimeout()

        if (flag && !timer) {
            fn.apply(this, args)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, time)
    }
}

function fn(a) {
    console.log("执行", a)
}

let debounceFn = MyDebounce(fn, 3000, true)

//利用闭包，不管触发评率有多高，每隔一段时间内执行一次
function throte(fn, delay, flag) {
    let timer;
    return function (args) {
        if (flag) {
            fn()
            flag = false
        }
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay)
        }
    }
}


//模仿其他语言的sleep 阻塞主线程
function sleep(fn, delay) {
    let start = new Date().getTime()
    while (new Date().getTime() - start < delay) {
        continue;
    }
    fn()
}

function sleep2(fn, time) {
    //new promise
    new Promise(resolve => setTimeout(resolve, time)).then(() => {
        fn()
    })
}

sleep2(() => {
    console.log(2)
}, 2000)


//执行上下文
// 全局执行上下文
// 函数执行上下文
//创建执行上下文和执行阶段
// this值的决定
// 创建词法环境 环境记录器，外部环境的引用