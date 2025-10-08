import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Sun Shine Solar Home Page</h1>
      <p>This is the public-facing landing page for your company.</p>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
      </nav>
    </div>
  );
}

export default HomePage;