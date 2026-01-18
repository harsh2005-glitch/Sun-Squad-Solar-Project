import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh', padding: '100px 0' }}>
            <div className="text-center">
                <h1 className="display-1 fw-bold text-warning" style={{ fontSize: '6rem' }}>404</h1>
                <h2 className="mb-4">Oops! Page Not Found</h2>
                <p className="lead mb-5 text-muted" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/">
                    <Button variant="success" size="lg" className="rounded-pill px-5 shadow-sm">
                        <i className="fa-solid fa-house me-2"></i> Return Home
                    </Button>
                </Link>
            </div>
        </Container>
    );
};

export default NotFoundPage;
