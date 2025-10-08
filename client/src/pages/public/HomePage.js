import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

// --- Import your slider images ---
import sliderImg1 from '../../assets/images/hero-slider-1.jpg'; // Replace with your actual image file
import sliderImg2 from '../../assets/images/hero-slider-2.jpg'; // Replace with your actual image file
import sliderImg3 from '../../assets/images/hero-slider-3.jpg'; // Replace with your actual image file

// Import all necessary images
import teamAbhishek from '../../assets/images/team-abhishek.jpg';
import teamShivam from '../../assets/images/team-shivam.jpg';

const HomePage = () => {
  return (
    <>

    {/* === NEW Bootstrap Carousel Section === */}
      <Carousel fade indicators={false} controls={false}>
        <Carousel.Item interval={3000}> {/* interval is in milliseconds (3 seconds) */}
          <img
            className="d-block w-100"
            src={sliderImg1}
            alt="First slide"
            style={{ height: '85vh', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Powerful Solar Solutions</h3>
            <p>Harness the power of the sun for a brighter future.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={sliderImg2}
            alt="Second slide"
            style={{ height: '85vh', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Sustainable Energy for Everyone</h3>
            <p>Join us in the renewable energy revolution.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={sliderImg3}
            alt="Third slide"
            style={{ height: '85vh', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Expert Installation & Service</h3>
            <p>Quality and reliability you can trust.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link> */}
   
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
          <section class="priority-section">
        <div class="priority-container">
            <div class="priority-content">
                <h2 class="section-title">WE ALWAYS PROVIDE PRIORITY TO OUR CUSTOMER</h2>
                <p>
                    The reason why Sun Squad Solar has been able to achieve such steep success in a short
                    period of time is due to our diligence toward ensuring customer satisfaction in every way possible.
                    Right from the selection of solar for our projects to our vast and growing network, we always ensure
                    that the process is transparent and customer friendly.
                </p>
            </div>

            
            <div class="priority-features">
                <div class="feature-item">
                    <div class="feature-icon"><i class="fa-solid fa-indian-rupee-sign"></i></div>
                    <div class="feature-text">
                        <h3>Low Cost</h3>
                        <p>Designing, developing and managing solar properties at affordable prices.</p>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon"><i class="fa-solid fa-store"></i></div>
                    <div class="feature-text">
                        <h3>Good Marketing</h3>
                        <p>Preparing studies and providing consultations regarding solar uses and sales.</p>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon"><i class="fa-solid fa-handshake"></i></div>
                    <div class="feature-text">
                        <h3>Reliable</h3>
                        <p>To be an optimum business template for the solar Industry.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

      {/* Values & Vision Section */}
      <section class="values-section">
        <div class="values-container">
            <div class="value-card why-choose-us">
                <h3>Why Choose Us</h3>
                <p>
                    Sun Squad Solar. We use a combination of both online and offline marketing to ensure that
                    we reach out to the maximum amount of customers and provide them best services.
                </p>
                <a href="#" class="btn-learn-more">Learn More</a>
            </div>

            <div class="value-card">
                <div class="value-icon"><i class="fa-solid fa-eye"></i> </div>
               
                <h3>Our Vision</h3>
                <p>
                     Promoting renewable energy adoption, and ensuring a cleaner, greener, and brighter future for generations by providing innovative and reliable solar solutions to communities and industries....
                </p>
                <a href="#" class="btn-learn-more">Learn More</a>
            </div>

            <div class="value-card">
                <div class="value-icon"><i class="fa-solid fa-bullseye"></i></div>
                <h3>Our Mission</h3>
                <p>
                    We Mission to offer added value to our customers by providing a "whole of life" client support
                    programme to assist in ensuring the best outcome...
                </p>
                <a href="#" class="btn-learn-more">Learn More</a>
            </div>

            
            <div class="value-card">
                <div class="value-icon"><i class="fa-solid fa-people-group"></i></div>
                <h3>Our Strategy</h3>
                <p>
                    Manufacturing specialized solar accessories like brackets and junction boxes, while Sun Squad Solar Systems & Electrical designs and installs complete solar systems for homes and businesses ...
                </p>
                <a href="#" class="btn-learn-more">Learn More</a>
            </div>
        </div>
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

       <section class="stats-section">
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-icon"><i class="fa-regular fa-user"></i></div>
                <span class="stat-number">1000</span>
                <p class="stat-label">Our Customer +</p>
            </div>

            <div class="stat-card">
                <div class="stat-icon"><i class="fa-solid fa-warehouse"></i></div>
                <span class="stat-number">2</span>
                <p class="stat-label">Our Branch +</p>
            </div>

            <div class="stat-card">
                <div class="stat-icon"><i class="fa-solid fa-people-roof"></i></div>
                <span class="stat-number">100</span>
                <p class="stat-label">Our Agent +</p>
            </div>
        </div>
    </section>

    <section class="amenities-section">
        <h2 class="section-title amenities-title">
            <span>Exclusivity</span> | <span>High Quality</span> | <span>Architectural Style</span> | <span>Premium
                Location</span> | <span>Amenities</span>
        </h2>
        <div class="title-underline"></div>
        <div class="amenities-grid">
            <div class="amenity-card">
                <div class="amenity-icon"><i class="fa-solid fa-school"></i></div>
                <h4>School</h4>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon"><i class="fa-solid fa-cart-shopping"></i></div>
                <h4>Shopping Mall</h4>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon"><i class="fa-solid fa-house"></i></div>
                <h4>Houses</h4>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon"><i class="fa-solid fa-road"></i></div>
                <h4>Street</h4>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon"><i class="fa-solid fa-industry"></i></div>
                <h4>Complexes</h4>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon"><i class="fa-solid fa-bullseye"></i></div>
                <h4>Government Project</h4>
            </div>
            
        </div>
    </section>


    <section class="testimonials-section">
        <h2 class="section-title">What Customer Says</h2>
        <div class="title-underline"></div>
        <div class="testimonials-container">
             <div class="testimonial-card">
                <div class="testimonial-header">
                    <h4>Mr. Jatin Singh</h4>
                </div>
                <p class="testimonial-quote">
                    Ever since I got the solar installed, the tension regarding the electricity bill has ended. We are 
                    living happily without any tension. The worker installed the connection successfully without 
                    any fault. Everything was completed on time.
                </p> 
            </div> 

            <div class="testimonial-card">
                <div class="testimonial-header">
                    <h4>Mr. Suresh</h4>
                </div>
                <p class="testimonial-quote">
                   "From the initial installation to the final installation, the staff was extremely helpful and professional.
                    They explained everything clearly and answered all our questions without a high-pressure sales pitch ".
                </p>
            </div>
        </div>
    </section>


      {/* (Continue converting all other sections from your index.html: Stats, Amenities, Testimonials etc.) */}
    </>
  );
};

export default HomePage;