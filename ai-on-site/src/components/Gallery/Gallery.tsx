import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();

  const galleryItems = [
    { id: 1, frame: '/images/frame-1.png', gif: '/images/art-1.gif', path: '/gallery/category1' },
    { id: 2, frame: '/images/frame-2.png', gif: '/images/art-2.gif', path: '/gallery/category2' },
    { id: 3, frame: '/images/frame-3.png', gif: '/images/art-3.gif', path: '/gallery/category3' },
  ];

  return (
    <section className="gallery-section layout-center">
      <h2 className="section-title">AI Art Gallery</h2>
      <div className="frame-container">
        {galleryItems.map((item) => (
          <div 
            key={item.id} 
            className="frame-wrapper" 
            onClick={() => navigate(item.path)}
          >
            {/* 앤틱 액자 프레임 */}
            <img src={item.frame} alt={`Frame ${item.id}`} className="frame-img" />
            
            {/* 액자 안에 들어갈 GIF */}
            <div className="gif-inside">
              <img src={item.gif} alt={`Art ${item.id}`} className="art-gif" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;