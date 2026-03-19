import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Contact.css';
// ContactForm.tsx (예시)
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const handleContactSubmit = async (formData) => {
  try {
    await addDoc(collection(db, "contacts"), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      createdAt: serverTimestamp(),
    });
    alert("문의사항이 접수되었습니다. 곧 연락드리겠습니다!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 1. 네비게이션 상태에 openContact가 true로 넘어왔는지 확인
    if (location.state?.openContact) {
      setIsOpen(true); // 폼을 자동으로 엽니다.

      // 2. 해당 섹션으로 부드럽게 스크롤 (아이디가 'contact'인 경우)
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      // 3. (선택사항) 상태를 한 번 소모했으므로 초기화하여 새로고침 시 계속 열리는 것 방지
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("문의가 정상적으로 접수되었습니다.");
  };

  return (
    <section id="contact" className="contact-section">
      {/* Q&A와 동일한 헤더 구조 */}
      <div className="contact-header">
        <button 
          className="contact-title-btn" 
          onClick={() => setIsOpen(!isOpen)}
        >
          Contact Us
        </button>
        <p className="contact-subtitle">클릭하시면 문의 양식이 열립니다.</p>
      </div>
      
      {/* 클릭해서 열렸을 때만 보이는 폼 */}
      {isOpen && (
  <div className="contact-container animate-fade-in">
    {/* 추가된 상단 안내 섹션 */}
    <div className="contact-info-header">
      <p>궁금하신 점이 있다면 언제든 문의해 주세요.</p>
      <div className="info-details">
        <span><strong>Email.</strong> echomuse78@gmail.com</span><br />
        <span><strong>Tel.</strong> 010-9839-6655
        </span><br />
        <span><strong>Time.</strong> 평일 09:00 ~ 18:00</span>
      </div>
    </div>

    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="기관명 또는 성함을 입력하세요" required />
      <input type="email" placeholder="답변받으실 이메일 주소를 입력하세요" required />
      <textarea 
        placeholder="문의하실 내용을 입력하세요 (교육 대상, 인원, 예상 일정 등)" 
        maxLength={1200}
      />
      
      <div className="contact-form-footer">
        <div className="contact-button-group">
          <button type="button" className="c-close-btn" onClick={() => setIsOpen(false)}>닫기</button>
          <button type="submit" className="c-submit-btn">문의 보내기</button>
        </div>
      </div>
    </form>
  </div>
)}
    </section>
  );
};

export default Contact;