import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">

        <h3 className="footer-company">
          제주 AI ON 협동조합
        </h3>

        <p className="footer-desc">
          디지털 교육 · 교육용 서적 출판 · AI Art 전시 · 콘텐츠 제작
        </p>

        <p className="footer-info">
          대표자: 강수정 | 사업자등록번호: 160-81-03287
        </p>

        <p className="footer-address">
          제주특별자치도 제주시 관덕로 15길 23, 401호 (일도일동)
        </p>

        <p className="footer-phone">
          Tel. 010-9839-6655
        </p>

        <div className="footer-links">
          <a href="/privacy">개인정보처리방침</a>
          <span>|</span>
          <a href="/terms">이용약관</a>
          <span>|</span>
          <a href="mailto:contact@aion.com">이메일 문의</a>
        </div>

        <p className="footer-copy">
          © 2026 제주 AI ON 협동조합. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
