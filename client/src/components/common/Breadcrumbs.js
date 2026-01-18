import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Breadcrumb } from 'react-bootstrap';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show breadcrumbs on home page
    if (pathnames.length === 0) {
        return null;
    }

    return (
        <div className="breadcrumb-wrapper">
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                        Home
                    </Breadcrumb.Item>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        
                        // Capitalize first letter and replace hyphens with spaces
                        const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

                        return isLast ? (
                            <Breadcrumb.Item active key={name}>
                                {displayName}
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item linkAs={Link} linkProps={{ to: routeTo }} key={name}>
                                {displayName}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </Container>
        </div>
    );
};

export default Breadcrumbs;
