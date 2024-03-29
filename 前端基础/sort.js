//排序
function defaultCompare(a, b) {

    return a < b ? "Compare.LESS_THAN" : "Compare.BIGGER_THAN"
}

function swap(array, a, b) {
    // const temp = array[a]
    // array[a] = array[b]
    // array[b] = temp
    [array[a], array[b]] = [array[b], array[a]]
}

//冒泡排序
function bubbleSort(array, compareFn = defaultCompare) {
    //最后的
    for (let i = array.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (compareFn(array[i], array[j]) === "Compare.LESS_THAN") {
                swap(array, i, j)
            }
        }
    }
    return array
}

//书上抄的
function bubbleSort_book(array, compareFn = defaultCompare) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length - 1; j++) {
            if (compareFn(array[i], array[j]) === "Compare.BIGGER_THAN") {
                swap(array, i, j)
            }
        }
    }
    return array
}


//选择排序
function selectionSort(array, compareFn = defaultCompare) {

    const {length} = array
    let indexMin
    for (let i = 0; i < length - 1; i++) {
        indexMin = i
        for (let j = i; j < length; j++) {
            if (compareFn(array[indexMin], array[j]) === "Compare.BIGGER_THAN") {
                indexMin = j
            }
        }
        if (i !== indexMin) {
            swap(array, i, indexMin)
        }
    }
    return array;
}


// 插入排序


//插入排序
function insertionSort(array, compareFn = defaultCompare) {
    const {length} = array
    let temp
    for (let i = 1; i < length; i++) {
        let j = i
        temp = array[i] //记录下当前需要排序的项
        //如果前一项比后一项大
        while (j > 0 && compareFn(array[j - 1], temp) === "Compare.BIGGER_THAN") {
            array[j] = array[j - 1]
            j--
        }
        array[j] = temp
    }
    return array
}

function guiBinSort(arr, compareFn = defaultCompare) {
    if (arr.length > 1) {
        const {length} = arr
        const middle = Math.floor(length / 2);
        let left = guiBinSort(arr.slice(0, middle), compareFn);
        let right = guiBinSort(arr.slice(middle, length), compareFn);
        //
        arr = merge(left, right, compareFn)
    }
    return arr
}


//归并排序  分而治之
function mergeSort(array, compareFn = defaultCompare) {
    //终止条件
    let i = 0
    if (array.length > 1) {
        const {length} = array;
        const middle = Math.floor(length / 2);//中间值，对于递归来说，压栈然后出栈
        const left = mergeSort(array.slice(0, middle), compareFn);
        console.log(left)
        console.log("++")
        const right = mergeSort(array.slice(middle, length), compareFn);
        console.log(right)
        console.log("__")
        array = merge(left, right, compareFn);
    }
    return array;
}

//定义两个指针，挑选两个数组中小的塞到数组中，塞左边左边指针++,不然右边指针++
function merge(left, right, compareFn) {
    let i = 0
    let j = 0
    const result = []
    //将左右两边两个数组进行比较，比较完将某一个放入到result,然后
    while (i < left.length && j < right.length) { // {7}

        result.push(
            compareFn(left[i], right[j]) === "Compare.LESS_THAN" ? left[i++] : right[j++]
        ); // {8}
    }
    //将剩下的截取放到新的数组中
    return result.concat(i < left.length ? left.slice(i) : right.slice(j)); // {9}
}


//计数排序
function countingSort(array) {
    if (array.length < 2) { // {1}
        return array;
    }
    const maxValue = findMaxValue(array); // {2}
    const counts = new Array(maxValue + 1); // {3}
    array.forEach(element => {
        if (!counts[element]) { // {4}
            counts[element] = 0;
        }
        counts[element]++; // {5}
    });

    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count > 0) { // {6}
            array[sortedIndex++] = i; // {7}
            count--; // {8}
        }
    });
    return array;
}

