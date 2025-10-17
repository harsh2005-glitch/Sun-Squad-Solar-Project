import React, { useState, useEffect, useCallback } from 'react';
import Tree from 'react-d3-tree';
import adminService from '../../services/adminService';
import { Spinner, Alert } from 'react-bootstrap';
import '../../styles/PageLayout.css'; // Re-use our styles
import './GenealogyPage.css';
import defaultAvatar from '../../assets/images/user-avatar.png';

// This function transforms the flat list of users from the API
// into a hierarchical structure that the Tree component needs.
const buildTreeData = (users) => {
    if (!users || users.length === 0) return null;

    const userMap = {};
    users.forEach(user => {
        userMap[user._id] = {
            name: user.name,
            attributes: { // Attributes are passed down to the node renderer
                associateId: user.associateId,
                totalBusiness: (user.selfBusiness || 0) + (user.teamBusiness || 0),
            },
            children: []
        };
    });

    const roots = [];
    users.forEach(user => {
        // If a user has a sponsor and that sponsor exists in our map,
        // add the user to the sponsor's children array.
        if (user.sponsor && userMap[user.sponsor]) {
            userMap[user.sponsor].children.push(userMap[user._id]);
        } else {
            // If a user has no sponsor, they are a "root" of a tree.
            roots.push(userMap[user._id]);
        }
    });
    
    // The component expects a single root node. If we have multiple roots,
    // we can create a "dummy" root to contain them all.
    return {
        name: "Sun Squad Solar Network",
        children: roots,
    };
};

const renderForeignObjectNode = ({ nodeDatum, toggleNode, foreignObjectProps }) => {
    // --- THIS IS THE FIX ---
    // First, check if attributes exist. If they don't, it's our dummy root node, so we show a simpler card.
    if (!nodeDatum.attributes) {
        return (
            <g>
                <circle r={15} onClick={toggleNode}></circle>
                <foreignObject {...foreignObjectProps}>
                    <div className="node-card" style={{ backgroundColor: '#e9ecef' }}>
                         {/* A simpler card for the main root */}
                        <div className="node-name" style={{ fontSize: '1rem' }}>{nodeDatum.name}</div>
                    </div>
                </foreignObject>
            </g>
        );
    }

    // If attributes DO exist, render the full user card like before.
    return (
        <g>
            <circle r={15} onClick={toggleNode}></circle>
            <foreignObject {...foreignObjectProps}>
                <div className="node-card">
                    <img src={defaultAvatar} alt="User Avatar" />
                    <div className="node-id">{nodeDatum.attributes.associateId || 'N/A'}</div>
                    <div className="node-name">{nodeDatum.name}</div>
                    <div className="node-business">
                        {nodeDatum.attributes.totalBusiness.toLocaleString('en-IN')}
                    </div>
                </div>
            </foreignObject>
        </g>
    );
};

// This is a custom component to render each node in the tree
// const renderCustomNode = ({ nodeDatum, toggleNode }) => (
//     <g>
//         <circle r={15} fill={nodeDatum.children ? "#5cb85c" : "#f0ad4e"} onClick={toggleNode} />
//         <text fill="black" x="20" dy=".35em">
//             {nodeDatum.name}
//         </text>
//         {nodeDatum.attributes?.associateId && (
//             <text fill="grey" x="20" y="20" dy=".35em">
//                 ID: {nodeDatum.attributes.associateId}
//             </text>
//         )}
//     </g>
// );


const GenealogyPage = () => {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTree = async () => {
            try {
                const response = await adminService.getGenealogyTree();
                const hierarchicalData = buildTreeData(response.data);
                setTreeData(hierarchicalData);
            } catch (err) {
                setError('Failed to fetch genealogy data.');
            } finally {
                setLoading(false);
            }
        };
        fetchTree();
    }, []);

    // use a callback to center the tree
    const treeContainerRef = useCallback(node => {
        if (node !== null) {
            // You can add logic here to programmatically center the tree if needed
        }
    }, []);

        // Define the size of the foreign object (our card)
    const nodeSize = { x: 200, y: 150 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -100, y: -60 };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="page-container">
            <h1 className="page-header">Genealogy Tree</h1>
            <div className="content-box" ref={treeContainerRef} style={{ height: '80vh', width: '100%' }}>
                {treeData ? (
                    <Tree
                        data={treeData}
                        orientation="vertical"
                        pathFunc="step"
                        translate={{ x: 300, y: 100 }} // Adjust initial centering
                        nodeSize={nodeSize}
                        separation={{ siblings: 1.2, nonSiblings: 1.5 }}
                        // --- USE THE NEW RENDERER ---
                        renderCustomNodeElement={(rd3tProps) =>
                            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
                        }
                    />
                ) : (
                    <p>No user data available to build the tree.</p>
                )}
            </div>
        </div>
    );
};

export default GenealogyPage;