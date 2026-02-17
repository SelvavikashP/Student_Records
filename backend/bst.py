from typing import List, Optional, Dict, Any

class Student:
    def __init__(self, student_id: int, name: str, department: str, gpa: float, phone: str, email: str):
        self.student_id = student_id
        self.name = name
        self.department = department
        self.gpa = gpa
        self.phone = phone
        self.email = email

    def to_dict(self) -> Dict[str, Any]:
        return {
            "student_id": self.student_id,
            "name": self.name,
            "department": self.department,
            "gpa": self.gpa,
            "phone": self.phone,
            "email": self.email
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Student':
        return cls(
            student_id=data["student_id"],
            name=data["name"],
            department=data["department"],
            gpa=data["gpa"],
            phone=data["phone"],
            email=data["email"]
        )

class BSTNode:
    def __init__(self, student: Student):
        self.student = student
        self.left: Optional[BSTNode] = None
        self.right: Optional[BSTNode] = None

class BinarySearchTree:
    def __init__(self):
        self.root: Optional[BSTNode] = None
        self.count = 0

    def insert(self, student: Student) -> bool:
        """Insert a student record. Returns False if ID already exists."""
        if not self.root:
            self.root = BSTNode(student)
            self.count += 1
            return True
        return self._insert_recursive(self.root, student)

    def _insert_recursive(self, node: BSTNode, student: Student) -> bool:
        if student.student_id == node.student.student_id:
            return False  # Duplicate ID
        
        if student.student_id < node.student.student_id:
            if node.left is None:
                node.left = BSTNode(student)
                self.count += 1
                return True
            return self._insert_recursive(node.left, student)
        else:
            if node.right is None:
                node.right = BSTNode(student)
                self.count += 1
                return True
            return self._insert_recursive(node.right, student)

    def search(self, student_id: int) -> Optional[Student]:
        return self._search_recursive(self.root, student_id)

    def _search_recursive(self, node: Optional[BSTNode], student_id: int) -> Optional[Student]:
        if node is None:
            return None
        if node.student.student_id == student_id:
            return node.student
        if student_id < node.student.student_id:
            return self._search_recursive(node.left, student_id)
        return self._search_recursive(node.right, student_id)

    def update(self, student_id: int, details: Dict[str, Any]) -> bool:
        student = self.search(student_id)
        if not student:
            return False
        
        if "name" in details: student.name = details["name"]
        if "department" in details: student.department = details["department"]
        if "gpa" in details: student.gpa = details["gpa"]
        if "phone" in details: student.phone = details["phone"]
        if "email" in details: student.email = details["email"]
        return True

    def delete(self, student_id: int) -> bool:
        initial_count = self.count
        self.root = self._delete_recursive(self.root, student_id)
        return self.count < initial_count

    def _delete_recursive(self, node: Optional[BSTNode], student_id: int) -> Optional[BSTNode]:
        if node is None:
            return None

        if student_id < node.student.student_id:
            node.left = self._delete_recursive(node.left, student_id)
        elif student_id > node.student.student_id:
            node.right = self._delete_recursive(node.right, student_id)
        else:
            # Found the node to delete
            self.count -= 1
            # Case 1 & 2: Leaf or one child
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left

            # Case 3: Two children
            # Get inorder successor (smallest in right subtree)
            successor = self._min_value_node(node.right)
            node.student = successor.student
            # Delete the successor, but decrement count again because recursive call will decrement it
            self.count += 1 
            node.right = self._delete_recursive(node.right, successor.student.student_id)

        return node

    def _min_value_node(self, node: BSTNode) -> BSTNode:
        current = node
        while current.left is not None:
            current = current.left
        return current

    def inorder(self) -> List[Student]:
        result = []
        self._inorder_recursive(self.root, result)
        return result

    def _inorder_recursive(self, node: Optional[BSTNode], result: List[Student]):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.student)
            self._inorder_recursive(node.right, result)

    def get_height(self) -> int:
        return self._get_height_recursive(self.root)

    def _get_height_recursive(self, node: Optional[BSTNode]) -> int:
        if node is None:
            return -1
        return 1 + max(self._get_height_recursive(node.left), self._get_height_recursive(node.right))

    def get_leaf_count(self) -> int:
        return self._get_leaf_count_recursive(self.root)

    def _get_leaf_count_recursive(self, node: Optional[BSTNode]) -> int:
        if node is None:
            return 0
        if node.left is None and node.right is None:
            return 1
        return self._get_leaf_count_recursive(node.left) + self._get_leaf_count_recursive(node.right)

    def get_stats(self) -> Dict[str, int]:
        return {
            "total_nodes": self.count,
            "height": self.get_height(),
            "leaf_nodes": self.get_leaf_count()
        }

    def to_tree_json(self) -> Optional[Dict[str, Any]]:
        return self._to_tree_json_recursive(self.root)

    def _to_tree_json_recursive(self, node: Optional[BSTNode]) -> Optional[Dict[str, Any]]:
        if node is None:
            return None
        return {
            "student": node.student.to_dict(),
            "left": self._to_tree_json_recursive(node.left),
            "right": self._to_tree_json_recursive(node.right)
        }
