var dequeue = function (queue) {
    if (queue.size === 0) {
        return null;
    }
    var value = queue.head.value;
    queue.head = queue.head.next;
    if (queue.head === null) {
        queue.tail = null;
    }
    else {
        queue.head.prev = null;
    }
    queue.size--;
    return value;
};
var enqueue = function (queue, value) {
    var newNode = {
        value: value,
        next: null,
        prev: null,
    };
    if (queue.size === 0) {
        queue.head = newNode;
        queue.tail = newNode;
    }
    else {
        queue.tail.next = newNode;
        newNode.prev = queue.tail;
        queue.tail = newNode;
    }
    queue.size++;
};
var queue = {
    head: null,
    tail: null,
    size: 0,
    enqueue: enqueue,
    dequeue: dequeue,
    getSize: function () { return queue.size; },
};
console.log(queue.getSize());
