import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutDetail.css';

const AboutDetail = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    // 메인 페이지의 contact 섹션으로 이동하면서 openContact 상태 전달
    navigate('/#contact', { state: { openContact: true } });
  };

  return (
    <div className="about-page layout-center">
      {/* 1. 헤드라인 섹션 */}
      <header className="about-header">
        <p className="sub-title">AI·디지털 교육의 파트너</p>
        <h1 className="main-headline">
          기관과 현장에서 바로 활용 가능한 <br />
          <span>AI·디지털 교육</span>을 제공합니다.
        </h1>
      </header>

      {/* 2. 교육 철학 (우리는 이런 교육을 합니다) */}
      <section className="about-intro">
        <div className="intro-card">
          <p>
            AI 도구 활용, 디지털 콘텐츠 제작, 실습형 프로젝트 수업을 중심으로 <br />
            <strong>대상과 목적에 맞는 교육 프로그램을 기획·운영합니다.</strong>
          </p>
          <p className="intro-focus">
            단순 체험이 아닌, <br />
            <span>교육 이후에도 실제 활용이 가능한 수준</span>까지 연결하는 것을 목표로 합니다.
          </p>
        </div>
      </section>

      {/* 3. 주요 교육 분야 (Grid 레이아웃) */}
      <section className="about-section">
        <h2 className="section-title">주요 교육 분야</h2>
        <div className="category-grid">
          <div className="category-item">
            <span className="num">01</span>
            <h3>AI 도구 활용 교육</h3>
            <p>이미지·텍스트 생성, 영상 제작 등 실무와 일상에 바로 활용 가능한 AI 교육</p>
          </div>
          <div className="category-item">
            <span className="num">02</span>
            <h3>디지털 콘텐츠 제작</h3>
            <p>SNS, 홍보 콘텐츠 등 직접 만들어보는 실습 중심 교육</p>
          </div>
          <div className="category-item">
            <span className="num">03</span>
            <h3>대상 맞춤형 교육</h3>
            <p>청소년부터 시니어까지 대상별 난이도와 방식 설계</p>
          </div>
          <div className="category-item">
            <span className="num">04</span>
            <h3>프로젝트형 교육</h3>
            <p>결과물(영상, 발표 등)을 직접 만들어내어 만족도가 높은 교육</p>
          </div>
        </div>
      </section>

      {/* 4. 적합한 대상 (문의 유도의 핵심 ⭐) */}
      <section className="about-section target-section">
        <h2 className="section-title">이런 곳에 적합합니다</h2>
        <ul className="target-list">
          <li>🏢 <strong>공공기관 및 평생교육</strong> 프로그램</li>
          <li>🏫 <strong>학교 및 청소년</strong> 교육 현장</li>
          <li>📍 <strong>지역 주민</strong> 대상 디지털 역량 강화</li>
          <li>🤝 <strong>취약계층</strong> 디지털 격차 해소 교육</li>
          <li>💰 <strong>소상공인·창업자</strong> 콘텐츠 활용 교육</li>
        </ul>
      </section>

      {/* 5. 실제 진행 방식 (Step 구조) */}
      <section className="about-section">
        <h2 className="section-title">진행 방식</h2>
        <div className="step-container">
          <div className="step"><span>1</span><p>사전 협의 및 목적 설정</p></div>
          <div className="step"><span>2</span><p>맞춤형 커리큘럼 설계</p></div>
          <div className="step"><span>3</span><p>실습 중심 교육 진행</p></div>
          <div className="step"><span>4</span><p>결과물 기반 피드백</p></div>
        </div>
      </section>

      {/* 6. 문의 유도 (CTA) */}
      <footer className="about-footer">
        <div className="cta-box">
          <h3>교육 문의 및 협업 제안</h3>
          <p>기관/대상/일정에 맞춰 최적의 프로그램을 제안드립니다.</p>
          <button className="cta-button" onClick={handleContactClick}>
            상담 신청하기
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AboutDetail;