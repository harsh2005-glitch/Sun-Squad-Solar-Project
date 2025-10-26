import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// --- IMPORT our new announcementService and Bootstrap components ---
import announcementService from '../../services/announcementService';
import { Container, Spinner, Alert } from 'react-bootstrap';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        <div className="text-center p-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading Announcements...</p>
        </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-3">{error}</Alert>;
  }

  return (
    <main>
      <section className="announcements-section">
        <Container>
          <h2 className="section-title">Latest News & Announcements</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Stay up to date with our company's latest developments, achievements, and events.</p>

          <div className="announcements-grid">
            {/* --- The grid now maps over the 'announcements' state --- */}
            {announcements.length > 0 ? (
              announcements.map((ann) => (
                <article className="announcement-card" key={ann._id}>
                  {/* Conditionally render the image only if it exists */}
                  {ann.imageUrl && (
                    <div className="card-image">
                      <Link to="#"><img src={ann.imageUrl} alt={ann.title} /></Link>
                    </div>
                  )}
                  <div className="card-content">
                    <div className="card-meta">
                      <span><i className="fa-solid fa-calendar-days"></i> {new Date(ann.createdAt).toLocaleDateString()}</span>
                      <span><i className="fa-solid fa-user"></i> By {ann.author}</span>
                    </div>
                    <h3 className="card-title"><Link to="#">{ann.title}</Link></h3>
                    <p className="card-excerpt">
                      {ann.content}
                    </p>
                    <Link to="#" className="btn-read-more">Read More <i className="fa-solid fa-arrow-right"></i></Link>
                  </div>
                </article>
              ))
            ) : (
              <p>No announcements have been posted yet. Check back soon!</p>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AnnouncementsPage;