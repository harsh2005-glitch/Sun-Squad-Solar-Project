import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import userService from '../../services/userService';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import './UserShared.css'; // Import shared modern styles
import defaultAvatar from '../../assets/images/user-avatar.png';

// Custom node component
const renderForeignObjectNode = ({ nodeDatum, toggleNode, foreignObjectProps }) => (
    <g>
        <circle r={0}></circle> {/* Hidden circle to keep connection point */}
        <foreignObject {...foreignObjectProps}>
            <div className="node-card" onClick={toggleNode}>
                <img src={defaultAvatar} alt="User Avatar" />
                <div className="node-name">{nodeDatum.name}</div>
                <div className="node-id">{nodeDatum.attributes?.associateId || 'N/A'}</div>
                <div className="node-business">
                    Biz: ₹{nodeDatum.attributes?.totalBusiness?.toLocaleString('en-IN') || 0}
                </div>
            </div>
        </foreignObject>
    </g>
);

const GenealogyPage = () => {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const containerRef = React.useRef();

    useEffect(() => {
        const fetchTree = async () => {
            try {
                const response = await userService.getGenealogyTree();
                setTreeData(response.data);
            } catch (err) {
                setError('Failed to fetch genealogy data.');
            } finally {
                setLoading(false);
            }
        };
        fetchTree();
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setTranslate({ x: width / 2, y: 100 });
        }
    }, [loading]);

    const nodeSize = { x: 220, y: 180 };
    const foreignObjectProps = { width: 200, height: 200, x: -100, y: -50 };

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

    return (
        <Container fluid className="p-4 user-page-container">
            <h1 className="page-header-title">My Genealogy Tree</h1>
            <div className="genealogy-container" ref={containerRef}>
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
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <p className="text-muted">You have no downline to display.</p>
                    </div>
                )}
            </div>
            <div className="mt-3 text-muted small">
                <i className="fas fa-info-circle me-1"></i>
                Click on a node to expand/collapse. Drag to pan. Scroll to zoom.
            </div>
        </Container>
    );
};

export default GenealogyPage;