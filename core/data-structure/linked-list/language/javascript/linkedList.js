class Node {
  int value;
  Node next;
}

class LinkedList {
  Node head;
  int size;

  LinkedList() {
    head = null;
    size = 0;
  }

  add(int value) {
    Node newNode = new Node();
    newNode.value = value;
    newNode.next = head;
    head = newNode;
    size++;
  }

  printList() {
    Node current = head;
    while (current != null) {
      console.log(current.value);
      current = current.next;
    }
  }
}

(() => {
  console.log("Hello World")
  let list = new LinkedList();
  list.add(1);
  list.add(2);
  list.add(3);
  list.printList();
})()
