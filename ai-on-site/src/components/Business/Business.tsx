import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Business.css';

const Business = () => {
  const location = useLocation();
  // 헤더에서 넘겨받은 tabIndex가 있으면 그 값을, 없으면 0(첫 번째 탭)을 사용합니다.
  const initialTab = location.state?.tabIndex ?? 0;
  
  const [activeTab, setActiveTab] = React.useState(initialTab);

  // 헤더 메뉴를 클릭해서 페이지 내에서 이동할 때를 대비해 useEffect 추가
  React.useEffect(() => {
    if (location.state?.tabIndex !== undefined) {
      setActiveTab(location.state.tabIndex);
    }
  }, [location.state]);

  const businessData = [
    {
      title: "AI 도구 활용 교육",
      subtitle: "실무와 일상에 바로 활용하는 생성형 AI",
      content: "이미지 생성, 텍스트 생성, AI 영상 제작 등 최신 도구를 활용하여 업무 효율을 높이는 실습 중심 교육을 제공합니다.",
      tags: ["ChatGPT", "Midjourney", "Vrew"],
      bookInfo: "AI 활용 가이드북 및 실습 워크북 자체 제작/제공",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" // AI 컨셉
    },
    {
      title: "디지털 콘텐츠 제작",
      subtitle: "눈을 사로잡는 나만의 콘텐츠 만들기",
      content: "SNS 홍보 콘텐츠, 숏폼 영상, 카드뉴스 등 기획부터 제작까지 직접 경험하며 결과물을 만들어내는 과정입니다.",
      tags: ["SNS 마케팅", "영상 편집", "캔바"],      
      bookInfo: "콘텐츠 제작 단계별 템플릿 및 가이드 교재 활용",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" // 작업실 컨셉    },
    },
    {
      title: "기관/대상 맞춤형 교육",
      subtitle: "학습자의 눈높이에 맞춘 체계적인 설계",
      content: "청소년, 시니어, 취약계층 등 대상의 특성에 맞춰 난이도를 조절하고, 실제 교육 만족도가 가장 높은 프로젝트형 수업을 운영합니다.",
      tags: ["공공기관", "학교", "맞춤형 교육"],
      bookInfo: "기관별 맞춤형 커리큘럼 기반 전용 워크북 출판 가능",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" // 교육 컨셉
    }
  ];

  return (
    <section className="business-section">
      <div className="business-header">
        <h1>Business Programs</h1>
        <p>교육부터 교재 출판까지, AI ON만의 원스톱 솔루션을 만나보세요.</p>
      </div>

      {/* 탭 버튼들 */}
      <div className="business-tabs">
        {businessData.map((item, index) => (
          <button 
            key={index} 
            className={`tab-btn ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* 상세 내용 카드 */}
      <div className="business-card-container">
        <div className="biz-info-side">
          <span className="biz-num">PROGRAM 0{activeTab + 1}</span>
          <h2>{businessData[activeTab].title}</h2>
          <h3>{businessData[activeTab].subtitle}</h3>
          
          <p className="biz-desc">{businessData[activeTab].content}</p>
          
          <div className="biz-book-box">
            📚 {businessData[activeTab].bookInfo}
          </div>

          <div className="biz-tags">
            {businessData[activeTab].tags.map(tag => <span key={tag}>#{tag}</span>)}
          </div>
        </div>

        <div className="biz-image-side">
          <img 
          src={businessData[activeTab].image} 
          alt={businessData[activeTab].title}
          className="biz-active-img"
          // 이미지가 없을 때를 대비한 처리
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x800?text=AI+ON+Curriculum';
          }}
        />
          <div className="img-mockup">
             <span>Special Curriculum</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;