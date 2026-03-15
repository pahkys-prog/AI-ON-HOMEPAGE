import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* 왼쪽: 이미지 영역 */}
        <div className="about-image">
          <img src="/about-img.jpg" alt="Company Introduction" />
          <div className="image-deco-box"></div> {/* 디자인 포인트용 박스 */}
        </div>

        {/* 오른쪽: 텍스트 영역 */}
        <div className="about-text">
          <span className="sub-title">WHO WE ARE</span>
          <h2>
            혁신적인 AI 솔루션으로
            <br />
            내일의 가치를 만듭니다.
          </h2>
          <p>
            우리는 복잡한 데이터를 단순하게 만들고, 인공지능 기술을 통해
            비즈니스의 새로운 가능성을 발견합니다. 단순한 기술 제공을 넘어
            파트너의 성장을 함께 고민합니다.
          </p>
          <Link to="/about-detail">
            <button className="detail-btn">자세히 보기</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default About;
