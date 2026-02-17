import React, { useState, useEffect } from 'react';
import { UserPlus, Save, X } from 'lucide-react';

const StudentForm = ({ onAdd, onUpdate, editingStudent, setEditingStudent }) => {
    const [formData, setFormData] = useState({
        student_id: '',
        name: '',
        department: '',
        gpa: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (editingStudent) {
            setFormData(editingStudent);
        } else {
            setFormData({
                student_id: '',
                name: '',
                department: '',
                gpa: '',
                phone: '',
                email: ''
            });
        }
    }, [editingStudent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingStudent) {
            onUpdate(formData.student_id, formData);
        } else {
            onAdd({ ...formData, student_id: parseInt(formData.student_id) });
            setFormData({
                student_id: '',
                name: '',
                department: '',
                gpa: '',
                phone: '',
                email: ''
            });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="form-container">
            <h2 className="card-title">
                {editingStudent ? <Save size={22} /> : <UserPlus size={22} />}
                {editingStudent ? 'Update Account' : 'New Admission'}
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                {editingStudent
                    ? `Editing record for ID: ${editingStudent.student_id}`
                    : 'Enter student details to add to the registry.'}
            </p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Student Identifier (ID)</label>
                    <input
                        type="number"
                        name="student_id"
                        className="form-control"
                        placeholder="e.g. 101"
                        value={formData.student_id}
                        onChange={handleChange}
                        disabled={!!editingStudent}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Full Legal Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Alice Hamilton"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department / Faculty</label>
                    <input
                        type="text"
                        name="department"
                        className="form-control"
                        placeholder="Applied Sciences"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Grade Point Average (GPA)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="gpa"
                        className="form-control"
                        placeholder="4.0"
                        value={formData.gpa}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="alice@nexus.edu"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                        {editingStudent ? 'Save Changes' : 'Enroll Student'}
                    </button>
                    {editingStudent && (
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => setEditingStudent(null)}
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
