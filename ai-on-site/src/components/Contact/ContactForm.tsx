import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ✅ 1. 부모로부터 id를 전달받기 위한 인터페이스 정의 (TS 에러 해결)
interface ContactFormProps {
  id?: string;
}

const ContactForm = ({ id }: ContactFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) {
      alert("성함과 내용을 입력해주세요.");
      return;
    }

    try {
      console.log("🔥 submit 실행됨");
      
      // ✅ Firestore 'contacts' 컬렉션에 데이터 저장
      await addDoc(collection(db, "contacts"), {
        name,
        phone,
        message,
        createdAt: serverTimestamp(),
        status: "waiting", 
      });

      console.log("🔥 Contact 저장 완료");
      console.log("🔥 저장된 데이터:", { name, phone, message });

      alert("문의가 성공적으로 접수되었습니다!");
      
      // 입력창 초기화
      setName("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Contact 저장 에러:", error);
      alert("접수에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    // ✅ 2. 부모가 넘겨준 id를 여기에 적용 (form="contact-form-element"와 연결됨)
    <form id={id} onSubmit={handleSubmit} className="contact-form">
      <input 
        type="text" 
        placeholder="성함" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required
      />
      <input 
        type="text" 
        placeholder="연락처" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <textarea 
        placeholder="문의하실 내용을 적어주세요" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
        required
      />
    </form>
  );
};

export default ContactForm;