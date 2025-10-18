import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import userService from '../../services/userService';
import { Container, Spinner, Alert } from 'react-bootstrap';
import '../../styles/PageLayout.css'; // Re-use our styles
import '../../pages/admin/GenealogyPage.css'; // Re-use the tree styles
import defaultAvatar from '../../assets/images/user-avatar.png';

// We can reuse the same custom node component from the admin page
const renderForeignObjectNode = ({ nodeDatum, toggleNode, foreignObjectProps }) => (
    <g>
        <circle r={15} onClick={toggleNode}></circle>
        <foreignObject {...foreignObjectProps}>
            <div className="node-card">
                <img src={defaultAvatar} alt="User Avatar" />
                <div className="node-id">{nodeDatum.attributes?.associateId || 'N/A'}</div>
                <div className="node-name">{nodeDatum.name}</div>
                <div className="node-business">
                    {/* Check if totalBusiness exists before formatting */}
                    {nodeDatum.attributes?.totalBusiness?.toLocaleString('en-IN') || 0}
                </div>
            </div>
        </foreignObject>
    </g>
);

const GenealogyPage = () => {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTree = async () => {
            try {
                // The API now returns the data in the correct format, so no transformation is needed
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

    const nodeSize = { x: 200, y: 150 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -100, y: -60 };

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

    return (
        <Container fluid className="p-4">
            <h1 className="page-header mb-4">My Genealogy Tree</h1>
            <div className="content-box genealogy-container">
                {treeData ? (
                     <Tree
                        data={treeData}
                        orientation="vertical"
                        pathFunc="step"
                        translate={{ x: 300, y: 100 }}
                        nodeSize={nodeSize}
                        separation={{ siblings: 1.2, nonSiblings: 1.5 }}
                        renderCustomNodeElement={(rd3tProps) =>
                            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
                        }
                     />
                ) : (
                    <p>You have no downline to display.</p>
                )}
            </div>
        </Container>
    );
};

export default GenealogyPage;