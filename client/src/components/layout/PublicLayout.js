import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import EnquiryModal from './ui/EnquiryModal'; 
import FloatingActions from '../common/FloatingActions';
import ExitIntentPopup from '../common/ExitIntentPopup';
import CookieConsent from '../common/CookieConsent';
import Breadcrumbs from '../common/Breadcrumbs';

const PublicLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnquiryClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* The header receives the function to open the modal */}
      <PublicHeader onEnquiryClick={handleEnquiryClick} />
      
      <main className="content-beneath-navbar">
        <Breadcrumbs />
        <Outlet />
      </main>
      
      <PublicFooter />

      {/* === Conversion Boosters === */}
      <FloatingActions />
      <ExitIntentPopup />
      <CookieConsent />

      {/* === Global Modals === */}
      <EnquiryModal show={isModalOpen} handleClose={closeModal} />
    </div>
  );
};

export default PublicLayout;