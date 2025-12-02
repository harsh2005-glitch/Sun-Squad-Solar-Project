import React, { useState, useEffect, useMemo } from 'react';
import adminService from '../../services/adminService';
import UserProfileModal from './UserProfileModal'; // Import the new modal component
import { Table, Card, Form, InputGroup, Button, Badge, Alert, Spinner ,NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';


const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const navigate = useNavigate();
  
  // State for the modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    // We don't need to set loading here, only on initial load
    try {
      const response = await adminService.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return users;
    }
    return users.filter(user => {
      const query = searchQuery.toLowerCase();
      const nameMatch = user.name.toLowerCase().includes(query);
      const idMatch = user.associateId && user.associateId.toLowerCase().includes(query);
      return nameMatch || idMatch;
    });
  }, [users, searchQuery]);

  const handleStatusChange = async (userId, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} this user?`)) {
        return;
    }
    
    try {
        const response = await adminService.updateUserStatus(userId, newStatus);
        setUpdateMessage(response.data.message);
        fetchUsers(); // Refresh the user list
    } catch (err) {
        setUpdateMessage(err.response?.data?.message || 'Update failed.');
    }

    setTimeout(() => setUpdateMessage(''), 3000);
  };

  const handleViewProfile = async (userId) => {
    try {
        const response = await adminService.getUserById(userId);
        setSelectedUser(response.data);
        setShowModal(true);
    } catch (error) {
        console.error("Failed to fetch user details", error);
        setError("Could not fetch user's full profile.");
    }
  };

  const handleImpersonate = async (userId) => {
      if (!window.confirm("Are you sure you want to log in as this user?")) return;
      
      try {
          // 1. Get the current admin's user object
          const adminUser = JSON.parse(localStorage.getItem('user'));
          
          // 2. Call the API to get the new associate's token
          const response = await adminService.impersonateUser(userId);
          const associateUser = response.data;
          
          // 3. Store the original admin's data in a separate item
          localStorage.setItem('impersonator', JSON.stringify(adminUser));
          
          // 4. Overwrite the current user with the associate's data
          localStorage.setItem('user', JSON.stringify(associateUser));
          
          // 5. Navigate to the associate's dashboard
          navigate('/app/dashboard');

      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to login as user.");
      }
  };

  const handleResetPassword = async (userId) => {
    if (!window.confirm("Are you sure? This will reset the user's password to their phone number.")) return;
    
    try {
        const response = await adminService.resetUserPassword(userId);
        toast.success(response.data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("CRITICAL WARNING: Are you sure you want to DELETE this user? This action CANNOT be undone. All transactions, deposits, and commissions related to this user will be permanently removed.")) return;
    
    try {
        const response = await adminService.deleteUser(userId);
        toast.success(response.data.message);
        fetchUsers(); // Refresh list
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" />
            <span className="ms-2">Loading Users...</span>
        </div>
    );
  }

  return (
    <>
      <h1 className="mb-4">Manage Users</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {updateMessage && <Alert variant="info">{updateMessage}</Alert>}
      <Card className="shadow-sm">
        <Card.Header>
          <Form>
            <InputGroup>
              <InputGroup.Text><i className="fa-solid fa-search"></i></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name or Associate ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Associate ID</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>
                    {user.name}
                    <small className="d-block text-muted">{user.email}</small>
                    {user.passwordResetRequested && (
                        <Badge bg="warning" text="dark" className="mt-1">
                            <i className="fa-solid fa-key me-1"></i> Reset Requested
                        </Badge>
                    )}
                  </td>
                  <td>{user.associateId || 'N/A'}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Badge bg={user.isActive ? 'success' : 'danger'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>
                    {user.isActive ? (
                      <Button variant="warning" size="sm" onClick={() => handleStatusChange(user._id, false)}>
                        Deactivate
                      </Button>
                    ) : (
                      <Button variant="success" size="sm" onClick={() => handleStatusChange(user._id, true)}>
                        Activate
                      </Button>
                    )}
                    <Button variant="info" size="sm" className="ms-2" onClick={() => handleViewProfile(user._id)}>
                        View
                    </Button>
                     {/* --- NEW: Login As Button --- */}
                {/* Only show for associates, not other admins */}
                {user.role === 'associate' && (
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="ms-2"
                        onClick={() => handleImpersonate(user._id)}
                    >
                        Login As
                    </Button>
                )}
                {/* --- NEW: Reset Password Button --- */}
                <Button 
                    variant="dark" 
                    size="sm" 
                    className="ms-2"
                    onClick={() => handleResetPassword(user._id)}
                    title="Reset Password to Phone Number"
                >
                    <i className="fa-solid fa-key"></i>
                </Button>
                {/* --- NEW: Delete User Button --- */}
                {user.role !== 'admin' && (
                    <Button 
                        variant="danger" 
                        size="sm" 
                        className="ms-2"
                        onClick={() => handleDeleteUser(user._id)}
                        title="Delete User"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </Button>
                )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* The Modal is rendered here but only visible when showModal is true */}
      <UserProfileModal user={selectedUser} show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default ManageUsersPage;