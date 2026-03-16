import React from 'react';
import './Business.css';

const businessItems = [
  { title: "AI 콘텐츠 제작 교육", desc: "생성형 AI를 활용한 실무 교육 프로그램을 제공합니다.", icon: "🎓" },
  { title: "디지털 콘텐츠 제작", desc: "고품질 영상 및 그래픽 데이터를 전문적으로 제작합니다.", icon: "💻" },
  { title: "지역 협력 프로젝트", desc: "제주 지역 사회와 함께 성장하는 협력 모델을 만듭니다.", icon: "🤝" },
  { title: "창작자 네트워크 운영", desc: "다양한 분야의 창작자들이 모여 시너지를 내는 커뮤니티입니다.", icon: "🌐" }
];

const Business = () => {
  return (
    <section className="business-section">
      <h2 className="section-title">사업 내용</h2>
      <div className="business-grid">
        {businessItems.map((item, index) => (
          <div key={index} className="business-card">
            <div className="business-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Business;