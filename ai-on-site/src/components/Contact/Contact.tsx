import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Contact.css";

// ✅ 실제 사용할 ContactForm import
import ContactForm from "./ContactForm";

const Contact = () => {
  const location = useLocation();

  // 1. 초기값 설정 (ESLint 경고 해결을 위해 선언부에서 바로 체크)
  const [isOpen, setIsOpen] = useState(location.state?.openContact || false);

  useEffect(() => {
    // 2. 스크롤 이동 로직
    if (location.state?.openContact) {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <button
          className="contact-title-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          Contact Us
        </button>
        <p className="contact-subtitle">클릭하시면 문의 양식이 열립니다.</p>
      </div>

      {isOpen && (
        <div className="contact-container animate-fade-in">
          {/* 상단 안내 */}
          <div className="contact-info-header">
            <p>궁금하신 점이 있다면 언제든 문의해 주세요.</p>
            <div className="info-details">
              <span>
                <strong>Email.</strong> echomuse78@gmail.com
              </span>
              <br />
              <span>
                <strong>Tel.</strong> 010-9839-6655
              </span>
              <br />
              <span>
                <strong>Time.</strong> 평일 09:00 ~ 18:00
              </span>
            </div>
          </div>

          {/* ✅ 핵심: 실제 Firebase 저장은 이 ContactForm 내부에서 handleSubmit이 처리해야 합니다. */}
          {/* 하단의 '문의 보내기' 버튼이 form 바깥에 있다면, form에 id를 주고 연결해야 합니다. */}
          <ContactForm id="contact-form-element" />

          <div className="contact-form-footer">
            <div className="contact-button-group">
              <button
                type="button"
                className="c-close-btn"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </button>
              {/* ✅ form 외부의 버튼이 제출을 수행하려면 form의 id와 연결(form="...")해야 합니다. */}
              <button 
                type="submit" 
                form="contact-form-element" 
                className="c-submit-btn"
              >
                문의 보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;