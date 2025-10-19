import React from 'react';
import { Outlet , useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import AppNavbar from './Navbar';
import { Alert, Button } from 'react-bootstrap';

// --- NEW: Impersonation Banner Component ---
const ImpersonationBanner = () => {
    const navigate = useNavigate();
    const impersonator = JSON.parse(localStorage.getItem('impersonator'));
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (!impersonator) return null; // If not impersonating, show nothing

    const returnToAdmin = () => {
        // Restore the admin's data
        localStorage.setItem('user', JSON.stringify(impersonator));
        // Remove the impersonator flag
        localStorage.removeItem('impersonator');
        // Go back to the admin dashboard
        navigate('/admin/dashboard');
    };

    return (
        <Alert variant="warning" className="d-flex justify-content-between align-items-center m-0 rounded-0">
            <span>You are currently viewing as <strong>{currentUser.name}</strong>.</span>
            <Button variant="outline-dark" size="sm" onClick={returnToAdmin}>
                Return to Admin View
            </Button>
        </Alert>
    );
};

function MainLayout() {
  return (
    <div>
      {/* The banner will appear at the very top */}
      <ImpersonationBanner /> 
      <AppNavbar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;