//执行上下文阶段
//执行上下文就是javascript被解析和执行时所在环境的抽象概念，任何代码都是在这个环境中运行的

//全局执行上下文 不在任何函数中的代码都在全局执行环境中,在浏览器中指向的是window对象，this指向的是window对象
GlobalExectionContext = {
    ThisBinding: "<Global Object>",//在全局执行上下文中，指向全局对象，在浏览器中指向window
    //词法环境
    LexicalEnvironment: {
        //对象环境记录器
        EnvironmentRecord: {//存储变量和函数申明的实际位置
            Type: "Object",//对象式环境记录
            a: "< uninitialized >",//自定义的全局变量
            b: " < uninitialized >",
            multiply: " < func >"
        },
        outer: "<null>"//外部词法环境
    },
    //变量环境 记录var变量，let const 是在函数环境中
    VariableEnvironment: {
        EnvironmentRecord: {
            Type: "Object",
            // 在这里绑定标识符
            c: undefined,
        },
        outer: "<null>"
    }
}
//函数环境 每次调用函数会创建上下文,然后执行上下文  引擎会运行执行调用栈顶端的函数，当运行完之后会将对应执行上下文从当前的调用栈弹出，并将所有权有权交给当前调用栈的下一个执行上下文  管理执行上下文
FunctionExectionContext = {
    ThisBinding: "<Global Object>",//在函数执行上下文中,如果被一个对象调用，this指向这个对象，否则就是指向全局对象在严格模式下指向undefined
    // 词法环境
    LexicalEnvironment: {
        //声明式环境记录器
        EnvironmentRecord: {//在函数中定义的变量被储存在环境记录中
            Type: "Declarative",//申明性环境记录
            Arguments: {0: 20, 1: 30, length: 2}//函数环境还包含一个argument对象包含了索引和传递给函数的参数之间的映射，以及传递参数的长度
            //
        },
        outer: "<GlobalLexicalEnvironment>"//可以是全局环境，也可以是包含内部函数的外部函数环境
    },
    VariableEnvironment: {
        EnvironmentRecord: {
            Type: "Declarative",
            g: undefined
        },
        outer: "<GlobalLexicalEnvironment>"
    }
}

//eval函数执行上下文暂不考虑

//实现一个闭包let

// 在任意的javascript执行前，执行上下文处于创建阶段,分为三个步骤
// 确立this指向
// 词法环境（Lexical）
// 变量环境（variable）









//  toString,
//  valueOf ToPrimitive(input[, PreferredType])   input要处理的值,PreferredType -非必选 表示要转换的类型 有number String
//当不传入值的时候,除了input为日期的时候调用的是String 其余的时候都是默认有number

//如果是input为 null undefined boolean Number String 直接返回
//如果input 为对象类型


Number() //undefined转换为null boolean转化为0,1 null也是0   number 返回与之相等的值,String转换具体问题具体分析
String() //undefined 'undefined' null 'null' boolean 'boolean' Number String
parseInt('1', 10)
parseFloat('3.14abc')

//对象到字符串,对象到数字,都是通过转换对象的方法来执行的,一个是toString 一个是valueOf


JSON.stringify("123")

// 使用的时候和toString 差不多 除了undefined 返回的是undefined 不是一个字符串undefined
// 布尔值,数字,字符串的包装对象会在序列化的时候转换为相应的原始值
//在非数组对象中出现undefined,函数和Symbol都会被序列化省略,在纯数组中也是一样
// 第二个参数是一个replacer 它可以是数组和函数用来指定对象序列化过程的哪些运行,哪些排除.
//如果一个被序列化的对象有有toJSON方法


//二元操作符 +

// value1+value2
//  底层 lprim =ToPrimitive(value1)
//       rprim =ToPrimitive(value1)
//       如果是有一个是字符串就是使用ToString()包裹这两个变量拼接   否则就是调用toNumber




// ==操作符 比较两个值类型不一样的时候,就会发生类型转换

// 字符串与数字 都ToNumber()
// 布尔值和其他类型 当一方是布尔值时,对这一方进行toNumber()出来
// 对象和非对象比较  x不是字符串或者数字 y是对象 ToPrimitive(y)




//事件循环

