import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// --- IMPORT our new announcementService and Bootstrap components ---
import announcementService from '../../services/announcementService';
import { Container, Spinner, Alert, Modal, Button } from 'react-bootstrap';
import './AnnouncementsPage.css';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleClose = () => {
      setShowModal(false);
      setSelectedAnnouncement(null);
  };
  
  const handleShow = (announcement) => {
      setSelectedAnnouncement(announcement);
      setShowModal(true);
  };

  // --- NEW: Fetch data from the API when the page loads ---
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await announcementService.getPublicAnnouncements();
        setAnnouncements(response.data);
      } catch (err) {
        setError("Could not load announcements. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []); // Empty array ensures this runs only once

  if (loading) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60vh'}}>
            <div className="text-center">
                <Spinner animation="border" variant="warning" style={{width: '3rem', height: '3rem'}} />
                <p className="mt-3 text-muted fw-bold">Loading Announcements...</p>
            </div>
        </div>
    );
  }

  if (error) {
    return (
        <Container className="my-5">
            <Alert variant="danger" className="text-center shadow-sm border-0">
                <i className="fa-solid fa-circle-exclamation me-2"></i> {error}
            </Alert>
        </Container>
    );
  }

  return (
    <main>
      <section className="announcements-section">
        <Container>
          <h2 className="section-title">Latest Updates</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Stay up to date with Sun Squad Solar's latest developments, achievements, and upcoming events.</p>

          <div className="announcements-grid">
            {/* --- The grid now maps over the 'announcements' state --- */}
            {announcements.length > 0 ? (
              announcements.map((ann) => (
                <article className="announcement-card" key={ann._id}>
                  {/* Conditionally render the image only if it exists */}
                  {ann.imageUrl && (
                    <div className="card-image" onClick={() => handleShow(ann)}>
                      <img src={ann.imageUrl} alt={ann.title} loading="lazy" />
                    </div>
                  )}
                  <div className="card-content">
                    <div className="card-meta">
                      <span><i className="fa-solid fa-calendar-days"></i> {new Date(ann.createdAt).toLocaleDateString()}</span>
                      <span><i className="fa-solid fa-user-tie"></i> {ann.author || 'Admin'}</span>
                    </div>
                    <h3 className="card-title">
                        <span onClick={() => handleShow(ann)} style={{cursor: 'pointer'}}>{ann.title}</span>
                    </h3>
                    <p className="card-excerpt">
                      {ann.content}
                    </p>
                    <button onClick={() => handleShow(ann)} className="btn-read-more bg-transparent border-0 p-0">
                        Read More <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                  <div className="text-muted">
                      <i className="fa-regular fa-newspaper fa-3x mb-3 opacity-50"></i>
                      <h4>No announcements yet</h4>
                      <p>Check back soon for latest news and updates.</p>
                  </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Full Content Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered className="announcement-modal">
        {selectedAnnouncement && (
            <>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">{selectedAnnouncement.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center text-muted small mb-3">
                         <span className="me-3"><i className="fa-regular fa-calendar me-2"></i>{new Date(selectedAnnouncement.createdAt).toLocaleDateString()}</span>
                         <span><i className="fa-regular fa-user me-2"></i>{selectedAnnouncement.author || 'Admin'}</span>
                    </div>
                    
                    {selectedAnnouncement.imageUrl && (
                        <div className="full-image-wrapper">
                            <img src={selectedAnnouncement.imageUrl} alt={selectedAnnouncement.title} className="img-fluid rounded" />
                        </div>
                    )}
                    
                    <div className="mt-4" style={{lineHeight: '1.8', color: '#444', whiteSpace: 'pre-wrap'}}>
                        {selectedAnnouncement.content}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </>
        )}
      </Modal>
    </main>
  );
};

export default AnnouncementsPage;