import React from 'react';
import { Activity } from 'lucide-react';

const StatsDashboard = ({ stats }) => {
    return (
        <div className="card">
            <h2 className="card-title">
                <Activity size={20} /> Tree Statistics
            </h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{stats.total_nodes}</div>
                    <div className="stat-label">Total Nodes</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.height}</div>
                    <div className="stat-label">Tree Height</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.leaf_nodes}</div>
                    <div className="stat-label">Leaf Nodes</div>
                </div>
            </div>
        </div>
    );
};

export default StatsDashboard;
