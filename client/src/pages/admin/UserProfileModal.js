import React from 'react';
import { Modal, Button, Row, Col, Image, Badge, Table } from 'react-bootstrap';
import defaultAvatar from '../../assets/images/user-avatar.png';
import './UserProfileModal.css'; // We will create this new CSS file

const UserProfileModal = ({ user, show, handleClose }) => {
  if (!user) return null;

  const totalIncome = (user.selfIncome || 0) + (user.teamIncome || 0);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{user.name}'s Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Left Column: Avatar and Key Stats */}
          <Col md={4} className="text-center profile-modal-left">
            <Image src={user.profilePicture || defaultAvatar} roundedCircle fluid style={{ maxWidth: '150px' }} className="mb-3" />
            <h4>{user.name}</h4>
            <p className="text-muted">{user.associateId}</p>
            <Badge bg={user.isActive ? 'success' : 'danger'} className="mb-4">
                {user.isActive ? 'Active' : 'Inactive'}
            </Badge>
            
            <h5>Financials</h5>
            <Table borderless size="sm" className="text-start">
                <tbody>
                    <tr>
                        <td>Self Balance:</td>
                        <td className="text-end fw-bold">Rs. {user.currentSelfBalance?.toLocaleString('en-IN') || 0}</td>
                    </tr>
                    <tr>
                        <td>Team Balance:</td>
                        <td className="text-end fw-bold">Rs. {user.currentTeamBalance?.toLocaleString('en-IN') || 0}</td>
                    </tr>
                     <tr>
                        <td>Total Income:</td>
                        <td className="text-end fw-bold">Rs. {totalIncome.toLocaleString('en-IN')}</td>
                    </tr>
                </tbody>
            </Table>
          </Col>

          {/* Right Column: Detailed Information */}
          <Col md={8} className="profile-modal-right">
            <h5>Contact Information</h5>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address || 'N/A'}</p>
            
            <hr />

            <h5>Personal Details</h5>
            <p><strong>Aadhar Number:</strong> {user.aadharNumber || 'N/A'}</p>
            <p><strong>PAN Number:</strong> {user.panNumber || 'N/A'}</p>

            <hr />

            <h5>Sponsor Information</h5>
            {/* Check if the sponsor object was populated by the backend */}
            {user.sponsor ? (
                <p><strong>Connected By:</strong> {user.sponsor.name} ({user.sponsor.associateId})</p>
            ) : (
                <p><strong>Connected By:</strong> N/A (This user is a root member)</p>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileModal;