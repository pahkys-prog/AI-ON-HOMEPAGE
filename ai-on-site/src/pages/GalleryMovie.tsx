import React from "react";
import { GALLERY_DATA } from "../data/galleryData";
import "../pages/GalleryPages.css";

const GalleryMovie: React.FC = () => {
  // Movie 카테고리만 필터링
  const movieItems = GALLERY_DATA.filter((item) => item.category === "Movie");

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1 style={{ color: "#5bb68c" }}>Contents Creat</h1>
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
