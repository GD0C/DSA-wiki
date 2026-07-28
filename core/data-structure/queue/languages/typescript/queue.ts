// double linked for queue
type Node<T> = {
  value: T;
  next: Node<T> | null;
  prev: Node<T> | null;
};

type Queue<T> = {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;

  enqueue(value: T): void;
  dequeue(): T | null;
  getSize(): number;
};

const dequeue = <T>(queue: Queue<T>): T | null => {
  if (queue.size === 0) {
    return null;
  }

  const value = queue.head.value;
  queue.head = queue.head.next;

  if (queue.head === null) {
    queue.tail = null;
  } else {
    queue.head.prev = null;
  }

  queue.size--;

  return value;
};

const enqueue = <T>(queue: Queue<T>, value: T): void => {
  const newNode: Node<T> = {
    value,
    next: null,
    prev: null,
  };

  if (queue.size === 0) {
    queue.head = newNode;
    queue.tail = newNode;
  } else {
    queue.tail.next = newNode;
    newNode.prev = queue.tail;
    queue.tail = newNode;
  }

  queue.size++;
};


const queue: Queue<number> = {
  head: null,
  tail: null,
  size: 0,

  enqueue,
  dequeue,
  getSize: () => queue.size,
};

console.log(queue.getSize());
