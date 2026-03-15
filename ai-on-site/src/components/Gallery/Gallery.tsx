import React from 'react';
import './Gallery.css';

const Gallery = () => {
  return (
    <section className="gallery-section">
      <h2 className="section-title">활동 갤러리</h2>
      <div className="gallery-grid">
        <div className="gallery-item">
          <img src="/free-icon-cafe-8080155.png" alt="Cafe Activity" />
          <p>지역 커뮤니티 활동</p>
        </div>
        {/* 추가 이미지가 있다면 같은 구조로 배치 */}
      </div>
    </section>
  );
};

export default Gallery;