// let map = new Map()
// let key = new Array(5 * 1024 * 1024)
// map.set(key, 1)
// global.gc()
// console.log(process.memoryUsage())//heapUsed 返回内存占用的情况
// map.delete(key);
// key = null
// global.gc()
// console.log(process.memoryUsage())


//用作私有属性

// weakMap 被用于实现私有变量，不过在

// console.log(process.memoryUsage())
// {
//     rss: 19660800,驻留集大小，是给这个node进程分配了多少物理内存，
//     heapTotal: 4206592,当前申请到堆内存总大小
//     heapUsed: 2583760,当前内存的是使用量
//     external: 855884,v8 c++对象所占用的内存
//     arrayBuffers: 9898
// }

// 分代式垃圾回收机制，根据对象存活时间将内存的垃圾回收进行不同得分代，不同的分代采用不同的垃圾回收算法。

// semispace(半空间)  Scavenge


// 弱引用是指垃圾回收的过程中不会将键名对该对象的引用考虑进去，只要所引用的对象没有其他的引用


// 标记清除 Mark-Sweep(标记清除)


// var fs = require('fs');
// var path = require('path');
//
// function findLargest(dir, cb) {
//     // 读取目录下的所有文件
//     //读取文件，然后如果
//     fs.readdir(dir, function (er, files) {
//         if (er) return cb(er);
//         var counter = files.length;
//         var errored = false;
//         var stats = [];
//         console.log(counter,stats)
//
//         files.forEach(function (file, index) {
//             // 读取文件信息
//             fs.stat(path.join(dir, file), function (er, stat) {
//
//                 if (errored) return;
//
//                 if (er) {
//                     errored = true;
//                     return cb(er);
//                 }
//
//                 stats[index] = stat;
//
//                 // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
//                 if (--counter == 0) {
//
//                     var largest = stats
//                         .filter(function (stat) {
//                             return stat.isFile()
//                         })
//                         .reduce(function (prev, next) {
//                             if (prev.size > next.size) return prev
//                             return next
//                         })
//
//                     cb(null, files[stats.indexOf(largest)])
//                 }
//             })
//         })
//     })
// }
//
// findLargest('./', function(er, filename) {
//     if (er) return console.error(er)
//     console.log('largest file was:', filename)
// });


//扫码登录->登录成功-> 他监测到你这个账号没有手机注册->强制你需要登录
//直接手机登录







//迭代器 返回对象，每次调用next就会调用一个函数返回done 和value


function createIterator(items) {
    let i = 0
    return {
        next: function () {
            var done = i >= items.length
            let value = !done ? items[i++] : undefined
            return {
                done: done,
                value: value
            }
        },
    }
}
// 数组
// Map
// Set
// 类数组 argument 对象
// generator 对象
// 字符串



