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

Promise.resolve()
    .then(function () {
        console.log("promise0");
    })
    .then(function () {
        console.log("promise5");
    });


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