import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import ContactForm from "./ContactForm";

const Contact = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(location.state?.openContact || false);

  useEffect(() => {
    if (location.state?.openContact) {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  // ✅ 로그인이 안 된 경우 로그인 페이지로 이동시키는 헬퍼 함수
  const handleLoginRedirect = () => {
    if (!user) {
      alert("문의 등록을 위해 로그인이 필요합니다.");
      navigate("/login");
      return true;
    }
    return false;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <button
          className="contact-title-btn"
          onClick={() => {
            // ✅ [변경] 이제 로그인 체크 없이 누구나 창을 열 수 있습니다.
            setIsOpen(!isOpen);
          }}
        >
          Contact Us
        </button>
        <p className="contact-subtitle">클릭하시면 문의 양식이 열립니다.</p>
      </div>

      {isOpen && (
        <div className="contact-container animate-fade-in">
          <div className="contact-info-header">
            <p>궁금하신 점이 있다면 언제든 문의해 주세요.</p>
            <div className="info-details">
              <span><strong>Email.</strong> echomuse78@gmail.com</span><br />
              <span><strong>Tel.</strong> 010-9839-6655</span><br />
              <span><strong>Time.</strong> 평일 09:00 ~ 18:00</span>
            </div>
          </div>

          {/* ✅ [변경] 비로그인 유저가 폼을 클릭하면 로그인을 유도하도록 래퍼 추가 가능 */}
          <div onClick={() => !user && handleLoginRedirect()}
               style={{ cursor: !user ? "pointer" : "default" }}>
            <ContactForm 
              id="contact-form-element" 
            />
          </div>

          <div className="contact-form-footer">
            <div className="contact-button-group">
              <button
                type="button"
                className="c-close-btn"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </button>

              {/* ✅ [변경] 버튼을 활성화해두되, 클릭 시 로그인 여부를 체크합니다. */}
              <button
                type="button" // submit 대신 button으로 바꾸고 로직 제어
                className="c-submit-btn"
                onClick={() => {
                  if (!handleLoginRedirect()) {
                    // 로그인 된 상태라면 폼 제출 실행
                    const form = document.getElementById("contact-form-element") as HTMLFormElement;
                    form?.requestSubmit(); 
                  }
                }}
              >
                {user ? "문의 보내기" : "로그인 후 보내기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;