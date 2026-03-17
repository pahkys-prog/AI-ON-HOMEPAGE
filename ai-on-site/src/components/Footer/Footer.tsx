import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-company">제주 AI ON 협동조합</h3>
            <p className="footer-desc">
              디지털 교육 · 교육용 서적 출판 · AI Art 전시 · 콘텐츠 제작
            </p>
          </div>

          <div className="footer-contact-grid">
            <div className="info-group">
              <p><strong>대표자</strong> 강수정</p>
              <p><strong>사업자등록번호</strong> 160-81-03287</p>
            </div>
            <div className="info-group">
              <p><strong>주소</strong> 제주특별자치도 제주시 관덕로 15길 23, 401호</p>
              <p><strong>Tel</strong> 010-9839-6655</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 JEJU AI ON. All rights reserved.
          </p>
          <div className="footer-links">
            {/* ✅ 가상 페이지로 연결되는 Link 컴포넌트 */}
            <Link to="/privacy">개인정보처리방침</Link>
            <span className="divider">|</span>
            <Link to="/terms">이용약관</Link>
            <span className="divider">|</span> 
            <Link to="/operating-policy">운영정책</Link>
            <span className="divider">|</span>           
          </div>
        </div>
      </div>
    </footer>
  );
}