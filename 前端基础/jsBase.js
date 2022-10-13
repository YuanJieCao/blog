//执行上下文阶段

GlobalExectionContext = {
    ThisBinding: "<Global Object>",//绑定
    //词法环境
    LexicalEnvironment: {
        //对象环境记录器
        EnvironmentRecord: {
            Type: "Object",
            a: "< uninitialized >",
            b: " < uninitialized >",
            multiply: " < func >"
        },
        outer: "<null>"
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

//函数环境 只有调用multiply才会创建上下文，然后执行上下文
FunctionExectionContext = {

    ThisBinding: "<Global Object>",
    // 词法环境
    LexicalEnvironment: {
        //声明式环境记录器
        EnvironmentRecord: {
            Type: "Declarative",
            Arguments: {0: 20, 1: 30, length: 2}
            //
        },
        outer: "<GlobalLexicalEnvironment>"
    },
    VariableEnvironment: {
        EnvironmentRecord: {
            Type: "Declarative",
            g: undefined
        },
        outer: "<GlobalLexicalEnvironment>"
    }
}


//实现一个闭包let


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
    console.log(2334)
    resolve(1)
});
// pro.then((res) => {
//     console.log(res)
// })


