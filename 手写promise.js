//实现then方法
const PROMISE_PENDING="pending"
const PROMISE_FULILLED="fulilled"
const PROMISE_REFUSED="refused"
class YJpromise {
    constructor(exectuor) {
        this.status=PROMISE_PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilled=[]
        this.onReject=[]
         const resolve = (value) => {
            if(this.status!==PROMISE_PENDING)return
             this.status=PROMISE_FULILLED
             setTimeout(()=>{
                 this.value = value
                 this.onFulfilled.forEach(fn=>fn(this.value))
             })
             console.log(value,"________________")
        }
        const reject = (reason) => {
            if(this.status!==PROMISE_PENDING)return
            this.status=PROMISE_REFUSED
            setTimeout(()=>{
                this.reason=reason
                this.onReject.forEach(fn=>fn(this.reason))
                console.log(reason,"+++++++++++++++++")
            },0)
        }
        exectuor(resolve, reject)
    }
    then(onFulfilled,onReject){
        this.onFulfilled.push(onFulfilled)
        this.onReject.push(onReject)
    }
}
let promise =new YJpromise((resolve,reject)=>{
    resolve(1111)
    reject(2222)
})
//会覆盖
promise.then((res)=>{
    console.log(res,"++++++++++")
}),
promise.then((res)=> {
    console.log(res)
})