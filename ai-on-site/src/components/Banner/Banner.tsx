import { useState, useEffect, useCallback } from "react";
import "./Banner.css"; // 같은 폴더에 Banner.css 파일을 만드세요!

const bannerData = [
  { id: 1, type: "video", url: "/banner-1.mp4" },
  { id: 2, type: "image", url: "/banner-2.png" },
  { id: 3, type: "image", url: "/banner-3.png" },
  { id: 4, type: "image", url: "/banner-4.png" },
  { id: 5, type: "image", url: "/banner-5.png" },
];

const snsData = [
  {
    id: 1,
    name: "Instagram",
    img: "src/assets/icons/icon-instagram.png",
    color: "#63439F",
    link: "https://www.instagram.com/jeju_ai_on/",
  },
  {
    id: 2,
    name: "Blog",
    img: "src/assets/icons/icon-blog.png",
    color: "#F4D02D",
    link: "https://blog.naver.com",
  },
  {
    id: 3,
    name: "Cafe",
    img: "src/assets/icons/icon-cafe.png",
    color: "#A6d453",
    link: "https://cafe.naver.com/aion2024",
  },
  {
    id: 4,
    name: "YouTube",
    img: "src/assets/icons/icon-youtube.png",
    color: "#db3e24",
    link: "https://www.youtube.com/@제주디지털on연구소",
  },
  {
    id: 5,
    name: "X",
    img: "src/assets/icons/icon-X.png",
    color: "#0b1c36",
    link: "https://x.com",
  },
  {
    id: 6,
    name: "Location",
    img: "src/assets/icons/icon-location.png",
    color: "#3766b0",
    link: "https://map.naver.com/p/entry/place/2070346762?placePath=/home?entry=plt&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202603182248&locale=ko&svcName=map_pcv5&searchType=place&lng=126.5266586&lat=33.5152458&c=15.00,0,0,0,dh",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return; // 마우스가 올라가 있으면 타이머 작동 안 함

    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // JSX 부분
  <div
    className="banner-container"
    onMouseEnter={() => setIsPaused(true)} // 마우스 진입 시 멈춤
    onMouseLeave={() => setIsPaused(false)} // 마우스 나가면 다시 시작
  ></div>;

  return (
    <div className="banner-wrapper">
      <div className="banner-container">
        {/* 슬라이드 영역 */}
        <div
          className="banner-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {bannerData.map((banner) => (
            <div key={banner.id} className="banner-item">
              {banner.type === "video" ? (
                <video
                  src={banner.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="banner-media"
                />
              ) : (
                <img
                  src={banner.url}
                  alt={banner.title}
                  className="banner-media"
                />
              )}
            </div>
          ))}
        </div>

        {/* 좌우 화살표 (Hover 시 나타남) */}
        <button className="arrow-btn left" onClick={prevSlide}>
          ❮
        </button>
        <button className="arrow-btn right" onClick={nextSlide}>
          ❯
        </button>

        {/* 하단 점 인디케이터 */}
        <div className="indicator-container">
          {bannerData.map((_, index) => (
            <div
              key={index}
              className={`dot ${current === index ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
      {/* /SNS 영역 */}
      <div className="sns-section">
        <div className="sns-container">
          {snsData.map((sns) => (
            <a
              key={sns.id}
              href={sns.link}
              target="_blank"
              rel="noreferrer"
              className="sns-item"
              style={{ backgroundColor: sns.color }} // 인라인 스타일로 배경색 적용
            >
              <img src={sns.img} alt={sns.name} className="sns-icon" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
