import React from 'react';
import { Trash2, Edit, Search } from 'lucide-react';

const StudentList = ({ students, onDelete, onEdit, searchTerm, setSearchTerm }) => {
    return (
        <div className="list-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 className="card-title" style={{ marginBottom: 0 }}>
                    <Search size={22} /> Student Records
                </h2>
                <div style={{ position: 'relative', width: '280px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter by Student ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '1rem' }}
                    />
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Department</th>
                            <th>GPA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
                                    <p style={{ opacity: 0.5 }}>The registry is currently empty.</p>
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.student_id}>
                                    <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                                        {student.student_id}
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{student.name}</td>
                                    <td style={{ color: 'var(--text-dim)' }}>{student.department}</td>
                                    <td>
                                        <span style={{
                                            background: 'rgba(52, 211, 153, 0.1)',
                                            color: 'var(--success)',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '8px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {student.gpa} GPA
                                        </span>
                                    </td>
                                    <td style={{ display: 'flex', gap: '0.75rem' }}>
                                        <button
                                            className="btn btn-outline"
                                            style={{ padding: '0.6rem', minWidth: 'auto' }}
                                            onClick={() => onEdit(student)}
                                            title="Edit Record"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="btn btn-outline"
                                            style={{ padding: '0.6rem', minWidth: 'auto', color: 'var(--danger)' }}
                                            onClick={() => onDelete(student.student_id)}
                                            title="Remove Record"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
