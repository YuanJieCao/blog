function fun() {
    let l1 = [9, 9, 9, 9, 9, 9, 9]
    let l2 = [9, 9, 9, 9]
    console.log(Number(Array.from(l1).reverse().join(",").replace(/,/g, "")))
    let n = Number(Array.from(l1).reverse().join(",").replace(/,/g, "")) + Number(Array.from(l2).reverse().join(",").replace(/,/g, ""))
    console.log(n)
    let arry = n.toString().split("").reverse().map((item) => {
        return Number(item)
    })
    console.log(arry)
}

fun()



let m =01111011111101



let c ="123"
console.log(c-"0")