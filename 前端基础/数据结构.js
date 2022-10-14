class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

function defaultCompare(a, b) {
    return a < b ? "Compare.LESS_THAN" : "Compare.BIGGER_THAN"
}

class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null;
    }

    insert(key) {
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === "Compare.LESS_THAN") {
            if (node.left == null) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }

    removeNode(node, key) {
        if (node == null) { // {2}
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {3}
            node.left = this.removeNode(node.left, key); // {4}
            return node; // {5}
        } else if (
            this.compareFn(key, node.key) === Compare.BIGGER_THAN
        ) { // {6}
            node.right = this.removeNode(node.right, key); // {7}
            return node; // {8}
        } else {
            // 键等于node.key
            // 第一种情况
            if (node.left == null && node.right == null) { // {9}
                node = null; // {10}
                return node; // {11}
            }
            // 第二种情况
            if (node.left == null) { // {12}
                node = node.right; // {13}
                return node; // {14}
            } else if (node.right == null) { // {15}
                node = node.left; // {16}
                return node; // {17}
            }
            // 第三种情况
            const aux = this.minNode(node.right); // {18}
            node.key = aux.key; // {19}
            node.right = this.removeNode(node.right, aux.key); // {20}
            return node; // {21}
        }
    }

    getNodeHeight(node) {
        if (node == null) {
            return -1;
        }
        console.log(node)
        return Math.max(
            this.getNodeHeight(node.left), this.getNodeHeight(node.right)
        ) + 1;
    }
}


const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

//平衡树 每一次插入删除需要检验平衡因子
class AVLTree extends BinarySearchTree {

    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    //传进去一个node
    getNodeHeight(node) {
        if (node == null) {
            return -1;
        }

        return Math.max(
            this.getNodeHeight(node.left), this.getNodeHeight(node.right)
        ) + 1;
    }

    getBalanceFactor(node) {

        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }


    rotationLL(node) {
        //    肯定是哪一个节点的平衡因子改变了，然后针对他进行改变
        let temp = node.left
        node.left = temp.right
        temp.right = node
        return temp
    }

    //
    rotationRR(node) {
        let temp = node.right
        node.right = temp.left
        temp.left = node
        return temp
    }

//    左指数的右指数上
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);

        // let temp = node.right //保存右边的节点
        // let len = node.left //保存左边的节点
        // let current = len.right//左边节点的右指数

    }

    rotationRL(node) {
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }

    insert(key) {
        this.root = this.insertNode(this.root, key);
    }

    insertNode(node, key) {
        // 像在BST树中一样插入节点
        if (node == null) {
            return new Node(key);
        } else if (this.compareFn(key, node.key) === "Compare.LESS_THAN") {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === "Compare.BIGGER_THAN") {
            node.right = this.insertNode(node.right, key);
        } else {
            return node; // 重复的键
        }
        // 如果需要，将树进行平衡操作
        const balanceFactor = this.getBalanceFactor(node); // {1}
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // {2}
            if (this.compareFn(key, node.left.key) === "Compare.LESS_THAN") { // {3}
                node = this.rotationLL(node); // {4}
            } else {
                return this.rotationLR(node); // {5}
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // {6}
            if (
                this.compareFn(key, node.right.key) === "Compare.BIGGER_THAN"
            ) { // {7}
                node = this.rotationRR(node); // {8}
            } else {
                return this.rotationRL(node); // {9}
            }
        }
        return node;
    }

    removeNode(node, key) {
        node = super.removeNode(node, key); // {1}
        if (node == null) {
            return node; // null，不需要进行平衡
        }
        // 检测树是否平衡
        const balanceFactor = this.getBalanceFactor(node); // {2}
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // {3}
            const balanceFactorLeft = this.getBalanceFactor(node.left); // {4}
            if (
                balanceFactorLeft === BalanceFactor.BALANCED ||
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) { // {5}
                return this.rotationLL(node); // {6}
            }
            if (
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) { // {7}
                return this.rotationLR(node.left); // {8}
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // {9}
            const balanceFactorRight = this.getBalanceFactor(node.right); // {10}
            if (
                balanceFactorRight === BalanceFactor.BALANCED ||
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) { // {11}
                return this.rotationRR(node); // {12}
            }
            if (
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) { // {13}
                return this.rotationRL(node.right); // {14}
            }
        }
        return node;
    }


}

const AVLTreeNode = new AVLTree()
AVLTreeNode.insert(10)
AVLTreeNode.insert(9)
AVLTreeNode.insert(8)
AVLTreeNode.insert(7)
AVLTreeNode.insert(14)
AVLTreeNode.insert(15)
AVLTreeNode.insert(16)
AVLTreeNode.insert(18)
AVLTreeNode.insert(18)

console.log(AVLTreeNode)


//红黑树
//     (1) 顾名思义，每个节点不是红的就是黑的；
//
// (2) 树的根节点是黑的；
//
// (3) 所有叶节点都是黑的（用 NULL 引用表示的节点）；
//
// (4) 如果一个节点是红的，那么它的两个子节点都是黑的；
//
// (5) 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点；
//
// (6) 从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点。


//堆是一个完全二叉树 树除了叶子节点都必须有左右节点

//
function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}


