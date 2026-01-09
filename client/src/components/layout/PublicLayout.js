import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import EnquiryModal from './ui/EnquiryModal'; 
import FloatingActions from '../common/FloatingActions';
import ExitIntentPopup from '../common/ExitIntentPopup';

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
        <Outlet />
      </main>
      
      <PublicFooter />

      {/* === Conversion Boosters === */}
      <FloatingActions />
      <ExitIntentPopup />

      {/* === Global Modals === */}
      <EnquiryModal show={isModalOpen} handleClose={closeModal} />
    </div>
  );
};

export default PublicLayout;