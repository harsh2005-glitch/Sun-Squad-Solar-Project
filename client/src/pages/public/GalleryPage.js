import React, { useState, useEffect, useMemo } from 'react';
// --- IMPORT our new galleryService ---
import galleryService from '../../services/galleryService';
// Import Bootstrap components for a better loading/error state
import { Spinner, Alert } from 'react-bootstrap';


const GalleryPage = () => {
  const [allItems, setAllItems] = useState([]); // <-- State to hold items from the API
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- NEW: Fetch data from the API when the page loads ---
  useEffect(() => {
    const fetchGallery = async () => {
        try {
            const response = await galleryService.getPublicGallery();
            setAllItems(response.data);
        } catch (err) {
            setError("Could not load gallery images. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    fetchGallery();
  }, []); // Empty array ensures this runs only once


  // This filtering logic now works on the state fetched from the API
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return allItems;
    }
    return allItems.filter(item => item.category === activeCategory);
  }, [activeCategory, allItems]);

  if (loading) {
    return (
        <div className="text-center p-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading Gallery...</p>
        </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-3">{error}</Alert>;
  }


  return (
    <main>
      <section className="gallery-section">
        <h2 className="section-title">Our Project Gallery</h2>
        <div className="title-underline"></div>

        <div className="gallery-filter">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Projects
          </button>
          <button
            className={`filter-btn ${activeCategory === 'residential' ? 'active' : ''}`}
            onClick={() => setActiveCategory('residential')}
          >
            Residential
          </button>
          <button
            className={`filter-btn ${activeCategory === 'commercial' ? 'active' : ''}`}
            onClick={() => setActiveCategory('commercial')}
          >
            Commercial
          </button>
          <button
            className={`filter-btn ${activeCategory === 'industrial' ? 'active' : ''}`}
            onClick={() => setActiveCategory('industrial')}
          >
            Industrial
          </button>
        </div>

        <div className="gallery-grid">
          {/* The grid now maps over the 'filteredItems' state */}
          {filteredItems.map((item) => (
            <div key={item._id} className="gallery-item" data-category={item.category}>
              {/* The href now points to the imageUrl from the database */}
              <a href={item.imageUrl} data-lightbox="project-gallery" data-title={item.title}>
                <img src={item.imageUrl} alt={item.title || item.category} />
                <div className="overlay"><span>{item.title || 'View Project'}</span></div>
              </a>
            </div>
          ))}
        </div>
        
        {/* Show a message if no items are found */}
        {filteredItems.length === 0 && (
            <p className="mt-5">No projects found in this category.</p>
        )}

      </section>
    </main>
  );
};

export default GalleryPage;