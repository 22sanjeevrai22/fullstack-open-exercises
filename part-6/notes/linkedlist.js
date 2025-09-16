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

    if (!this.head) {
      this.head = newNode;
      return;
    }

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
    while (curr && count < index - 1) {
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

  deleteAtLast() {
    if (!this.head) return null;
    if (!this.head.next) {
      this.head = null;
      return;
    }

    let curr = this.head;
    while (curr.next && curr.next.next) {
      curr = curr.next;
    }
    curr.next = null;
  }

  deleteAtPosition(index) {
    let curr = this.head;
    let count = 0;

    if (!this.head) return null; // empty list
    if (index === 0) {
      this.head = curr.next;
      return;
    }

    while (curr && count < index - 1) {
      count++;
      curr = curr.next;
    }

    // if index is out of bounds (curr is null or no node to delete)
    if (!curr || !curr.next) return null;

    curr.next = curr.next.next;
  }
}

const list = new LinkedList();
list.insertAtFront(10);
list.insertAtFront(20);
list.insertAtFront(30);
list.insertAtFront(900);
list.insertAtFront(13);
list.insertAtFront(30);
list.deleteAtPosition(2);
list.insertAtPosition(111, 1);
list.insertAtPosition(55, 0);
list.insertAtPosition(88, 7);
list.insertAtPosition(77, 7);
// list.deleteAtLast();

const node4 = new Node(40, null);
const node3 = new Node(30, node4);
const node2 = new Node(20, node3);
const node1 = new Node(10, node2);

const list2 = new LinkedList();
list.head = node1; // attach the manual chain to LinkedList

console.log(list2.printList() + "null"); // Output: 30 -> 20 -> 10 -> null

// function insertAtFront(head, value) {
//   const newNode = new Node(value);
//   if (!head) return newNode;
//   newNode.next = head;
//   head = newNode;
//   return newNode;
// }
