type Node<T> = {
  data: T;
  next: Node<T> | null;
  printNode: (node: Node<number>) => {
  console.log(node.data);
}
};

(() => {

});

