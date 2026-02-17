from bst import BinarySearchTree, Student

def test_bst():
    print("Testing Binary Search Tree...")
    tree = BinarySearchTree()
    
    # Test Insertion
    s1 = Student(10, "Alice", "CS", 3.8, "123", "alice@example.com")
    s2 = Student(5, "Bob", "IT", 3.5, "456", "bob@example.com")
    s3 = Student(15, "Charlie", "EE", 3.9, "789", "charlie@example.com")
    s4 = Student(2, "David", "ME", 3.2, "012", "david@example.com")
    
    assert tree.insert(s1) == True
    assert tree.insert(s2) == True
    assert tree.insert(s3) == True
    assert tree.insert(s4) == True
    assert tree.insert(s1) == False # Duplicate
    
    print("Insertion test passed.")
    
    # Test Search
    assert tree.search(5).name == "Bob"
    assert tree.search(100) == None
    print("Search test passed.")
    
    # Test Stats
    stats = tree.get_stats()
    assert stats["total_nodes"] == 4
    assert stats["height"] == 2
    assert stats["leaf_nodes"] == 2 # David and Charlie
    print("Stats test passed.")
    
    # Test Inorder
    students = tree.inorder()
    assert [s.student_id for s in students] == [2, 5, 10, 15]
    print("Inorder traversal test passed.")
    
    # Test Delete (Leaf)
    assert tree.delete(2) == True
    assert tree.search(2) == None
    assert tree.count == 3
    print("Delete leaf test passed.")
    
    # Test Delete (One child)
    # Insert a child for Charlie (15) -> 12
    tree.insert(Student(12, "Eve", "CS", 3.7, "321", "eve@example.com"))
    assert tree.delete(15) == True
    assert tree.search(15) == None
    assert tree.search(12) != None
    print("Delete one child test passed.")
    
    # Test Delete (Two children)
    # Tree now: 10 (root), 5 (left), 12 (right of root)
    # Add children to 5
    tree.insert(Student(3, "Frank", "CS", 3.6, "654", "frank@example.com"))
    tree.insert(Student(7, "Grace", "IT", 3.4, "987", "grace@example.com"))
    # Delete 5
    assert tree.delete(5) == True
    assert tree.search(5) == None
    assert tree.search(3) != None
    assert tree.search(7) != None
    print("Delete two children test passed.")
    
    print("All BST tests passed!")

if __name__ == "__main__":
    test_bst()
