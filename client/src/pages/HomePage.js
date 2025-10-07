import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the A.K. Infradream Home Page</h1>
      <p>This is the public-facing landing page for your company.</p>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
      </nav>
    </div>
  );
}

export default HomePage;