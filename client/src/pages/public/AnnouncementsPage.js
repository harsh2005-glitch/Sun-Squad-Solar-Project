import React from 'react';
import { Link } from 'react-router-dom';

// Import the images used on this page
import awardCeremonyImg from '../../assets/images/announcements/award-ceremony.jpg';
import newTechPanelImg from '../../assets/images/announcements/new-tech-panel.jpg';

const AnnouncementsPage = () => {
  return (
    <main>
      <section className="announcements-section">
        <div className="container">
          <h2 className="section-title">Latest News & Announcements</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Stay up to date with our company's latest developments, achievements, and events.</p>

          <div className="announcements-grid">
            {/* Announcement Card 1 */}
            <article className="announcement-card">
              <div className="card-image">
                <Link to="#"><img src={awardCeremonyImg} alt="Award Ceremony" /></Link>
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span><i className="fa-solid fa-calendar-days"></i> August 15, 2025</span>
                  <span><i className="fa-solid fa-user"></i> By Admin</span>
                </div>
                <h3 className="card-title"><Link to="#">Sun Shine Solar Wins "Green Energy Innovator of the Year" Award</Link></h3>
                <p className="card-excerpt">
                  We are thrilled to be recognized for our commitment to renewable energy and technological advancement at the annual National Energy Summit.
                </p>
                <Link to="#" className="btn-read-more">Read More <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            </article>

            {/* Announcement Card 2 */}
            <article className="announcement-card">
              <div className="card-image">
                <Link to="#"><img src={newTechPanelImg} alt="New Solar Panel Technology" /></Link>
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span><i className="fa-solid fa-calendar-days"></i> July 28, 2025</span>
                  <span><i className="fa-solid fa-user"></i> By Admin</span>
                </div>
                <h3 className="card-title"><Link to="#">Introducing Our New Line of High-Efficiency Solar Panels</Link></h3>
                <p className="card-excerpt">
                  Our new SH-500 series panels offer a 25% increase in energy conversion, providing more power and greater savings for our customers.
                </p>
                <Link to="#" className="btn-read-more">Read More <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            </article>

            {/* You can add more announcement cards here by copying the structure above */}

          </div>
        </div>
      </section>
    </main>
  );
};

export default AnnouncementsPage;