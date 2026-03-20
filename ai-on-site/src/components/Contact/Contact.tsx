import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Contact.css";

// ✅ 실제 사용할 ContactForm import
import ContactForm from "./ContactForm";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openContact) {
      setIsOpen(true);

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }

      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

          {/* ✅ 여기서 실제 ContactForm 사용 */}
          <ContactForm />

          <div className="contact-form-footer">
            <div className="contact-button-group">
              <button
                type="button"
                className="c-close-btn"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </button>
              <button type="submit" className="c-submit-btn">
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
