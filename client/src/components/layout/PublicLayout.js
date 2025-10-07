import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

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
      <PublicHeader onEnquiryClick={handleEnquiryClick} />
      <main>
        <Outlet /> {/* Child pages like HomePage, ContactPage will render here */}
      </main>
      <PublicFooter />

      {/* === Enquiry Modal === */}
      <div id="enquiry-modal" className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>Book an Appointment</h3>
            <button id="close-modal-btn" className="close-btn" onClick={closeModal}>&times;</button>
          </div>
          <div className="modal-body">
            <form action="#">
              <div className="form-row">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="tel" placeholder="Your Phone" required />
              </div>
              <div className="form-row">
                <input type="date" placeholder="dd-mm-yyyy" required />
                <select required>
                  <option value="" disabled selected>--Select Menu--</option>
                  <option value="site-visit">Site Visit</option>
                  <option value="sales-enquiry">Sales Enquiry</option>
                  <option value="general-info">General Information</option>
                </select>
              </div>
              <div className="form-row">
                <textarea placeholder="Message" rows="4"></textarea>
              </div>
              <div className="form-row">
                <button type="submit" className="btn-submit">Make an Appointment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;