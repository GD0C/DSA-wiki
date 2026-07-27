;
;
var MyLinkedList = {
    head: null,
    size: 0,
    add: function (data) {
        var newNode = {
            data: data,
            next: this.head,
        };
        this.head = newNode;
        this.size++;
    },
    printList: function () {
        var current = this.head;
        while (current != null) {
            console.log(current.data);
            current = current.next;
        }
    },
};
(function () {
    console.log("Hello World");
    MyLinkedList.add(1);
    MyLinkedList.add(2);
    MyLinkedList.add(3);
    MyLinkedList.printList();
})();
