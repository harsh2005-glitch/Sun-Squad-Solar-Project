
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Layouts
import PublicLayout from './components/layout/PublicLayout';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';

// Import Guards
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

// Import Public Pages
import HomePage from './pages/public/HomePage';
import ContactPage from './pages/public/ContactPage';
import GalleryPage from './pages/public/GalleryPage';
import AnnouncementsPage from './pages/public/AnnouncementsPage';
import LocationsPage from './pages/public/LocationsPage';

// Import Auth Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

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


// --- Create a temporary Dashboard Page for now ---
// const DashboardPage = () => <div><h1>Welcome to your Dashboard!</h1><p>This page is protected.</p></div>;
// const AdminDashboardPage = () => <div><h1>Admin Dashboard</h1></div>;
function App() {
  return (
    <div>
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
          {/* Add other public pages here */}
        </Route>

        {/* === Auth Routes (No Layout) === */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* <-- ADD ROUTE */}
        <Route path="/resetpassword/:token" element={<ResetPasswordPage />} /> {/* <-- ADD DYNAMIC ROUTE */}
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
            {/* We will add the deposits page route here next */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;