class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.heap = []
    }

    getLeftIndex(index) {
        return 2 * index + 1
    }

    getRightIndex(index) {
        return 2 * index + 2
    }

    getParentIndex(index) {
        if (index == 0) {
            return undefined
        }
        return Math.floor((index - 1) / 2)
    }

    //插入值
    insert(value) {
        if (value != null) {
            this.heap.push(value)//先插入最后一个位置
            this.siftUp(this.heap.length - 1)//传进去当前插入值的索引
            return true
        }
        return false
    }

    //上移操作
    siftUp(index) {
        let parent = this.getParentIndex(index); // {1}获取插入值的父节点
        while (
            //比较当前值和父节点的大小 如果小了就要交换
        index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > "Compare.BIGGER_THAN") { // {2}
            this.swap(this.heap, parent, index); // {3}
            index = parent;
            parent = this.getParentIndex(index); // {4}
        }
    }

    swap(arr, parent, index) {
        let temp = arr[index]//保存好当前值
        arr[index] = arr[parent]
        arr[parent] = temp
    }

    //这个数组的长度
    size() {
        return this.heap.length;
    }

    //是否为空
    isEmpty() {
        return this.size() === 0;
    }

    //返回最小的值
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0]; // {1}
    }

    //移除最小的元素和最大的元素
    extract() {
        if (this.isEmpty()) {
            return undefined
        }
        if (this.size() === 1) {
            return this.heap.shift()//移除堆里第一个元素
        }
        const removedValue = this.heap.shift()
        this.heap[0] = this.heap.pop()//弹出堆里最后一个元素放到第一个元素中
        this.siftDown(0)
        return removedValue
    }

    siftDown(index) {
        //取第一个
        let element = index
        const right = this.getRightIndex(index)  //右儿子
        const left = this.getLeftIndex(index)   //左二子
        const size = this.size()                //尺寸
        //比较当前值,左边的值
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) >
            "Compare.BIGGER_THAN") {
            element = left; // {4}
        }
        //比较当前值,右边的值
        if (right < size && this.compareFn(this.heap[element], this.heap[left]) > "Compare.BIGGER_THAN") {
            element = right; // {6}
        }
        if (index !== element) { // {7}
            this.swap(this.heap, index, element); // {8}
            this.siftDown(element); // {9}
        }
    }
}

const heap = new MinHeap();

heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(1);

console.log('Heap size: ', heap.size()); // 5
console.log('Heap is empty: ', heap.isEmpty()); // false
console.log('Heap min value: ', heap.findMinimum()); // 1
class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn); // {1}
    }
}

//
for (let i = 1; i < 10; i++) {
    heap.insert(i);
}
let maxHeap = new MaxHeap()
for (let i = 1; i < 10; i++) {
    maxHeap.insert(i);
}
console.log('Extract minimum: ', heap.extract()); // 1
console.log('Extract minimum: ', maxHeap.extract()); // 1

//在数组中访问一个节点的子节点 2 * index + 1 和2 * index + 2 父节点的位置 index / 2

//堆排序

//创建一个最大堆
//然后每次取第一个，然后将堆的大小减一

function getLeftIndex(index) {
    return 2 * index + 1
}

function getRightIndex(index) {
    return 2 * index + 2
}


function swap(arr, parent, index) {
    let temp = arr[index]//保存好当前值
    arr[index] = arr[parent]
    arr[parent] = temp
}


function heapify(array, index, heapSize, compareFn) {
    //取第一个
    let element = index
    const right = getRightIndex(index)  //右儿子
    const left = getLeftIndex(index)   //左二子
    const size = heapSize             //尺寸
    //比较当前值,左边的值
    if (left < size && compareFn(array[element], array[left]) >
        "Compare.BIGGER_THAN") {
        element = left; // {4}
    }
    //比较当前值,右边的值
    if (right < size && compareFn(array[element], array[left]) > "Compare.BIGGER_THAN") {
        element = right; // {6}
    }
    if (index !== element) { // {7}
        swap(array, index, element); // {8}
        heapify(array, index, heapSize, compareFn); // {9}
    }
}


function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn); // 步骤1
    while (heapSize > 1) {
        swap(array, 0, --heapSize); // 步骤2
        heapify(array, 0, heapSize, compareFn); // 步骤3
    }
    return array;
}

// const array = [7, 6, 3, 5, 4, 1, 2];
function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
        heapify(array, i, array.length, compareFn);
    }
    return array;
}

const array = [7, 6, 3, 5, 4, 1, 2];

console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));

//申明一个函数
// const printArray = function (array) {
//     for (let i = 0; i < array.length; i++) {
//         console.log(array[i])
//     }
// }
// printArray(array)

//函数式编程
const forEach = function (array, action) {
    for (var i = 0; i < array.length; i++) {
        action(array[i]);
    }
};
const logItem = function (item) {
    console.log(item)
}
forEach(array, logItem)

// 函数式编程的主要目标是描述数据，以及要对数据应用的转换。
// 在函数式编程中，程序执行顺序的重要性很低；而在命令式编程中，步骤和顺序是非常重要的。
// 函数和数据集合是函数式编程的核心。
// 在函数式编程中，我们可以使用和滥用函数和递归；而在命令式编程中，则使用循环、赋值、条件和函数。
// 在函数式编程中，要避免副作用和可变数据，意味着我们不会修改传入函数的数据。如果需要基于输入返回一个解决方案，可以制作一个副本并返回数据修改后的副本。


// 最少硬币找零的解决方案是找到 nn 所需的最小硬币数。但要做到这一点，首先得找到对每个 x<nx<n 的解。然后，我们可以基于更小的值的解来求解。

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
        for (let i = 0; i < coins.length; i++) { // {5}
            const coin = coins[i];
            newAmount = value - coin; // {6}
            if (newAmount >= 0) {
                newMin = makeChange(newAmount); // {7}
            }
            if (
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


//最长公共子序列


// 背包问题是一个组合优化问题。
// 它可以描述如下：给定一个固定大小、能够携重量 WW 的背包，以及一组有价值和重量的物品，找出一个最佳解决方案，使得装入背包的物品总重量不超过 WW，且总价值最大。
// 下面是一个例子。

