import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardPage from './pages/associate/DashboardPage';
import MainLayout from './components/layout/MainLayout';
import MyDirectsPage from './pages/associate/MyDirectsPage';
import MyProfilePage from './pages/associate/MyProfilePage';
import AdminRoute from './routes/AdminRoute'; // <-- IMPORT ADMIN GUARD
import ManageUsersPage from './pages/admin/ManageUsersPage';
import AdminLayout from './components/layout/AdminLayout';
import ManageDepositsPage from './pages/admin/ManageDepositsPage';
import IncomeDetailPage from './pages/associate/IncomeDetailPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// --- Create a temporary Dashboard Page for now ---
// const DashboardPage = () => <div><h1>Welcome to your Dashboard!</h1><p>This page is protected.</p></div>;
// const AdminDashboardPage = () => <div><h1>Admin Dashboard</h1></div>;
function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        


        <Route path="/app" element={<ProtectedRoute />}> {/* Protect the whole /app section */}
          <Route element={<MainLayout />}> {/* Wrap all associate pages in the MainLayout */}
            <Route path="dashboard" element={<DashboardPage />} />
              <Route path="network/directs" element={<MyDirectsPage />} />
            <Route path="profile" element={<MyProfilePage />}/>
            <Route path="payout/income" element={<IncomeDetailPage />} /> 
            
          </Route>
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}> {/* <-- WRAP WITH LAYOUT */}
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<ManageUsersPage />} />
            <Route path="deposits" element={<ManageDepositsPage />} />
            {/* We will add the deposits page route here next */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;