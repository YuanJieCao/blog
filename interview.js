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

Function.prototype.myBind = function (thisArg, ...argument) {
    let args = Array.from(argument)//将参数保存为数组
    if (typeof this !== "function") {
        throw new TypeError("only one function can invoke mybind")
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
    let fToBind = this//
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


function Dog(name) {
    this.name = name
    return {test: 1}
}

let DogNew = new Dog("ming")

//new 关键字的功能 对象
function selfNew(fn, params) {
    //调用该构造函数，构造函数的this指向新生成的对象
    let instance = Object.create(fn)//使用现有的原型创造一个新的对象
    let res = fn.apply(instance, params)
    //判断构造函数是否有返回值，如果有返回值是一个对象或一个方法，则返回该值，否则返回新生成的对象

    return typeof res === "object" || typeof res === "function" ? res : instance
}


//typeof instanceof区别
//基本类型 string number null undefined Symbol boolean object
//instanceof 判断一个对象上的原型链上是否有次元修
