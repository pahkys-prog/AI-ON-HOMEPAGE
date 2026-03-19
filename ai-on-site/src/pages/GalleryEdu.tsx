import React from "react";
import { GALLERY_DATA } from "../data/galleryData";
import "../pages/GalleryPages.css";

const GalleryEdu: React.FC = () => {
  // Edu 카테고리만 필터링
  const eduItems = GALLERY_DATA.filter(item => item.category === 'Edu');

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>Educational Content</h1>
      </header>

      <main className="list-layout">
        {eduItems.map(item => (
          <section key={item.id} className="horizontal-card">
            <div className="media-box">
              {/* 교육용은 주로 이미지(thumbnail)를 크게 보여주도록 설정 */}
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.title} />
              ) : (
                <div className="placeholder">이미지가 준비 중입니다.</div>
              )}
            </div>
            <div className="content-box">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default GalleryEdu;