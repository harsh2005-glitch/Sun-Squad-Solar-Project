import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import EnquiryModal from './ui/EnquiryModal'; // <-- IMPORT THE NEW COMPONENT

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
      
      <main>
        <Outlet />
      </main>
      
      <PublicFooter />

      {/* === NEW: The Modal is now a self-contained component === */}
      {/* It is only rendered when `isModalOpen` is true */}
      <EnquiryModal show={isModalOpen} handleClose={closeModal} />
    </div>
  );
};

export default PublicLayout;