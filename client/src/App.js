
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Layouts
import PublicLayout from './components/layout/PublicLayout';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';

// Import Guards
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import ScrollToTop from './components/common/ScrollToTop'; // Import ScrollToTop

// Import Public Pages
import HomePage from './pages/public/HomePage';
import NotFoundPage from './pages/public/NotFoundPage';
import ContactPage from './pages/public/ContactPage';
import GalleryPage from './pages/public/GalleryPage';
import AnnouncementsPage from './pages/public/AnnouncementsPage';
import LocationsPage from './pages/public/LocationsPage';
import AboutPage from './pages/public/AboutPage'; // Import AboutPage
import BecomePartnerPage from './pages/public/BecomePartnerPage'; // Import BecomePartnerPage
import SolarCalculatorPage from './pages/public/SolarCalculatorPage'; // Import SolarCalculatorPage

// Import Legal Pages
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import TermsServicePage from './pages/public/TermsServicePage';
import RefundPolicyPage from './pages/public/RefundPolicyPage';

// Import Blog Pages
import SolarSubsidyPage from './pages/public/blog/SolarSubsidyPage';
import GridVsOffGridPage from './pages/public/blog/GridVsOffGridPage';
import MaintenanceTipsPage from './pages/public/blog/MaintenanceTipsPage';

// Import Auth Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SetNewPasswordPage from './pages/SetNewPasswordPage';

// Import Associate Pages
import DashboardPage from './pages/associate/DashboardPage';
import MyDirectsPage from './pages/associate/MyDirectsPage';
import MyProfilePage from './pages/associate/MyProfilePage';
import IncomeDetailPage from './pages/associate/IncomeDetailPage';
import AssociateGenealogyPage from './pages/associate/GenealogyPage';
import ChangePasswordPage from './pages/associate/ChangePasswordPage';
import UploadDocumentsPage from './pages/associate/UploadDocumentsPage';


// Import Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageDepositsPage from './pages/admin/ManageDepositsPage';
import AdminGenealogyPage from './pages/admin/GenealogyPage';
import SettingsPage from './pages/admin/SettingsPage';
import ManageGalleryPage from './pages/admin/ManageGalleryPage';
import ManageAnnouncementsPage from './pages/admin/ManageAnnouncementsPage';
import ManageTeamPage from './pages/admin/ManageTeamPage';
import ManageInquiriesPage from './pages/admin/ManageInquiriesPage'; // New Import
import ManageCalculatorPage from './pages/admin/ManageCalculatorPage'; // New Import


// --- Create a temporary Dashboard Page for now ---
// const DashboardPage = () => <div><h1>Welcome to your Dashboard!</h1><p>This page is protected.</p></div>;
// const AdminDashboardPage = () => <div><h1>Admin Dashboard</h1></div>;

import RoofVisualizerPage from './pages/public/RoofVisualizerPage'; // Import the new Real Page

/* --- NEW FEATURES (Inline) --- */
const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);
  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId === '12345') {
      setStatus({ 
        stages: [ 
          { name: 'Site Survey', date: '2023-10-01', completed: true }, 
          { name: 'System Design', date: '2023-10-05', completed: true }, 
          { name: 'Permit Approval', date: 'In Progress', completed: true },
          { name: 'Installation', date: 'Pending', completed: false }
        ] 
      });
    } else { alert('Order not found. Try ID: 12345'); }
  };
  return (
    <div style={{padding: '120px 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
      <h1 style={{color: '#1e293b', marginBottom: '1rem'}}>Track Your Solar Journey</h1>
      <div style={{background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)'}}>
        <form onSubmit={handleTrack} style={{display: 'flex', gap: '10px', marginBottom: '2rem'}}>
          <input type="text" placeholder="Enter Order ID (e.g., 12345)" value={orderId} onChange={(e) => setOrderId(e.target.value)} style={{flex: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px'}} />
          <button type="submit" style={{background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer'}}>Track</button>
        </form>
        {status && <div style={{textAlign: 'left'}}>
          {status.stages.map((s, i) => (
            <div key={i} style={{padding: '15px 0', borderBottom: '1px solid #eee', color: s.completed ? '#10b981' : '#64748b'}}>
              <strong>{s.name}</strong> - {s.date} {s.completed ? '✅' : '⏳'}
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

const ShopPage = () => {
  const products = [
    { id: 1, name: 'Solar Cleaning Kit', price: '$49.99' },
    { id: 2, name: 'Smart Energy Monitor', price: '$199.99' },
    { id: 3, name: 'Backup Battery', price: '$899.00' }
  ];
  return (
    <div style={{padding: '120px 2rem', maxWidth: '1200px', margin: '0 auto'}}>
      <h1 style={{textAlign: 'center', color: '#1e293b', marginBottom: '3rem'}}>Solar Marketplace</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
        {products.map(p => (
          <div key={p.id} style={{background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden', textAlign: 'center'}}>
            <div style={{height: '200px', background: '#f1f5f9'}}></div>
            <div style={{padding: '1.5rem'}}>
              <h3>{p.name}</h3>
              <p style={{color: '#10b981', fontWeight: 'bold'}}>{p.price}</p>
              <button style={{background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer'}}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <ScrollToTop />
       <ToastContainer
        position="top-right"
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* === Public Website Routes === */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/partner" element={<BecomePartnerPage />} />
          <Route path="/calculator" element={<SolarCalculatorPage />} /> {/* New Calculator Route */}
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/visualizer" element={<RoofVisualizerPage />} />
          <Route path="/shop" element={<ShopPage />} />

          {/* Legal Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsServicePage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />

          {/* Blog Routes */}
          <Route path="/blog/solar-subsidy" element={<SolarSubsidyPage />} />
          <Route path="/blog/on-grid-vs-off-grid" element={<GridVsOffGridPage />} />
          <Route path="/blog/maintenance-tips" element={<MaintenanceTipsPage />} />

          {/* 404 Not Found - Must be last in PublicLayout */}
          <Route path="*" element={<NotFoundPage />} />

          {/* Add other public pages here */}
        </Route>

        {/* === Auth Routes (No Layout) === */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* <-- ADD ROUTE */}
        <Route path="/resetpassword/:token" element={<ResetPasswordPage />} /> {/* <-- ADD DYNAMIC ROUTE */}
        <Route path="/set-new-password" element={<SetNewPasswordPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />



        <Route path="/app" element={<ProtectedRoute />}> {/* Protect the whole /app section */}
          <Route element={<MainLayout />}> {/* Wrap all associate pages in the MainLayout */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="network/directs" element={<MyDirectsPage />} />
            <Route path="network/genealogy" element={<AssociateGenealogyPage />} />
            <Route path="profile" element={<MyProfilePage />} />
            <Route path="payout/income" element={<IncomeDetailPage />} />
            <Route path="documents" element={<UploadDocumentsPage />} />
            <Route path="profile/changepassword" element={<ChangePasswordPage />} />

          </Route>
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}> {/* <-- WRAP WITH LAYOUT */}
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<ManageUsersPage />} />
            <Route path="deposits" element={<ManageDepositsPage />} />
            <Route path="genealogy" element={<AdminGenealogyPage />} />
            <Route path="settings" element={<SettingsPage />} />
             <Route path="gallery" element={<ManageGalleryPage />} />
              <Route path="announcements" element={<ManageAnnouncementsPage />} />
              <Route path="team" element={<ManageTeamPage />} />
              <Route path="inquiries" element={<ManageInquiriesPage />} /> {/* New Route */}
              <Route path="calculator" element={<ManageCalculatorPage />} />
            {/* We will add the deposits page route here next */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;