import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <h2 className="section-title">문의하기</h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item"><strong>Email</strong> <span>example@email.com</span></div>
          <div className="info-item"><strong>전화</strong> <span>010-0000-0000</span></div>
          <div className="info-item"><strong>주소</strong> <span>제주특별자치도 제주시 관덕로 15길 23 401호</span></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;