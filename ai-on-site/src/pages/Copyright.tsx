import React from "react";
import "./Copyright.css";

const Copyright = () => {
  return (
    <div className="copyright-page-container">
      <div className="copyright-content-card">
        <h1 className="copyright-main-title">저작권 정책 및 콘텐츠 이용 안내</h1>
        <p className="copyright-intro">
          AI-ON(이하 '조합')은 창작자의 권리를 존중하며, 본 플랫폼을 통해 제공되는 모든 교육 자료와 작품을 보호하기 위해 최선을 다하고 있습니다.
        </p>

        <section className="copyright-section">
          <h3>1. 저작권의 귀속</h3>
          <ul>
            <li><strong>조합 소유:</strong> 홈페이지 내 텍스트, 로고, 디자인, 영상, 교육 커리큘럼 등에 대한 저작권은 AI-ON에 있습니다.</li>
            <li><strong>개인 소유:</strong> 개별 작품 및 연구 자료의 저작권은 원저작자에게 있으며, 조합은 게시 및 홍보 권한을 위임받아 운영합니다.</li>
          </ul>
        </section>

        <section className="copyright-section warning-box">
          <h3>2. 콘텐츠 이용 제한 (필독)</h3>
          <p>이용자는 다음의 행위를 엄격히 금하며, 위반 시 법적 조치가 취해질 수 있습니다.</p>
          <ul>
            <li>사전 서면 동의 없는 무단 복제, 전재, 배포 및 상업적 활용</li>
            <li>콘텐츠의 일부 또는 전부를 재가공하여 유료 강의나 판매에 사용하는 행위</li>
            <li>작품 이미지의 워터마크 제거, 변형 및 AI 학습 데이터로의 무단 활용</li>
          </ul>
        </section>

        <section className="copyright-section">
          <h3>3. 법적 대응 및 민형사상 책임</h3>
          <p>
            저작권법 제136조에 의거, 저작권을 침해한 자는 <strong>5년 이하의 징역 또는 5천만원 이하의 벌금</strong>에 처해질 수 있습니다. 
            조합은 무단 도용 사례 발견 시 민사상 손해배상 청구를 포함한 강력한 법적 대응을 원칙으로 합니다.
          </p>
        </section>

        <div className="copyright-contact-info">
          <p>콘텐츠 사용 및 협업 문의: <strong>echomuse78@gmail.com</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Copyright;