function findMaxValue(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

//分解原问题为多个子问题
//解决子问题在返回
//组合这些的问题

console.log("\s")

//分而治治
function binarySearchRecursive(
    array, value, low, high, compareFn = defaultCompare
) {
    if (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const element = array[mid];

        if (compareFn(element, value) === Compare.LESS_THAN) { // {1}
            return binarySearchRecursive(array, value, mid + 1, high, compareFn);
        } else if (compareFn(element, value) === Compare.BIGGER_THAN) { // {2}
            return binarySearchRecursive(array, value, low, mid - 1, compareFn);
        } else {
            return mid; // {3}
        }
    }
    return DOES_NOT_EXIST; // {4}
}

//
function binarySearch(array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort(array);
    const low = 0;
    const high = sortedArray.length - 1;

    return binarySearchRecursive(array, value, low, high, compareFn);
}

//动态规划 DP 不同于分而治之，它是将问题分解相互依赖的子问题
//定义子问题
//实现要反复执行来解决子问题的部分
//识别并求解出基线问题

function minCoinChange(coins, amount) {
    const cache = []; // {1}
    const makeChange = (value) => { // {2}
        if (!value) { // {3}
            return [];
        }
        if (cache[value]) { // {4}
            return cache[value];
        }
        let min = [];
        let newMin;
        let newAmount;
        for (let i = 0; i < coins.length; i++) { // {5} 选择
            const coin = coins[i];
            newAmount = value - coin; // {6}
            if (newAmount >= 0) {
                newMin = makeChange(newAmount); // {7}
            }
            //-1第一次下来
            if (
                //
                newAmount >= 0 && // {8}
                (newMin.length < min.length - 1 || !min.length) && // {9}
                (newMin.length || !newAmount) // {10}
            ) {
                min = [coin].concat(newMin); // {11}
                console.log('new Min ' + min + ' for ' + newAmount);
            }
        }
        return (cache[value] = min); // {12}
    };
    return makeChange(amount); // {13}
}

// console.log(minCoinChange([1, 5, 10, 25], 36));
//斐波那契数列
function action(n) {
    const memory = new Array(n)
    return fibonacci(n, memory)
}


function fibonacci(n, memory) {
    if (n == 1 || n == 2) {
        return 1
    }
    //前两项的和,
    if (memory[n] === undefined) {
        memory[n] = fibonacci(n - 1, memory) + fibonacci(n - 2, memory)//记录下求过的值
    }
    return memory[n]
}


function fibonacciFor(n) {
    if (n == 1 || n == 2) {
        return 1
    }
    let dp = new Array(n + 1)
    dp[1] = 1
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}


//空间换取时间
console.log(fibonacciFor(10))

//快速排序，对于一个数组选取元，然后左右指针，将值进行划分，然后再次将划分完的数据进行快速排序

function quickSort(array, compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn);
}

function quick(array, left, right, compareFn) {
    let index; // {1}
    if (array.length > 1) { // {2}
        index = partition(array, left, right, compareFn); // {3}
        if (left < index - 1) { // {4}
            quick(array, left, index - 1, compareFn); // {5}
        }
        if (index < right) { // {6}
            quick(array, index, right, compareFn); // {7}
        }
    }
    return array;
};


function partition(array, left, right, compareFn) {
    const pivot = array[Math.floor((right + left) / 2)]; // {8}
    let i = left; // {9}
    let j = right; // {10}
    while (i <= j) { // {11}
        while (compareFn(array[i], pivot) === "Compare.LESS_THAN") { // {12}
            i++;
        }
        while (compareFn(array[j], pivot) === "Compare.BIGGER_THAN") { // {13}
            j--;
        }
        if (i <= j) { // {14}
            swap(array, i, j); // {15}
            i++;
            j--;
        }
    }
    return i; // {16}
}

//快速排序 选取主元
function fastSort(array, compareFn = defaultCompare) {
    return fastQuick(array, 0, array.length - 1, compareFn = defaultCompare)
}

function fastQuick(array, left, right, compareFn) {
    let index
    if (right - left > 1) {

        index = fastPartition(array, left, right, compareFn)
        if (index - left > 1) {
            fastQuick(array, left, index - 1, compareFn)
        }
        if (index < right) {
            fastQuick(array, index, right, compareFn)
        }
    }
    return array
}

function fastPartition(array, left, right, compareFn) {
    const pivot = array[Math.floor((right + left) / 2)]//这个才是主元
    let i = left //处理两个数组的问题，左右指针
    let j = right
    //左右指针没有相遇就一直循环
    while (i <= j) {
        //当左边的数值比右边大时
        while (compareFn(array[i], pivot) === "Compare.LESS_THAN") {
            i++
        }
        while (compareFn(array[j], pivot) === "Compare.BIGGER_THAN") {
            j--
        }
        //除了上面的两种情况之外，其他的情况都是需要进行交换
        if (i <= j) {
            swap(array, i, j)
            i++
            j--
        }
    }
    return i
}

