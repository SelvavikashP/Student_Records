# Binary Search Tree Operations

This document explains the core BST operations implemented in the Student Record System.

## 1. Insertion
**Complexity: O(log n) average, O(n) worst case.**
- To insert a new student, we compare the new student ID with the current node's ID.
- If the new ID is smaller, we move to the left child.
- If the new ID is larger, we move to the right child.
- If we find an empty spot (null), we insert the new node there.
- Handle duplicates: Our implementation rejects duplicate IDs to ensure data integrity.

## 2. Searching
**Complexity: O(log n) average, O(n) worst case.**
- Similar to insertion, we compare the target ID with the current node's ID.
- If it matches, we return the student.
- If it's smaller, we search the left subtree.
- If it's larger, we search the right subtree.

## 3. Deletion
**Complexity: O(log n) average, O(n) worst case.**
Deletion is the most complex operation and handles three cases:
1. **Node is a leaf**: Simply remove the node.
2. **Node has one child**: Replace the node with its child.
3. **Node has two children**:
    - Find the **Inorder Successor** (the smallest value in the right subtree).
    - Replace the node's data with the successor's data.
    - Delete the inorder successor from the right subtree.

## 4. Inorder Traversal
**Complexity: O(n)**
- Recursive steps: `Traverse Left -> Visit Node -> Traverse Right`.
- This operation retrieves all student records in **ascending order** of their IDs.
- Used in the frontend to display the student directory table.

## 5. Height & Stats
- **Height**: The max depth from the root to any leaf. Calculated recursively: `1 + max(left_height, right_height)`.
- **Total Nodes**: Maintained via a counter that increments on insert and decrements on delete.
- **Leaf Nodes**: Counted by checking nodes which have no left or right children.
