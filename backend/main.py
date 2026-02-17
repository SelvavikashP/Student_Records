import json
import os
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from bst import BinarySearchTree, Student

app = FastAPI(title="Binary Search Tree Student Record System")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

STORAGE_FILE = "storage.json"
tree = BinarySearchTree()

def save_to_file():
    students = [s.to_dict() for s in tree.inorder()]
    with open(STORAGE_FILE, "w") as f:
        json.dump(students, f, indent=4)

def load_from_file():
    if os.path.exists(STORAGE_FILE):
        try:
            with open(STORAGE_FILE, "r") as f:
                data = json.load(f)
                for s_data in data:
                    tree.insert(Student.from_dict(s_data))
        except Exception as e:
            print(f"Error loading data: {e}")

# Initial load
load_from_file()

@app.get("/students", response_model=List[Dict[str, Any]])
def get_students():
    return [s.to_dict() for s in tree.inorder()]

@app.get("/students/{student_id}")
def get_student(student_id: int):
    student = tree.search(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student.to_dict()

@app.post("/students", status_code=201)
def add_student(student_data: Dict[str, Any] = Body(...)):
    try:
        student = Student.from_dict(student_data)
        if tree.insert(student):
            save_to_file()
            return {"message": "Student added successfully", "student": student.to_dict()}
        else:
            raise HTTPException(status_code=400, detail="Student ID already exists")
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing field: {e}")

@app.put("/students/{student_id}")
def update_student(student_id: int, details: Dict[str, Any] = Body(...)):
    if tree.update(student_id, details):
        save_to_file()
        return {"message": "Student updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Student not found")

@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    if tree.delete(student_id):
        save_to_file()
        return {"message": "Student deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Student not found")

@app.get("/stats")
def get_stats():
    return tree.get_stats()

@app.get("/tree")
def get_tree_structure():
    return tree.to_tree_json()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
