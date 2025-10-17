import React, { useState, useEffect, useMemo } from 'react';
import adminService from '../../services/adminService';
import {
  Table,
  Card,
  Form,
  InputGroup,
  Spinner,
  Button,
  Badge,
  Alert,
} from 'react-bootstrap';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  // Fetch all users
  const fetchUsers = async () => {
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

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.associateId && user.associateId.includes(searchTerm))
    );
  }, [users, searchTerm]);

  // Handle activate/deactivate status
  const handleStatusChange = async (userId, newStatus) => {
    if (
      !window.confirm(
        `Are you sure you want to ${
          newStatus ? 'activate' : 'deactivate'
        } this user?`
      )
    ) {
      return;
    }

    try {
      const response = await adminService.updateUserStatus(userId, newStatus);
      setUpdateMessage(response.data.message);
      await fetchUsers();
    } catch (err) {
      setUpdateMessage(err.response?.data?.message || 'Update failed.');
    }

    setTimeout(() => setUpdateMessage(''), 3000);
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading users...</p>
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <h1 className="mb-4">Manage Users</h1>

      {updateMessage && <Alert variant="info">{updateMessage}</Alert>}

      <Card className="shadow-sm">
        <Card.Header>
          <Form>
            <InputGroup>
              <InputGroup.Text>
                <i className="fa-solid fa-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name or Associate ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Card.Header>

        <Card.Body>
          {filteredUsers.length === 0 ? (
            <Alert variant="secondary">No users found.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Associate ID</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.name}{' '}
                      <small className="d-block text-muted">
                        {user.email}
                      </small>
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
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleStatusChange(user._id, false)}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleStatusChange(user._id, true)}
                        >
                          Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ManageUsersPage;
