const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }
  root() {
    return this.rootTree;
  }

  add(data) {
    this.rootTree = addNode(this.rootTree, data);
    function addNode(node, value) { 
      if(!node) return new Node(value);
      if(node.data === data) return node;
      if(value < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      return node;
    } 
  }

  has(data) {
    return searchNode(this.rootTree, data);
    function searchNode(node, value) {
      if(!node) return false;
      if(node.data === value) return true;
      return value < node.data ? searchNode(node.left, value) : searchNode(node.right, value);
    }
  }

  find(data) {
    return searchNode(this.rootTree, data);
    function searchNode(node, value) {
      if(!node) return null;
      if(node.data === value) return node;
      return value < node.data ? searchNode(node.left, value) : searchNode(node.right, value);
    }
  }

  remove(data) {
    this.rootTree = deleteNode(this.rootTree, data);
    function deleteNode(node, value) {
      if(!node) return null;
      if(value < node.data) {
        node.left = deleteNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
        return node;
      } else {
        if(!node.left && !node.right) return null;
        if(!node.left) {
          node = node.right;
          return node;
        }
        if(!node.right) {
          node = node.left;
          return node;
        }
        let maxNodeLeft = node.left;
        while(maxNodeLeft.right) {
          maxNodeLeft = maxNodeLeft.right;
        }
        node.data = maxNodeLeft.data;
        node.left = deleteNode(node.left, maxNodeLeft.data);
        return node;
      }
    }
  }

  min() {
    if(!this.rootTree) {
      return null;
    }
    let node = this.rootTree;
    while(node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if(!this.rootTree) {
      return null;
    }
    let node = this.rootTree;
    while(node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};