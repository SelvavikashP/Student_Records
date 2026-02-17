import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import TreeVisualizer from './components/TreeVisualizer';
import StatsDashboard from './components/StatsDashboard';

const API_BASE = 'http://localhost:8000';

function App() {
  const [students, setStudents] = useState([]);
  const [treeData, setTreeData] = useState(null);
  const [stats, setStats] = useState({ total_nodes: 0, height: 0, leaf_nodes: 0 });
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const [respStudents, respTree, respStats] = await Promise.all([
        axios.get(`${API_BASE}/students`),
        axios.get(`${API_BASE}/tree`),
        axios.get(`${API_BASE}/stats`)
      ]);

      setStudents(respStudents.data);
      setTreeData(respTree.data);
      setStats(respStats.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (studentData) => {
    try {
      await axios.post(`${API_BASE}/students`, studentData);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.detail || 'Error adding student');
    }
  };

  const handleUpdate = async (id, details) => {
    try {
      await axios.put(`${API_BASE}/students/${id}`, details);
      setEditingStudent(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.detail || 'Error updating student');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      try {
        await axios.delete(`${API_BASE}/students/${id}`);
        fetchData();
      } catch (err) {
        alert(err.response?.data?.detail || 'Error deleting student');
      }
    }
  };

  const filteredStudents = students.filter(s =>
    searchTerm === '' || s.student_id.toString().includes(searchTerm)
  );

  return (
    <div className="app-container">
      <header className="hero-section">
        <h1 className="hero-title">Student Records</h1>
        <p className="hero-subtitle">
          A binary search tree implementation for efficient student data management.
          Manage enrollments and visualize data structures in real-time.
        </p>
      </header>

      <aside>
        <div className="card">
          <StudentForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editingStudent={editingStudent}
            setEditingStudent={setEditingStudent}
          />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <StatsDashboard stats={stats} />
        </div>
      </aside>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="card">
          <TreeVisualizer treeData={treeData} />
        </div>
        <div className="card">
          <StudentList
            students={filteredStudents}
            onDelete={handleDelete}
            onEdit={setEditingStudent}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </main>

      <footer style={{ gridColumn: 'span 2', textAlign: 'center', marginTop: '4rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>
        <p>BST Student Information System &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;
