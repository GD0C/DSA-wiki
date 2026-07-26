#include <iostream>

template <typename T> struct Node {
  T data;
  Node<T> *next;
};

template <typename T> class LinkedList {
  Node<T> *head;
  int size;

public:
  LinkedList() {
    head = nullptr;
    size = 0;
  }

  void add(T data) {
    Node<T> *newNode = new Node<T>();
    newNode->data = data;
    newNode->next = head;
    head = newNode;
    size++;
  }
  int getSize() { return size; }

  void printList() {
    Node<T> *current = head;
    while (current != nullptr) {
      std::cout << current->data << " ";
      current = current->next;
    }
    std::cout << std::endl;
  }
};

int main() {
  LinkedList<int> list;
  list.add(1);
  list.add(2);
  list.add(3);
  std::cout << list.getSize() << std::endl;
  list.printList();
  return 0;
}
