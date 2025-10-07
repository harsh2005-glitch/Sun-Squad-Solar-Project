import React from 'react';
import { Link } from 'react-router-dom';

// Import all necessary images
import teamAbhishek from '../../assets/images/team-abhishek.jpg';
import teamShivam from '../../assets/images/team-shivam.jpg';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" />

      {/* About Us Section */}
      <section className="about-us">
        <div className="about-container">
          <div className="about-video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/TzfnlPxCZv0?si=NMhAnttXOROafKJs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="about-content">
            <h2 className="section-title">About Us</h2>
            <p>
              Sun Squad Solar is a leading renewable energy company in India. We provide system integration support for turn-key projects. We assist in building customised systems from multiple sources which have been garnered from our expertise. As our firm name suggests, our priority relies in providing alternate power solutions at affordable prices.
            </p>
            <p>
              * On-time at services<br />
              * Verified professionals
            </p>
            <Link to="/about" className="btn btn-read-more">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Customer Priority Section */}
      <section className="priority-section">
          {/* ... (Copy the content of the <section class="priority-section"> from your index.html here and convert to JSX) ... */}
      </section>

      {/* Values & Vision Section */}
      <section className="values-section">
          {/* ... (Copy the content of the <section class="values-section"> from your index.html here and convert to JSX) ... */}
      </section>
      
      {/* Team Member Section */}
      <section className="team-section">
        <h2 className="section-title">Our Team Member</h2>
        <div className="title-underline"></div>
        <div className="team-container">
          <div className="team-card">
            <img src={teamAbhishek} alt="Mr. Abhishek Maurya" />
            <h3>MR. ABHISHEK MAURYA</h3><br />
            <b><p>Owner</p></b>
          </div>
          <div className="team-card">
            <img src={teamShivam} alt="Mr. Shivam Maurya" />
            <h3>MR. SHIVAM MAURYA</h3><br />
            <b><p>Operation Head</p></b>
          </div>
        </div>
      </section>

      {/* (Continue converting all other sections from your index.html: Stats, Amenities, Testimonials etc.) */}
    </>
  );
};

export default HomePage;