import React, { useState, useEffect, useCallback } from 'react';
import Tree from 'react-d3-tree';
import adminService from '../../services/adminService';
import { Spinner, Alert, Card, Badge } from 'react-bootstrap';
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
                totalBusiness: (user.currentSelfBalance || 0) + (user.currentTeamBalance || 0),
                status: user.status || 'active', // Assuming status field exists
                rank: user.rank || 'Member'
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
        isRoot: true
    };
};

const renderForeignObjectNode = ({ nodeDatum, toggleNode, foreignObjectProps }) => {
    // Check if it's our dummy root node
    if (nodeDatum.isRoot) {
        return (
            <g>
                <circle r={15} onClick={toggleNode} fill="#0d6efd" stroke="#fff" strokeWidth="3"></circle>
                <foreignObject {...foreignObjectProps} x="-75" y="-40" width="150" height="80">
                    <div className="node-card bg-primary text-white border-0 shadow">
                        <div className="fw-bold">{nodeDatum.name}</div>
                        <div className="small opacity-75">Root Node</div>
                    </div>
                </foreignObject>
            </g>
        );
    }

    // Render the full user card
    return (
        <g>
            <circle r={15} onClick={toggleNode} fill={nodeDatum.children && nodeDatum.children.length > 0 ? "#198754" : "#6c757d"} stroke="#fff" strokeWidth="2"></circle>
            <foreignObject {...foreignObjectProps}>
                <div className="node-card">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                        <img src={defaultAvatar} alt="User" className="rounded-circle border" width="40" height="40" />
                    </div>
                    <div className="node-header text-truncate" title={nodeDatum.name}>{nodeDatum.name}</div>
                    <div className="node-sub mb-1">{nodeDatum.attributes.associateId || 'N/A'}</div>
                    <div className="node-sub fw-bold text-primary">
                        ₹{nodeDatum.attributes.totalBusiness.toLocaleString('en-IN')}
                    </div>
                    <div className={`node-badge ${nodeDatum.attributes.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                        {nodeDatum.attributes.status.toUpperCase()}
                    </div>
                </div>
            </foreignObject>
        </g>
    );
};

const GenealogyPage = () => {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

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

    // Center the tree on load
    const treeContainerRef = useCallback(containerElem => {
        if (containerElem !== null) {
            const { width, height } = containerElem.getBoundingClientRect();
            setTranslate({ x: width / 2, y: 100 });
        }
    }, []);

    const nodeSize = { x: 220, y: 200 };
    const foreignObjectProps = { width: 180, height: 180, x: -90, y: -10 };

    if (loading) return <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <h1 className="mb-4 fw-bold text-primary">Genealogy Tree</h1>
            <Card className="shadow-sm border-0">
                <Card.Body className="p-0">
                    <div className="genealogy-container" ref={treeContainerRef}>
                        {treeData ? (
                            <Tree
                                data={treeData}
                                orientation="vertical"
                                pathFunc="step"
                                translate={translate}
                                nodeSize={nodeSize}
                                separation={{ siblings: 1.2, nonSiblings: 1.5 }}
                                renderCustomNodeElement={(rd3tProps) =>
                                    renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
                                }
                                enableLegacyTransitions={true}
                                transitionDuration={800}
                            />
                        ) : (
                            <div className="text-center p-5 text-muted">
                                <i className="fa-solid fa-sitemap fa-3x mb-3"></i>
                                <p>No user data available to build the tree.</p>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default GenealogyPage;