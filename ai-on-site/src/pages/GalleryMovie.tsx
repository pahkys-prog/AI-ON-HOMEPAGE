import React from "react";
import {movieData } from "../data/gallery/index";
import "../pages/GalleryPages.css";

const GalleryMovie: React.FC = () => {
  // Movie 카테고리만 필터링
  const movieItems = movieData;

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>Contents Creat</h1>
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
        {movieItems.map((item) => (
          <section key={item.id} className="horizontal-card">
            <div className="media-box">
              {item.mediaUrl ? (
                <video src={item.mediaUrl} controls poster={item.thumbnail} />
              ) : (
                <div className="placeholder">영상이 준비 중입니다.</div>
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

export default GalleryMovie;
