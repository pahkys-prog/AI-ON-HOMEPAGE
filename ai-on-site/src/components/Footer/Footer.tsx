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
             인공지능과 예술의 융합을 통한 미래 가치 창출
            </p>
          </div>

          <div className="footer-contact-grid">
            <div className="info-group">
              <p>
                <strong>대표</strong> 강수정
              </p>
              <p>
                <strong>사업자등록번호</strong> 160-81-03287
              </p>
            </div>
            <div className="info-group">
              <p>
                <strong>주소</strong> 제주특별자치도 제주시 관덕로 15길 23,
                401호
              </p>
              <p>
                <strong>Tel</strong> 010-9839-6655
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            본 사이트의 모든 교육 자료 및 콘텐츠는 저작권법의 보호를 받으며, 무단 복제 및 전재를 금합니다.<br />© 2026 JEJU AI ON. All rights reserved.</p>
          <div className="footer-links">
            {/* ✅ 가상 페이지로 연결되는 Link 컴포넌트 */}
            <Link to="/privacy">개인정보처리방침</Link>
            <span className="divider">|</span>
            <Link to="/terms">이용약관</Link>
            <span className="divider">|</span>
            <Link to="/copyright">저작권 정책</Link>
            <span className="divider">|</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
