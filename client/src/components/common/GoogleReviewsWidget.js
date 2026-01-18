import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './GoogleReviewsWidget.css';

// Fake Data for reviews to simulate the widget if real API isn't connected
const REVIEWS = [
    {
        id: 1,
        name: "Rahul Khanna",
        initial: "R",
        stars: 5,
        date: "2 weeks ago",
        text: "Installed a 5kW system for my home in Varanasi. The team was extremely professional and the subsidy process was handled smoothly by them. Highly recommended!",
        bg: "#8e44ad"
    },
    {
        id: 2,
        name: "Priya Singh",
        initial: "P",
        stars: 5,
        date: "1 month ago",
        text: "Best solar company in the region. Mr. Abhishek explained everything clearly. The 'after-sales' support is what makes them stand out.",
        bg: "#e67e22"
    },
    {
        id: 3,
        name: "Amit Patel",
        initial: "A",
        stars: 5,
        date: "3 months ago",
        text: "Very satisfied with the installation quality. The structure is sturdy and panels are high efficiency. My electricity bill has dropped by 90%.",
        bg: "#27ae60"
    }
];

const GoogleReviewsWidget = () => {
    return (
        <section className="google-reviews-section">
            <Container>
                {/* Header that looks like Google */}
                <div className="google-header text-center mb-5">
                    <div className="google-logo-wrapper d-inline-flex align-items-center justify-content-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="35" height="35" className="me-2">
                            <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        <span className="google-rating-score">4.9</span>
                        <div className="stars-wrapper mx-2">
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                        </div>
                    </div>
                    <p className="text-muted">Based on 150+ Reviews</p>
                    
                    <a 
                        href="https://www.google.com/maps/place/SUN+SQUAD+SOLAR/@25.2636509,82.9607071,17z/data=!3m1!4b1!4m6!3m5!1s0x398e332fdf328f73:0x1a5c35f7c55c3ffa" 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-outline-dark rounded-pill btn-sm fw-bold px-4"
                    >
                        Review us on Google
                    </a>
                </div>

                <Row className="g-4 justify-content-center">
                    {REVIEWS.map((review) => (
                        <Col md={4} key={review.id}>
                            <Card className="google-review-card h-100">
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="reviewer-avatar" style={{backgroundColor: review.bg}}>
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                        <div className="ms-3">
                                            <h6 className="mb-0 fw-bold">{review.name}</h6>
                                            <small className="text-muted">{review.date}</small>
                                        </div>
                                        <div className="ms-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                                <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                                <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                                <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="mb-2 review-stars">
                                        {[...Array(review.stars)].map((_, i) => (
                                            <i key={i} className="fa-solid fa-star text-warning small me-1"></i>
                                        ))}
                                    </div>
                                    <Card.Text className="review-text">
                                        "{review.text}"
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default GoogleReviewsWidget;
