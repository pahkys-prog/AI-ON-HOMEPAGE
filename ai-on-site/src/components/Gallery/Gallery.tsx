import frame1 from "../../assets/images/frame-1.png";
import frame2 from "../../assets/images/frame-2.png";
import frame3 from "../../assets/images/frame-3.png";

import art1 from "../../assets/images/Art-1.gif";
import art2 from "../../assets/images/Art-2.gif";
import art3 from "../../assets/images/Art-3.gif";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";

const Gallery = () => {
  const navigate = useNavigate();

 // src/components/Gallery/Gallery.tsx 내부

const galleryItems = [
  { id: 1, frame: frame1, gif: art1, path: "/gallery/art" },   // 소문자로 일치시키기
  { id: 2, frame: frame2, gif: art2, path: "/gallery/movie" }, // 소문자로 일치시키기
  { id: 3, frame: frame3, gif: art3, path: "/gallery/edu" },   // 소문자로 일치시키기
];

  return (
    <section className="gallery-section layout-center">
      <h1 className="section-title">AI Art Gallery</h1>
      <div className="frame-container">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="frame-wrapper"
            onClick={() => navigate(item.path)}
          >
            {/* 앤틱 액자 프레임 */}
            <img
              src={item.frame}
              alt={`Frame ${item.id}`}
              className="frame-img"
            />

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
