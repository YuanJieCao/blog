// 添加元素的链表
class Node {
  constructor(element) {
    this.element = element
    this.next = undefined
  }
}
class LinkedList {
  constructor(equlasFn = defaultEquals) {
    this.count = 0
    this.head = undefined
    // 可选
    this.equlasFn = equlasFn
  }
  push(element) {
    const node = new Node(element)
    let current
    if (this.head == null) {
      this.head = node
    } else {
      current = this.head
      while (current.next != null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index == 0) {
        this.head = current.next
      } else {
        let previous = this.getElementAt(index - 1)
        current = current.next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }

  insert(element, index) {
    if (index >= 0 && index < this.count) {
      const node = new Node(element)
      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        const current = previous.next
        previous.next = node
        node.next = current
      }
      this.count++
      return true
    }
    return false
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      // 这个是当前项,循环一次就得到下一项。
      let node = this.head
      for (let m = 0; m < index; m++) {
        //
        node = node.next
      }
      return node
    }
    return undefined
  }

  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (defaultEquals(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }
}
function defaultEquals(a, b) {
  return a === b
}
class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next)
    this.prev = prev
  }
}
class DoublyLinkList extends LinkedList {
  constructor() {
    this.tail = undefined
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      let current = this.head
      if (index === 0) {
        if ((this.head = null)) {
          this.head = node
          this.tail = node
        } else {
          node.next = current
          this.head = node
          node = current.prev
        }
        else if(index==this.count){
          current.next=node
          node.prev=current
          this.tail=node
        }
      }else{
        const previous=this.getElementAt(index-1)
        current=previous.next
        node.next=current
        node.prev=previous
        previous.next=node
        current.prev=node
      }
      this.count++
      return true
    }
    return false
  }
  
}
