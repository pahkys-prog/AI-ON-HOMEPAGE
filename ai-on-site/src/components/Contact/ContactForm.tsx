import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) return alert("성함과 내용을 입력해주세요.");

    try {
      // ✅ 'contacts'라는 새로운 컬렉션에 저장됩니다.
      await addDoc(collection(db, "contacts"), {
        name,
        phone,
        message,
        createdAt: serverTimestamp(),
        status: "waiting", // 'waiting' 또는 'done'으로 관리 가능
      });

      alert("문의가 성공적으로 접수되었습니다!");
      setName("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Contact 저장 에러:", error);
      alert("접수에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input 
        type="text" 
        placeholder="성함" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
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
      />
      <button type="submit">문의하기</button>
    </form>
  );
};

export default ContactForm;