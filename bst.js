import { mergeSort, removeDuplicates } from './sort.js';

const Node = class {

    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

}

const Tree = class {

    constructor(array) {
        this.array = array;
        this.root = null;
    }

    buildTree(array) {

        const start = 0;
        const end = array.length - 1;
        const mid = parseInt((start + end) / 2);

        if (start > end) { return null }
        else {
            const leaf = new Node(array[mid]);
            leaf.left = this.buildTree(array.slice(0, mid));
            leaf.right = this.buildTree(array.slice(mid + 1));
            this.root = leaf;
            return this.root;
        }
    }

    insert(value, start = this.root) {
        if (start === null) { start = new Node(value); return start }
        if (start.value > value) { this.insert(value, start.left) }
        else { this.insert(value, start.right) }
        return start;
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


const tree = new Tree([1,2,3,4,5,6,7]);
prettyPrint(tree.root)
const binaryTree = tree.buildTree(tree.array);
prettyPrint(tree.root)
tree.insert(5);
prettyPrint(tree.root)
