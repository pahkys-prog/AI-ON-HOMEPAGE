import React, { useState } from "react";
import { eduData } from "../data/gallery/index";
import type { GalleryItem } from "../types/gallery";
import "../pages/GalleryPages.css";

const GalleryEdu: React.FC = () => {
  const [selectedEdu, setSelectedEdu] = useState<GalleryItem | null>(null);
  const eduItems = eduData;

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>Educational Content</h1>
        <div className="copyright-alert-banner">
          <p>
            <span className="icon">⚠️</span>본 갤러리의 모든 작품은 저작권법의
            보호를 받습니다.
            <strong>무단 캡처, 복제 및 AI 학습용 활용</strong>은 엄격히
            금지되며, 위반 시 법적 책임을 물을 수 있습니다.
          </p>
        </div>
      </header>

      <main className="list-layout">
        {eduItems.map((item: GalleryItem) => (
          <section
            key={item.id}
            onClick={() => setSelectedEdu(item)}
            className="horizontal-card"
          >
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
        {selectedEdu && (
          <div className="modal">
            <h3>{selectedEdu.title}</h3>
            <p>{selectedEdu.description}</p>
            <button onClick={() => setSelectedEdu(null)}>닫기</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryEdu;
