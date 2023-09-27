const Node = class {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

const LinkedList = class {
    constructor (size = 0, head = null, tail = null) {
        this.size = size;
        this.head = head;
        this.tail = tail;
    }

    append(value) {
        let pointer = this.head;
        if (pointer === null) {
            this.head = new Node(value);
            this.tail = this.head;
            this.size++;
        } else {
            while (pointer.next !== null) {pointer = pointer.next}
            pointer.next = new Node(value);
            this.tail = pointer.next;
            this.size++;
        }
        this.toString()
        console.log(this.size)
    }

    prepend(value) {
        if (this.head === null) {
            this.head = new Node(value);
            this.tail = this.head;
            this.size++;
        } else {
            let pointer = new Node(value, this.head);
            this.head = pointer;
            this.size++;
        }
        this.toString()
        console.log(this.size)
    }

    at(index) {
        let pointer = this.head;
        let position = 0;
        while (position < index) {
            pointer = pointer.next;
            position++;
        }
        return pointer;
    }

    pop() {
        let pointer = this.head;
        if (pointer === null) {console.log('List is empty')}
        else {
            while (pointer.next !== this.tail) {
                pointer = pointer.next;
            }
            pointer.next = null;
            this.tail = pointer;
            this.size--;
        }
        this.toString();
        console.log(this.size)
    }

    contains(value) {
        let pointer = this.head;
        while (pointer !== null) {
            if (pointer.value === value) {return true} else {pointer = pointer.next}
        }
        console.log(false);
    }

    find(value) {
        let pointer = this.head;
        let index = 0;

        while (pointer !== null) {
            if (pointer.value === value) {return index}
            else {
                pointer = pointer.next;
                index++;
            }
        }

        return null;
    }

    toString() {
        let pointer = this.head;
        let string = "";
        while (pointer !== null) {
            string += ` ( ${pointer.value} ) -->`;
            pointer = pointer.next;
        }
        string += ' null '
        console.log(string);
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size) {console.log('Not in range'); return}
        if (index === 0) {this.prepend(value); return}
        if (index === this.size) {this.append(value); return}
        else {
            let beforeIndex = this.at(index - 1);
            let atIndex = this.at(index);

            beforeIndex.next = new Node(value, atIndex);
            this.size++;
        }
        this.toString();
        console.log(this.size)
    }

    deleteAt(index) {
        if (index < 0 || index >= this.size) {console.log('Not in range'); return}
        if (index === 0) {
           this.head = this.head.next;
           this.size--;
        }
        if (index === this.size - 1) {this.pop(); return}
        else {
            let beforeIndex = this.at(index - 1);
            let afterIndex = this.at(index + 1);
            beforeIndex.next = afterIndex;
            size--;
        }
        this.toString();
    }
}

const newList = new LinkedList();
newList.append(1);
//console.log('Head: ', newList.head);
//console.log('Tail: ', newList.tail);
newList.append(2);
//console.log('Head: ', newList.head);
//console.log('Tail: ', newList.tail);
newList.prepend(0);
//console.log('Head: ', newList.head);
//console.log('Tail: ', newList.tail);
newList.insertAt(1.5, 3);
newList.deleteAt(3)