//当事件循环进入给定的阶段时，他将执行特定于该阶段的任何操作，然后执行该队列中的回调，直到队列用尽，或者已经执行到最大的回调数


//









//闭包


//原型被定义位给其他对象提供共享属性的对象，函数的实例可以共享原型的属性和方法
//原型链是查找对象上的属性，作用域链是查找当前上下文中的变量


//instanceOf 在原型链上查找

function instanceOf(obj, fn) {
    let proto = Object.getPrototypeOf(obj)
    console.log(proto)
    if (proto) {
        if (proto == fn.prototype) {
            return true
        } else {
            return instanceOf(proto, fn)
        }
    }
    return false
}


//typeof判断一个变量的类型 instanceOf 判断在一个对象的原型链上是否包含该构造函数的原型

//new 创建一个空对象，该对象的原型指向构造函数的原型 将this执行新生成的对象，判断返回值是否为一个对象还是方法，是返回返回值，否则返会该对象











function newnew(fn, ...args) {
    let proto = Object.getPrototypeOf(fn)
    const res = Object.create(proto)
    const end = fn.call(res, ...args)
    if (typeof end === "object" || typeof end == "function") {
        return end
    } else {
        return res
    }
}


//Class


// Promise 栈的应用[]依次进来，.then 弹出执行返回promise ?

class myPromise {
    constructor(fn) {
        this.resolveTask = []
        this.rejectTask = []
        this.state = "pending"
        let resolve = (value) => {
            if (this.state !== "pending") return;
            this.state = "fulfilled";
            this.data = value;

            setTimeout(() => {
                this.resolveTask.forEach(item => console.log(item))
                this.resolveTask.forEach(cb => {
                    console.log(11111)
                    cb(value)
                    console.log(cb)
                    console.log(this.resolveTask)
                })
            }, 0)
        }
        let reject = () => {
            if (this.state !== "pending") return;
            this.state = "fulfilled";
            setTimeout(() => {
                this.rejectTask.forEach(cb => cb(value))
            })
        }
        try {
            fn(resolve, reject)
        } catch (e) {

        }
    }

    then(resolveCallback, rejectCallback) {
        // 解决链式调用的情况，继续返回Promise
        return new myPromise((resolve, reject) => {
            // 将then传入的回调函数，注册到resolveTask中
            this.resolveTask.push(() => {
                // 重点：判断resolveCallback事件的返回值
                // 假如用户注册的resolveCallback事件又返回一个Promise，将resolve和reject传进去，这样就实现控制了链式调用的顺序
                const res = resolveCallback(this.data);
                if (res instanceof Promise) {
                    res.then(resolve, reject);
                } else {
                    // 假如返回值为普通值，resolve传递出去
                    resolve(res);
                }
            });

            this.rejectTask.push(() => {
                // 同理：判断rejectCallback事件的返回值
                // 假如返回值为普通值，reject传递出去
                const res = rejectCallback(this.error);
                if (res instanceof Promise) {
                    res.then(resolve, reject);
                } else {
                    reject(res);
                }
            });
        });
    }
}


let pro = new myPromise((resolve, reject) => {
    resolve(1)
});
// pro.then((res) => {
//     console.log(res)
// })


//数据类型分两种值类型，和引用类型
//方法参数的传递也有两种类型


//方法参数是引用类型，但是用的是值传递，参数传递的过程也是实参给形参赋值的过程---------值传递就是把实参在内存栈中的数据传递给形参,
//----------而引用传递是把实参的内存栈的地址编号传递给形参.
// 引用类型则需要在内存中某个地址先保存实际的对象实例, 然后在内存的另一个地址保存指向那个对象实例的指针 在内存的栈中分配一个002，并且保存在托管堆中那个对象的内存地址

var obj = {
    value: 1
};

function foo(o) {
    o = 12;
}

//所以说所有js中所有的都是按照值传递
//引用类型:012---->013 形参:014---->保存着和013一眼的值样的值
// foo(obj);
// console.log(obj.value)


var foo = {
    value: 1,
    bar: function () {
        console.log(this.value)
    }
};

foo.bar(); // 1


Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn();
    } else {

        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

let ac = [{a: 1}, {b: 2}, {a: 1}]
const mmm = ac.map((item) => JSON.stringify(item))
console.log(Array.from(new Set(mmm)))


