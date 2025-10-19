import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { Container, Row, Col, Card, Table, Spinner, Alert, Image } from 'react-bootstrap';
import './DashboardPage.css'; // Import our new custom styles
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


// Reusable Stat Card component
const StatCard = ({ title, value, variant, icon }) => (
  <Card className={`text-white bg-${variant} mb-3 shadow`}>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title as="h5">{title}</Card.Title>
          <Card.Text as="h3">{value}</Card.Text>
        </div>
        <i className={`fa-solid ${icon} fa-2x opacity-50`}></i>
      </div>
    </Card.Body>
  </Card>
);
const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];


const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
   const [incomeChartData, setIncomeChartData] = useState([]);
  const [teamChartData, setTeamChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await userService.getDashboardData();
        // setDashboardData(response.data);
         const [dashResponse, incomeResponse, teamResponse] = await Promise.all([
            userService.getDashboardData(),
            userService.getIncomeChartData(),
            userService.getTeamContributionData()
        ]);
        setDashboardData(dashResponse.data);
        setIncomeChartData(incomeResponse.data);
        setTeamChartData(teamResponse.data);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   userService.getDashboardData()
  //     .then(response => setDashboardData(response.data))
  //     .catch(err => setError('Failed to fetch dashboard data.'))
  //     .finally(() => setLoading(false));
  // }, []);

  if (loading) {
    return <div className="text-center p-5"><Spinner animation="border" /></div>;
  }
  if (error) {
    return <Alert variant="danger" className="m-3">{error}</Alert>;
  }


  // --- NEW DATA DESTRUCTURING ---
  const { userInfo, balanceStats, incomeStats, teamStats, directSponsors } = dashboardData || {};

  // Helper to format numbers with commas
  const formatNumber = (num) => num.toLocaleString('en-IN');

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Dashboard</h1>

      {/* User Info & Main Stats Row */}
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <Card.Title as="h4">Welcome, {dashboardData.userInfo.name}</Card.Title>
                  <Card.Text className="text-muted">
                    ID: {dashboardData.userInfo.associateId} | Mobile: {dashboardData.userInfo.mobile}
                  </Card.Text>
                  <p><strong>Address:</strong> {dashboardData.userInfo.address}</p>
                  <h5 className="text-success fw-bold">Current Level: {dashboardData.userInfo.level}%</h5>
                </Col>
                {/* Placeholder for Profile Picture */}
                <Col md={4} className="text-center text-md-end mt-3 mt-md-0">
                  <Image
                    // If the user has a profile picture, use it. Otherwise, use a placeholder.
                    src={dashboardData.userInfo.profilePicture || 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'}
                    roundedCircle
                    style={{ width: '120px', height: '120px', objectFit: 'cover', border: '4px solid #eee' }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      {/* Business Stats Row */}
      <Row>
        <Col md={4} className="mb-4">
          <Card className="stat-card-main" style={{ backgroundColor: '#0d6efd' }}>
            <Card.Body>
              <div className="stat-title">Current Self Balance</div>
              <div className="stat-value">Rs. {balanceStats?.currentSelfBalance.toLocaleString('en-IN') || 0}</div>
              <i className="fa-solid fa-wallet stat-icon"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="stat-card-main" style={{ backgroundColor: '#ffc107' }}>
            <Card.Body>
              <div className="stat-title">Current Team Balance</div>
              <div className="stat-value">Rs. {balanceStats?.currentTeamBalance.toLocaleString('en-IN') || 0}</div>
              <i className="fa-solid fa-users stat-icon"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="stat-card-main" style={{ backgroundColor: '#198754' }}>
            <Card.Body>
              <div className="stat-title">Total Income</div>
              <div className="stat-value">Rs. {incomeStats?.totalIncome.toLocaleString('en-IN') || 0}</div>
              <i className="fa-solid fa-money-bill-trend-up stat-icon"></i>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Team Stats Row */}
       <Row className="mb-4">
        <Col md={6} className="mb-3">
            <Card className="stat-card-secondary border-primary shadow-sm h-100">
                <Card.Body>
                    <div className="stat-title">Total Team Members</div>
                    <div className="stat-value">{teamStats?.totalTeamMember || 0}</div>
                </Card.Body>
            </Card>
        </Col>
         <Col md={6} className="mb-3">
            <Card className="stat-card-secondary border-danger shadow-sm h-100">
                <Card.Body>
                    <div className="stat-title">Total Direct Team</div>
                    <div className="stat-value">{teamStats?.totalDirectTeam || 0}</div>
                </Card.Body>
            </Card>
        </Col>
      </Row>

      {/* --- NEW: Charts Section --- */}
      <Row className="mt-4">
        <Col lg={8} className="mb-4">
            <Card className="shadow-sm h-100">
                <Card.Body>
                    <Card.Title>Last 30 Days Income</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={incomeChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => `Rs. ${value.toLocaleString('en-IN')}`} />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
        </Col>
        <Col lg={4} className="mb-4">
            <Card className="shadow-sm h-100">
                <Card.Body>
                    <Card.Title>Team Contribution</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                         <PieChart>
                            <Pie data={teamChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {teamChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `Rs. ${value.toLocaleString('en-IN')}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
        </Col>
      </Row>


      {/* Directs Table */}
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header as="h5">My Direct Sponsors</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Associate Name</th>
                    <th>Associate ID</th>
                    <th>Date of Joining</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.directSponsors.map((direct, index) => (
                    <tr key={direct._id}>
                      <td>{index + 1}</td>
                      <td>{direct.name}</td>
                      <td>{direct.associateId}</td>
                      <td>{new Date(direct.dateOfJoining).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;