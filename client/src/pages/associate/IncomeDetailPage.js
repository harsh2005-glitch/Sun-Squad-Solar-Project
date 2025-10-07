import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import '../../styles/PageLayout.css';

function IncomeDetailPage() {
  const [commissions, setCommissions] = useState([]);
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

  return (
    <div className="page-container">
      <h1 className="page-header">Income Detail</h1>
       <div className="content-box">
        <table>
          <thead>
            <tr>
            <th>S.NO</th>
            <th>Date</th>
            <th>Details</th>
            <th>Commission Type</th>
            <th>%</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {commissions.length > 0 ? (
            commissions.map((commission, index) => (
              <tr key={commission._id}>
                <td>{index + 1}</td>
                <td>{new Date(commission.createdAt).toLocaleDateString()}</td>
                <td>
                  From {commission.sourceUser.name} ({commission.sourceUser.associateId})
                </td>
                <td>{commission.commissionType}</td>
                <td>{commission.percentageEarned}%</td>
                <td>Rs. {commission.amount.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No income records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default IncomeDetailPage;