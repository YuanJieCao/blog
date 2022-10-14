//单例模式
const singletonMode = (function () {
    let instance
    const CreateDivClass = function () {
        if (instance) return instance;
        this.init()
        return instance = this
    }
    return CreateDivClass
})()
singletonMode.prototype.init = function () {
    return 123
    // const div = document.createElement("div")
    // document.body.appendChild(div)
}

let a = new singletonMode()
let b = new singletonMode()
console.log(a === b)

const Create = function () {
    this.init()
}
Create.prototype.init = function () {
    const div = document.createElement("div")
    document.body.appendChild(div)
}
const ProxySingleton = (function () {
    let instance

})()