import React, { useState, useEffect, useMemo } from 'react';
import adminService from '../../services/adminService';
// import { Table, Card, Form, InputGroup } from 'react-bootstrap';
import { Table, Card, Form, InputGroup, Spinner } from 'react-bootstrap';
const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAllUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error("Failed to fetch users"))
      .finally(() => setLoading(false));
  }, []);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.associateId && user.associateId.includes(searchTerm))
    );
  }, [users, searchTerm]);

  return (
    <>
      <h1 className="mb-4">Manage Users</h1>
      <Card className="shadow-sm">
        <Card.Header>
          <Form>
            <InputGroup>
              <InputGroup.Text><i className="fa-solid fa-search"></i></InputGroup.Text>
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
           {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading Users...</p>
            </div>
          ) : (

          <Table striped bordered hover responsive>
            {/* ... table header is unchanged ... */}
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.associateId || 'N/A'}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
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