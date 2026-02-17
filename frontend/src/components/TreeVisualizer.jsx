import React from 'react';
import { Share2 } from 'lucide-react';

const TreeVisualizer = ({ treeData }) => {
    const NODE_RADIUS = 28;
    const LEVEL_HEIGHT = 95;
    const WIDTH = 800;

    const renderNode = (node, x, y, dx) => {
        if (!node) return null;

        const leftX = x - dx;
        const rightX = x + dx;
        const nextY = y + LEVEL_HEIGHT;

        return (
            <g key={node.student.student_id} className="node-hover">
                {/* Lines to children */}
                {node.left && (
                    <line
                        x1={x} y1={y} x2={leftX} y2={nextY}
                        className="tree-link"
                    />
                )}
                {node.right && (
                    <line
                        x1={x} y1={y} x2={rightX} y2={nextY}
                        className="tree-link"
                    />
                )}

                {/* The Node */}
                <circle cx={x} cy={y} r={NODE_RADIUS} className="tree-node-circle" />
                <text x={x} y={y} dy=".35em" textAnchor="middle" className="tree-node-text">
                    {node.student.student_id}
                </text>

                {/* Recursive children */}
                {renderNode(node.left, leftX, nextY, dx / 2)}
                {renderNode(node.right, rightX, nextY, dx / 2)}
            </g>
        );
    };

    return (
        <div style={{ padding: '0.5rem' }}>
            <h2 className="card-title">
                <Share2 size={24} /> BST Architecture
            </h2>
            <div className="tree-container">
                {treeData ? (
                    <svg width="100%" height="100%" viewBox={`0 0 ${WIDTH} 520`}>
                        {renderNode(treeData, WIDTH / 2, 60, WIDTH / 4)}
                    </svg>
                ) : (
                    <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-dim)' }}>
                        <p style={{ fontSize: '1.1rem' }}>No student records yet.</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Add a student to start building the tree.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TreeVisualizer;
