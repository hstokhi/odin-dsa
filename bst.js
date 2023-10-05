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
        if (start === null) { 
            start = new Node(value); 
            return start; 
        }
        if (start.data > value) { 
            start.left = this.insert(value, start.left); 
        }
        else if (start.data < value) { 
            start.right = this.insert(value, start.right); 
        }
        return start;
    }

    delete(value, start = this.root) {
        // Check if tree is empty -- Base Case
        if (start === null ) { return start; }
        
        // If key is < node value --> recurse left subtree
        if (start.data > value) {
            start.left = this.delete(value, start.left);
            return start;
        } 
        // If key is > node value --> recurse right subtree
        else if (start.data < value) {
            start.right = this.delete(value, start.right);
            return start;
        }

        // At this point, we must be at the desired node.
        // 3 cases - it's a leaf node, has one child, has two children

        // leaf node 
        if (start.left === null && start.right === null) {
            start = null;
            return start;
        }
        // 1 child case
        if (start.left === null) {
            let pointer = start.right;
            start = null;
            return pointer;
        }
        else if (start.right === null) {
            let pointer = start.left;
            // delete start
            start = null;
            return pointer;
        }

        // 2 child case
        else {
            let parent = start;
            let nextHighest = start.right;

            // Go down tree until you reach farthest left node
            while ( nextHighest.left !== null) {
                parent = nextHighest;
                nextHighest = nextHighest.left;
            }

            if (parent !== start) {
                parent.left = nextHighest.right;
            } else { parent.right = nextHighest.right; }
            
            // Set value of node to be deleted to the next highest value
            start.data = nextHighest.data;

            // Delete nextHighest
            nextHighest = null;
            return start;
        }
    }

    find(value, start = this.root) {
        // Check if root.data = value
        if (start.data === value) { return start }

        // If value is <, search left subtree
        if (value < start.data) { return this.find(value, start.left) }
        // If value is >, search right subtree
        else { return this.find(value, start.right) }
    }

    levelOrder(f = (x) => {return x}, q = [this.root], product = []) {
        // Check if root is null
        // Check if q is empty
        if (this.root === null) { return product }
        if (q.length < 1) { return product }

        else {
            if (q[0].left !== null) {q.push(q[0].left);}
            if (q[0].right !== null) {q.push(q[0].right);}

            product.push(f(q[0].data));

            this.levelOrder(f, q.slice(1), product);
        }

        return product;
    }

    inorder(f = (x) => {return x}, start = this.root, product = []) {
        // left subtree, root, right subtree
        if (start === null) { return }

        else {
            this.inorder(f, start.left, product);
            product.push(f(start.data));
            this.inorder(f, start.right, product);
        }

        return product;
    }

    preorder(f = (x) => {return x}, start = this.root, product = []) {
        if (start === null) { return }

        else {
            product.push(f(start.data));
            this.preorder(f, start.left, product);
            this.preorder(f, start.right, product);
        }

        return product;
    }

    postorder(f = (x) => {return x}, start = this.root, product = []) {
        if (start === null) { return }

        else {
            this.postorder(f, start.left, product);
            this.postorder(f, start.right, product);
            product.push(f(start.data));
        }

        return product;
    }

    height(node, h = 0) {
        if (node === null) {return h - 1}

        else { return Math.max(this.height(node.left, h + 1), this.height(node.right, h + 1)) }

    }

    depth(node, d = 0) {
        if (node === null) { return d }

        
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

tree.buildTree(tree.array);

tree.insert(8);

prettyPrint(tree.root);

//tree.delete(6);

//console.log(tree.levelOrder((x) => {return 2*x}));
//console.log(tree.inorder());
//console.log(tree.preorder());
//console.log(tree.postorder());

console.log(tree.height(tree.find(4)));