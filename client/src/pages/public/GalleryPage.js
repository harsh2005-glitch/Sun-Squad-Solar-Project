import React, { useState, useMemo } from 'react';

// Import all your gallery images
import res1 from '../../assets/images/gallery/residential-home-1.jpg';
import res2 from '../../assets/images/gallery/residential-home-2.jpg';
import res3 from '../../assets/images/gallery/residential-home-3.jpg';
// ... import all other residential images (res4 to res10)
import com1 from '../../assets/images/gallery/commercial-roof-1.jpg';
import ind1 from '../../assets/images/gallery/industrial-plant-1.jpg';


// Create an array of all gallery items to make them easier to manage
const allGalleryItems = [
  { src: res1, category: 'residential', title: 'Modern Residential Rooftop Installation' },
  { src: res2, category: 'residential', title: 'Suburban Home Solar Solution' },
  { src: res3, category: 'residential', title: 'Eco-Friendly Housing Project' },
  // ... add all other residential items here
  { src: com1, category: 'commercial', title: 'Large Commercial Business Complex' },
  { src: ind1, category: 'industrial', title: 'Industrial Factory Power Solution' },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // useMemo will re-calculate the filtered items only when the activeCategory changes
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return allGalleryItems;
    }
    return allGalleryItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main>
      <section className="gallery-section">
        <h2 className="section-title">Our Project Gallery</h2>
        <div className="title-underline"></div>

        {/* Filter Buttons with React onClick handlers */}
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

        {/* Image Grid rendered from our filtered state */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <div key={index} className="gallery-item" data-category={item.category}>
              {/* NOTE: Lightbox functionality would require a React-specific library. 
                  This basic link will just open the image. */}
              <a href={item.src} target="_blank" rel="noopener noreferrer">
                <img src={item.src} alt={item.title} />
                <div className="overlay"><span>{item.title}</span></div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;