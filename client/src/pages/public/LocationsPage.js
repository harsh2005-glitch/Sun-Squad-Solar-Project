import React from 'react';
import { Link } from 'react-router-dom';

// Import the background images
import varanasiBg from '../../assets/images/locations-bg/varanasi-bg.jpg';
import mirzapurBg from '../../assets/images/locations-bg/mirzapur-bg.jpg';
import bhadohiBg from '../../assets/images/locations-bg/bhadohi-bg.jpg';
// import MugalSaraiBg from '../../assets/images/locations-bg/MugalSarai-bg.png';

const LocationsPage = () => {
  return (
    <main>
      <section className="project-locations-page">
        <div className="container">
          <h2 className="section-title">Areas We Serve</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">We are proud to provide sustainable solar solutions to homes and businesses across the following regions.</p>

          <div className="locations-page-grid">
            {/* Location Card 1: Varanasi */}
            <Link to="#" className="location-card">
              <div className="card-bg" style={{ backgroundImage: `url(${varanasiBg})` }}></div>
              <div className="card-overlay"></div>
              <div className="card-content">
                <h3>Varanasi</h3>
                <span>View Projects <i className="fa-solid fa-arrow-right"></i></span>
              </div>
            </Link>

            {/* Location Card 2: Mirzapur */}
            <Link to="#" className="location-card">
              <div className="card-bg" style={{ backgroundImage: `url(${mirzapurBg})` }}></div>
              <div className="card-overlay"></div>
              <div className="card-content">
                <h3>Mirzapur</h3>
                <span>View Projects <i className="fa-solid fa-arrow-right"></i></span>
              </div>
            </Link>

            {/* Location Card 3: Bhadohi */}
            <Link to="#" className="location-card">
              <div className="card-bg" style={{ backgroundImage: `url(${bhadohiBg})` }}></div>
              <div className="card-overlay"></div>
              <div className="card-content">
                <h3>Bhadohi</h3>
                <span>View Projects <i className="fa-solid fa-arrow-right"></i></span>
              </div>
            </Link>

          

            {/* You can add more location cards here */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LocationsPage;