public class Main {
  public static class Node<T> {
    T data;
    Node<T> next;
  }

  public static class MyLinkedList<T> {
    private Node<T> head;
    private int size;

    public MyLinkedList() {
      head = null;
      size = 0;
    }

    public void add(T data) {
      Node<T> newNode = new Node<>();

      newNode.data = data;
      newNode.next = head;
      head = newNode;

      size++;

    }

    void printList() {
      Node<T> current = head;
      while (current != null) {
        System.out.println(current.data);
        current = current.next;
      }
    }
  }

  public static void main(String[] args) {
    MyLinkedList<Integer> list = new MyLinkedList<>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.printList();
  }
}