let money = [2, 7, 9, 3, 1]
//
// dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
function knapSack(capacity, weights, values, n) {
    const kS = [];
    for (let i = 0; i <= n; i++) { // {1}
        kS[i] = [];
    }
    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (i === 0 || w === 0) { // {2}
                kS[i][w] = 0;
            } else if (weights[i - 1] <= w) { // {3}
                const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
                const b = kS[i - 1][w];
                kS[i][w] = a > b ? a : b; // {4} max(a,b)
            } else {
                kS[i][w] = kS[i - 1][w]; // {5}
            }
        }
    }

    findValues(n, capacity, kS, weights, values); // {6} 增加的代码
    return kS[n][capacity]; // {7}
}

function findValues(n, capacity, kS, weights, values) {
    let i = n;
    let k = capacity;
    console.log('构成解的物品：');
    while (i > 0 && k > 0) {
        if (kS[i][k] !== kS[i - 1][k]) {
            console.log(`物品 ${i} 可以是解的一部分 w,v: ${weights[i - 1]}, ${values[i - 1]}`);
            i--;
            k -= kS[i - 1][k];
        } else {
            i--;
        }
    }
}

//奇偶性
const values = [3, 4, 5],
    weights = [2, 3, 4],
    capacity = 5,
    n = values.length;


//小偷一代
let moneyAll = [1, 2, 8, 7, 3]
//有n房子，0到n-1
let rob = function (nums) {
    const len = nums.length
    if (len === 0) return 0
    if (len === 1) return nums[0]
    const dp = new Array(len)//定义一个空数组
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < len; i++) {
        //
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])
    }
    return dp[len - 1]
}

console.log(rob(moneyAll))


//小偷二代
let moneyAllAll = [1, 3, 2]
//偷最后一个不能偷第一个
//
let rob2 = function (nums) {


}


//归并排序
//递归,
function newMergeSort(arr, compare = defaultCompare) {
    if (arr.length > 1) {
        let newArray = []
        const {length} = arr
        let middle = Math.floor(length / 2)
        var left = newMergeSort(arr.slice(0, middle), compare)
        // console.log(left)
        // console.log("++")
        var right = newMergeSort(arr.slice(middle, length), compare)
        // console.log(right)
        // console.log("--")

        arr = newMerge(left, right, compare, newArray);
    }
    return arr
//    有一个栈merge一
}

function newMerge(left, right, compare, newArray) {
    let len = 0
    let rig = 0

    while (len < left.length && rig < right.length) {
        if (left[len] < right[rig]) {
            newArray.push(left[len])
            len++
        } else {
            newArray.push(right[rig])
            rig++
        }
    }
    //如果在退出之前的循环，之后后面还有值
    if (len < left.length) {
        newArray.push(...left.slice(len))
    }
    if (rig < right.length) {
        newArray.push(...right.slice(rig))
    }
    //只要有一方不是0
    return newArray
}

let mergeArray = [1, 6, 5, 2, 4]
console.log(newMergeSort(mergeArray))


//快速排序
function quickSort(arr) {

    // 当list.length <= 1时，退出递归
    if (arr.length <= 1) return arr;
    // 找到中间节点
    let mid = Math.floor(arr.length / 2);
    // 以中间节点为基准点，比该节点大的值放到right数组中，否则放到left数组中
    let base = arr.splice(mid, 1)[0];
    let left = [];
    let right = [];
    arr.forEach(item => {
        if (item > base) {
            right.push(item);
        } else {
            left.push(item);
        }
    });
    return quickSort(left).concat(base, quickSort(right));
}


const tasks = [];
tasks.push(new Promise((resolve) => {
    setTimeout(() => {
        console.log(new Date, 1);
        resolve(1);  // 这里一定要 resolve，否则代码不会按预期 work
    }, 1000 * 1);   // 定时器的超时时间逐步增加
}));

async function aka() {
    const m = await tasks[0]
    console.log(m)
}

aka()