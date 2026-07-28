#include <iostream>

template <typename T> struct Node {
  T value;
  Node<T> *left;
  Node<T> *right;
};

template <typename T> struct Tree {
  Node<T> *root;
};

int main() {
  std::cout << "Hello world\n";
  return 0;
}
