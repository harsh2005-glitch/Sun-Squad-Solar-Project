import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { Container, Row, Col, Card, Table, Alert, Image, Badge } from 'react-bootstrap';
import './DashboardPage.css';
import '../../styles/DigitalBusinessCard.css'; // Import the new CSS
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import SolarForecastWidget from '../../components/dashboard/SolarForecastWidget'; // New Widget Import

const PIE_CHART_COLORS = ['#0d6efd', '#0dcaf0', '#ffc107', '#dc3545', '#6610f2', '#20c997'];

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [incomeChartData, setIncomeChartData] = useState([]);
  const [teamChartData, setTeamChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // Simulate slightly longer delay to show off skeleton
      // await new Promise(r => setTimeout(r, 1000)); 
      try {
        const [dashResponse, incomeResponse, teamResponse] = await Promise.all([
            userService.getDashboardData(),
            userService.getIncomeChartData(),
            userService.getTeamContributionData()
        ]);
        setDashboardData(dashResponse.data);
        setIncomeChartData(incomeResponse.data);
        setTeamChartData(teamResponse.data);
      } catch (err) {
        setError('Failed to fetch dashboard data.' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container fluid className="dashboard-container px-4 py-4">
        {/* Welcome Skeleton */}
        <div className="mb-5">
           <Row className="align-items-center">
             <Col md={8}>
               <SkeletonLoader type="title" width="60%" />
               <SkeletonLoader type="text" width="40%" />
               <div className="d-flex gap-2 mt-3">
                 <SkeletonLoader type="rect" width={100} height={30} style={{borderRadius:'20px'}} />
                 <SkeletonLoader type="rect" width={100} height={30} style={{borderRadius:'20px'}} />
               </div>
             </Col>
             <Col md={4} className="text-end">
               <SkeletonLoader type="circle" />
             </Col>
           </Row>
        </div>
        {/* Cards Skeleton */}
        <Row className="g-4 mb-5">
          {[1,2,3,4].map(i => (
            <Col md={6} lg={3} key={i}>
              <div className="skeleton-card">
                <SkeletonLoader type="text" width="50%" className="mb-3"/>
                <SkeletonLoader type="title" width="80%" />
              </div>
            </Col>
          ))}
        </Row>
        {/* Charts Skeleton */}
        <Row className="g-4 mb-5">
           <Col lg={8}>
             <div className="skeleton-card">
                <SkeletonLoader type="title" width="30%" />
                <SkeletonLoader type="rect" height={300} />
             </div>
           </Col>
           <Col lg={4}>
             <div className="skeleton-card">
                <SkeletonLoader type="title" width="50%" />
                <SkeletonLoader type="circle" width={200} height={200} style={{margin:'20px auto'}} />
             </div>
           </Col>
        </Row>
      </Container>
    );
  }
  if (error) {
    return <Alert variant="danger" className="m-4 shadow-sm">{error}</Alert>;
  }

  const { userInfo, balanceStats, incomeStats, teamStats, directSponsors, notice } = dashboardData || {};

  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          <p className="intro">{`Income: ₹${payload[0].value.toLocaleString('en-IN')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Container fluid className="dashboard-container px-4 py-4">
      
      {notice && (
        <Alert variant="info" className="shadow-sm mb-4 border-0" style={{ borderRadius: '12px' }}>
            <div className="d-flex align-items-center">
                <i className="fa-solid fa-circle-info fa-lg me-3"></i>
                <div>
                    <Alert.Heading className="h6 mb-1 fw-bold">Company Notice</Alert.Heading>
                    <p className="mb-0 small">{notice}</p>
                </div>
            </div>
        </Alert>
      )}

      {/* Welcome Banner */}
      <div className="welcome-banner mb-5">
        <Row className="align-items-center position-relative" style={{ zIndex: 2 }}>
            <Col md={8}>
                <h2 className="fw-bold mb-2">Welcome back, {userInfo.name}!</h2>
                <p className="mb-3 opacity-75">Here's what's happening with your network today.</p>
                <div className="d-flex flex-wrap gap-3">
                    <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill fw-normal">
                        <i className="fa-solid fa-id-badge me-2 text-primary"></i>ID: {userInfo.associateId}
                    </Badge>
                    <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill fw-normal">
                        <i className="fa-solid fa-phone me-2 text-success"></i>{userInfo.mobile}
                    </Badge>
                    <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill fw-bold">
                        <i className="fa-solid fa-star me-2"></i>Level: {userInfo.level}%
                    </Badge>
                </div>
            </Col>
            <Col md={4} className="text-center text-md-end mt-4 mt-md-0">
                <div className="user-avatar-container d-inline-block">
                    <Image
                        src={userInfo.profilePicture || 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'}
                        roundedCircle
                        className="user-avatar-img"
                    />
                </div>
            </Col>
        </Row>
      </div>

      {/* Key Metrics Grid */}
      <Row className="g-4 mb-5">
        <Col md={6} lg={3}>
          <Card className="stat-card-modern bg-white text-dark shadow-sm">
            <Card.Body>
              <div className="stat-title text-muted">Self Balance</div>
              <div className="stat-value text-primary">₹{balanceStats?.currentSelfBalance.toLocaleString('en-IN') || 0}</div>
              <i className="fa-solid fa-wallet stat-icon-bg text-primary"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="stat-card-modern bg-white text-dark shadow-sm">
            <Card.Body>
              <div className="stat-title text-muted">Team Balance</div>
              <div className="stat-value text-warning">₹{balanceStats?.currentTeamBalance.toLocaleString('en-IN') || 0}</div>
              <i className="fa-solid fa-users-viewfinder stat-icon-bg text-warning"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="stat-card-modern bg-white text-dark shadow-sm">
            <Card.Body>
              <div className="stat-title text-muted">Total Income</div>
              <div className="stat-value text-success">₹{incomeStats?.totalIncome.toLocaleString('en-IN') || 0}</div>
              <i className="fa-solid fa-sack-dollar stat-icon-bg text-success"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="stat-card-modern bg-primary text-white shadow-sm" style={{ background: 'linear-gradient(45deg, #0d6efd, #0a58ca)' }}>
            <Card.Body>
              <div className="stat-title text-white-50">Total Team</div>
              <div className="stat-value text-white">{teamStats?.totalTeamMember || 0}</div>
              <div className="small mt-2 opacity-75">
                <i className="fa-solid fa-user-group me-1"></i> {teamStats?.totalDirectTeam || 0} Directs
              </div>
              <i className="fa-solid fa-network-wired stat-icon-bg text-white"></i>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row className="g-4 mb-5">
        <Col lg={8}>
            <Card className="chart-card h-100">
                <Card.Body>
                    <Card.Title>Income Overview (Last 30 Days)</Card.Title>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <AreaChart data={incomeChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#0d6efd" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#adb5bd'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#adb5bd'}} />
                                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="income" stroke="#0d6efd" fillOpacity={1} fill="url(#colorIncome)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card.Body>
            </Card>
        </Col>
        
        {/* Team Contribution Pie Chart (Swapped Position) */}
        <Col lg={4}>
            <Card className="chart-card h-100">
                <Card.Body>
                    <Card.Title>Team Contribution</Card.Title>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                             <PieChart>
                                <Pie 
                                    data={teamChartData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={60}
                                    outerRadius={80} 
                                    paddingAngle={5}
                                >
                                    {teamChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card.Body>
            </Card>
        </Col>
      </Row>

      {/* Team Stats & Digital Business Card */}
      <Row className="g-4 mb-5">
        <Col lg={4}>
            {/* Solar Forecast Widget (Swapped Position) */}
            <SolarForecastWidget />
        </Col>
        
        <Col lg={4}>
            <div className="digital-biz-card h-100">
                 {/* Decorative Glows */}
                 <div className="biz-card-glow-1"></div>
                 <div className="biz-card-glow-2"></div>
                
                <div className="biz-card-content d-flex flex-column align-items-center justify-content-center">
                    <div className="text-center mb-2">
                        <div className="d-inline-block bg-warning bg-opacity-10 p-2 rounded-circle mb-2">
                            <i className="fa-solid fa-id-card text-warning fs-4"></i>
                        </div>
                        <h4 className="fw-bold mb-1 text-white">Digital Business Card</h4>
                        <p className="text-white-50 small mb-0">Scan to Join My Team</p>
                    </div>

                    <div className="qr-code-frame">
                        <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250&data=${encodeURIComponent(`${window.location.origin}/signup?ref=${userInfo?.associateId}`)}&bgcolor=ffffff`} 
                            alt="Referral QR Code" 
                        />
                         <div className="qr-logo-overlay">
                             <i className="fa-solid fa-solar-panel"></i>
                         </div>
                    </div>

                    <div className="text-center w-100 mt-2">
                        <h5 className="user-name-title">{userInfo?.name || 'Associate Name'}</h5>
                        <div className="d-inline-block bg-success bg-opacity-25 text-success border border-success border-opacity-25 px-3 py-1 rounded-pill mb-4 small fw-bold">
                            ID: {userInfo?.associateId || '---'}
                        </div>
                        
                        <a 
                            href={`https://wa.me/?text=Join%20my%20solar%20team!%20${encodeURIComponent(`${window.location.origin}/signup?ref=${userInfo?.associateId}`)}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-success text-white w-100 share-btn-animated d-flex align-items-center justify-content-center"
                        >
                            <i className="fa-brands fa-whatsapp fa-lg me-2"></i> Share on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </Col>

        {/* Quick Links / Tools Placeholder (To balance 3rd column) */}
        <Col lg={4}>
            <Card className="chart-card h-100 border-0 bg-light">
                 <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4">
                    <div className="mb-3 p-3 bg-white rounded-circle shadow-sm text-primary">
                        <i className="fa-solid fa-toolbox fa-2x"></i>
                    </div>
                    <h5 className="fw-bold mb-3">Quick Tools</h5>
                    
                    <div className="d-grid gap-3 w-100">
                        <a href="/visualizer" className="btn btn-white shadow-sm fw-bold border text-start p-3 d-flex align-items-center hover-lift">
                            <i className="fa-solid fa-house-chimney text-warning me-3 fa-lg"></i>
                            <div>
                                <div className="small text-muted text-uppercase" style={{fontSize: '0.7rem'}}>Design Tool</div>
                                <div>Roof Visualizer</div>
                            </div>
                            <i className="fa-solid fa-chevron-right ms-auto text-muted"></i>
                        </a>
                        <a href="/calculator" className="btn btn-white shadow-sm fw-bold border text-start p-3 d-flex align-items-center hover-lift">
                            <i className="fa-solid fa-calculator text-success me-3 fa-lg"></i>
                            <div>
                                <div className="small text-muted text-uppercase" style={{fontSize: '0.7rem'}}>Estimator</div>
                                <div>Cost Calculator</div>
                            </div>
                            <i className="fa-solid fa-chevron-right ms-auto text-muted"></i>
                        </a>
                    </div>
                 </Card.Body>
            </Card>
        </Col>
      </Row>

      {/* Recent Directs Full Width */}
      <Row className="g-4">
        <Col lg={12}>
          <Card className="chart-card border-0 h-100">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                    <Card.Title className="mb-0 border-0 pb-0">My Direct Sponsors</Card.Title>
                    <Badge bg="light" text="dark" className="border">Total: {directSponsors ? directSponsors.length : 0}</Badge>
                </div>
              
              <div className="table-responsive">
                <Table className="table-modern" hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Associate Name</th>
                        <th>Status</th>
                        <th>Date of Joining</th>
                    </tr>
                    </thead>
                    <tbody>
                    {directSponsors && directSponsors.length > 0 ? (
                        directSponsors.map((direct, index) => (
                            <tr key={direct._id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '35px', height: '35px'}}>
                                        <span className="fw-bold text-primary">{direct.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <div className="fw-bold text-dark">{direct.name}</div>
                                        <div className="text-muted small" style={{fontSize: '0.75rem'}}>{direct.associateId}</div>
                                    </div>
                                </div>
                            </td>
                            <td><Badge bg="success" className="rounded-pill px-3">Active</Badge></td>
                            <td className="text-muted">{new Date(direct.dateOfJoining).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-5 text-muted">
                                <i className="fa-solid fa-user-plus fa-2x mb-3 opacity-50"></i>
                                <p>No direct sponsors yet. Start building your team!</p>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;