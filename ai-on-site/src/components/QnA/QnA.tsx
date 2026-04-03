import React, { useState, useEffect } from "react";
import "./QnA.css";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuthStore } from "../../store/useAuthStore";
import { useModal } from '../../contexts/ModalContext';

interface Question {
  id: string;
  title: string;
  content: string;
  isPrivate: boolean;
  password?: string;
  date: string;
  answer?: string;
}

const QnA = () => {
  const { openModal, closeModal } = useModal();

  // --- 기존 State들 복구 ---
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [checkPwd, setCheckPwd] = useState("");
  const itemsPerPage = 10;

  const { role } = useAuthStore();
  const isStaff = role === "admin" || role === "manager";

  // --- 실시간 데이터 로직 ---
  useEffect(() => {
    const q = query(collection(db, "qna"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const qnaArray: Question[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        qnaArray.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          isPrivate: data.isPrivate,
          password: data.password,
          date: data.createdAt?.toDate().toLocaleDateString() || new Date().toLocaleDateString(),
          answer: data.answer,
        });
      });
      setQuestions(qnaArray);
    });
    return () => unsubscribe();
  }, []);

  // --- 핸들러 함수들 ---
  const handleToggleOpen = () => {
    if (!auth.currentUser) {
      alert("Q&A 이용을 위해 로그인이 필요합니다.");
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("제목과 내용을 입력해주세요.");
    if (isPrivate && password.length !== 4) return alert("비밀번호 4자리를 입력해주세요.");
    try {
      await addDoc(collection(db, "qna"), {
        title, content, isPrivate,
        password: isPrivate ? password : "",
        createdAt: serverTimestamp(),
        answer: "",
        status: "waiting",
      });
      setTitle(""); setContent(""); setIsPrivate(false); setPassword("");
      alert("질문이 등록되었습니다!");
    } catch (error) { console.error(error); }
  };

  // ✅ 핵심: 디자인을 유지하면서 모달 띄우기
  const handleItemClick = (q: Question) => {
    if (isStaff) {
      alert(`[운영진 확인]\n제목: ${q.title}\n내용: ${q.content}`);
      return;
    }
    if (!q.isPrivate) {
      alert(`[내용]\n${q.content}`); // 이것도 나중에 openModal로 바꿀 수 있어요!
      return;
    }

    // 비밀번호 확인 모달
    openModal({
      title: "🔒 비밀번호 확인",
      size: "small",
      content: (
        <div className="pwd-modal-content" >
          <p>비밀글입니다. 비밀번호 4자리를 입력하세요.</p>
          <input 
            type="password" 
            maxLength={4} 
            className="pwd-input" // 기존 CSS 활용
            onChange={(e) => setCheckPwd(e.target.value)} 
            autoFocus 
          />
          <div className="modal-btns" style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
            <button onClick={closeModal} className="close-btn">취소</button>
            <button className="submit-btn" onClick={() => {
              if(q.password === checkPwd) {
                closeModal();
                alert(`[내용]\n${q.content}`);
                setCheckPwd("");
              } else {
                alert("비밀번호가 틀렸습니다.");
              }
            }}>확인</button>
          </div>
        </div>
      )
    });
  };

  // 페이징 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  return (
    <section className="qna-section">
      <div className="qna-header">
        <button className="qa-title-btn" onClick={handleToggleOpen}>Q&A</button>
        <p className="qa-subtitle">클릭하시면 입력창과 목록이 열립니다.</p>
      </div>

      {isOpen && (
        <div className="qa-container animate-fade-in">
          {auth.currentUser ? (
            <form className="qa-form" onSubmit={handleSubmit}>
              <label htmlFor="question"></label>
              <input id="question" type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
              <label htmlFor="content"></label>
              <textarea id="content" placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
              <div className="form-footer">
                <div className="footer-left">
                  <label className="private-check">
                    <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} /> 비밀글
                  </label>
                  {isPrivate && (
                    <input type="password" placeholder="4자리" maxLength={4} className="pwd-input" value={password} onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, ""))} />
                  )}
                </div>
                <div className="button-group">
                  <button type="button" className="close-btn" onClick={() => setIsOpen(false)}>닫기</button>
                  <button type="submit" className="submit-btn">등록하기</button>
                </div>
              </div>
            </form>
          ) : (
            <div className="login-notice">로그인이 필요한 서비스입니다.</div>
          )}

          <div className="qa-list">
            <h3 className="list-title">최근 질문 목록</h3>
            <ul className="list-group">
              {currentItems.map((q) => (
                <li key={q.id} className="list-item">
                  <div className="q-main" onClick={() => handleItemClick(q)}>
                    <div>
                      <span className={`status-badge ${q.answer ? "done" : "waiting"}`}>
                        {q.answer ? "답변완료" : "답변대기"}
                      </span>
                      <span className="q-title">
                        {q.isPrivate ? "🔒 비밀글입니다." : q.title}
                      </span>
                    </div>
                    <span className="q-date">{q.date}</span>
                  </div>
                  {q.answer && (
                    <div className="answer-preview" style={{ marginTop: "10px", background: "#f9f9f9", padding: "10px" }}>
                      <p>ㄴ Re: {q.answer}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default QnA;