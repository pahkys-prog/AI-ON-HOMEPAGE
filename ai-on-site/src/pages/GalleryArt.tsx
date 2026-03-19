import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/galleryData';
import type{ GalleryItem } from '../types/gallery'; // 1. 타입 import 추가 (필수!)
import "../pages/GalleryPages.css";

const GalleryArt: React.FC = () => {
  // useState에 <GalleryItem | null> 타입을 지정하여 에러 방지
  const [selectedArt, setSelectedArt] = useState<GalleryItem | null>(null);
  const artItems = GALLERY_DATA.filter(item => item.category === 'Art');

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>Art Gallery</h1>
      </header>

      {/* 3열 그리드 레이아웃 */}
      <main className="art-grid">
        {artItems.map(item => (
          <div key={item.id} className="art-item-card" onClick={() => setSelectedArt(item)}>
            <div className="art-frame">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <h3 className="art-item-title">{item.title}</h3>
          </div>
        ))}
      </main>

      {/* 모달 (작품 해설) */}
      {selectedArt && (
        <div className="modal-overlay" onClick={() => setSelectedArt(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedArt.mediaUrl} alt={selectedArt.title} />
            <div className="modal-info">
              <h2>{selectedArt.title}</h2>
              <p>{selectedArt.description}</p>
              <button className="close-btn" onClick={() => setSelectedArt(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. 파일 내보내기 추가 (App.tsx에서 쓰기 위해 필수!)
export default GalleryArt;