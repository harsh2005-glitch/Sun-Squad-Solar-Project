import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import '../../styles/PageLayout.css';
import { Container, Row, Col, Card, Table, Spinner, Alert, Badge } from 'react-bootstrap';


function IncomeDetailPage() {
  const [commissions, setCommissions,payoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await userService.getCommissions();
        setCommissions(response.data);
      } catch (err) {
        setError('Failed to fetch income details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCommissions();
  }, []);

  if (loading) return <div>Loading Income Details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
 const { balances, incomes, transactions } = payoutData || {};
//   return (
//     <div className="page-container">
//       <h1 className="page-header">Income Detail</h1>
//        <div className="content-box">
//         <table>
//           <thead>
//             <tr>
//             <th>S.NO</th>
//             <th>Date</th>
//             <th>Details</th>
//             <th>Commission Type</th>
//             <th>%</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {commissions.length > 0 ? (
//             commissions.map((commission, index) => (
//               <tr key={commission._id}>
//                 <td>{index + 1}</td>
//                 <td>{new Date(commission.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   From {commission.sourceUser.name} ({commission.sourceUser.associateId})
//                 </td>
//                 <td>{commission.commissionType}</td>
//                 <td>{commission.percentageEarned}%</td>
//                 <td>Rs. {commission.amount.toFixed(2)}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" style={{ textAlign: 'center' }}>No income records found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// }

// export default IncomeDetailPage;

return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Payout / Income</h1>
      
      {/* --- NEW: Summary Table --- */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header as="h5">Account Summary</Card.Header>
            <Table striped bordered hover className="mb-0">
              <tbody>
                <tr>
                  <td>Current Self Balance</td>
                  <td><strong>Rs. {balances?.currentSelfBalance.toLocaleString('en-IN') || 0}</strong></td>
                </tr>
                <tr>
                  <td>Current Team Balance</td>
                  <td><strong>Rs. {balances?.currentTeamBalance.toLocaleString('en-IN') || 0}</strong></td>
                </tr>
                <tr>
                  <td>Total Income Earned (Self + Team)</td>
                  <td><strong>Rs. {incomes?.totalIncome.toLocaleString('en-IN') || 0}</strong></td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* --- NEW: Transaction History Table --- */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header as="h5">Transaction History (Self)</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.length > 0 ? (
                    transactions.map(tx => (
                      <tr key={tx._id}>
                        <td>{new Date(tx.createdAt).toLocaleString()}</td>
                        <td>
                          <Badge bg={tx.type === 'deposit' ? 'success' : 'danger'}>{tx.type}</Badge>
                        </td>
                        <td>{tx.amount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="text-center">No transactions found.</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default IncomeDetailPage;