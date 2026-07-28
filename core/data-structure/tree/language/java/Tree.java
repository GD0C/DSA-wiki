public class Tree {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }

  public static class Node<T> {
    T data;
    Node<T> left;
    Node<T> right;

    public Node(T data) {
      this.data = data;
    }

    public Node(T data, Node<T> left, Node<T> right) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }

  public static class BinaryTree<T> {
    private Node<T> root;

    public BinaryTree(Node<T> root) {
      this.root = root;
    }
  }
}
