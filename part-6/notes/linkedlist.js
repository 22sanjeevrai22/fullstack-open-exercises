class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtFront(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertAtLast(value) {
    const newNode = new Node(value);
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = newNode;
  }

  insertAtPosition(value, index) {
    const newNode = new Node(value);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let curr = this.head;
    let count = 0;
    while (count < index) {
      curr = curr.next;
      count++;
    }

    newNode.next = curr.next;
    curr.next = newNode;
  }

  printList() {
    let curr = this.head;
    let result = "";
    while (curr) {
      result = result + curr.value + "->";
      curr = curr.next;
    }
    return result;
  }
}

const list = new LinkedList();
list.insertAtFront(10);
list.insertAtFront(20);
list.insertAtFront(30);
list.insertAtFront(900);
list.insertAtFront(13);
list.insertAtFront(30);
console.log(list.printList() + "null"); // Output: 30 -> 20 -> 10 -> null

// function insertAtFront(head, value) {
//   const newNode = new Node(value);
//   if (!head) return newNode;
//   newNode.next = head;
//   head = newNode;
//   return newNode;
// }
