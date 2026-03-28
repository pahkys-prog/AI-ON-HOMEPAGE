import React, { useState, useEffect } from "react";
import "./QnA.css";
import { db } from "../../firebase"; // firebase.ts에서 db와 auth를 모두 가져옴
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuthStore } from "../../store/useAuthStore";

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
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [viewingId, setViewingId] = useState<string | null>(null);
  const [checkPwd, setCheckPwd] = useState("");

  // ✅ 1. Zustand 스토어에서 권한(role) 가져오기
  const { role } = useAuthStore();
  const isStaff = role === "admin" || role === "manager";

  // ✅ 2. 실시간 질문 목록 불러오기
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
          date:
            data.createdAt?.toDate().toLocaleDateString() ||
            new Date().toLocaleDateString(),
          answer: data.answer,
        });
      });
      setQuestions(qnaArray);
    });
    return () => unsubscribe();
  }, []);

  // ✅ 3. 질문 등록 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("제목과 내용을 입력해주세요.");
    if (isPrivate && password.length !== 4)
      return alert("비밀번호 4자리를 입력해주세요.");

    try {
      await addDoc(collection(db, "qna"), {
        title,
        content,
        isPrivate,
        password: isPrivate ? password : "",
        createdAt: serverTimestamp(),
        answer: "",
        status: "waiting",
      });
      setTitle("");
      setContent("");
      setIsPrivate(false);
      setPassword("");
      alert("질문이 안전하게 등록되었습니다!");
    } catch (error) {
      console.error("Firebase 저장 에러:", error);
    }
  };

  // ✅ 4. 관리자 답변 등록 함수
  const handleAdminReply = async (docId: string, replyText: string) => {
    try {
      const docRef = doc(db, "qna", docId);
      await updateDoc(docRef, {
        answer: replyText,
        status: "done",
      });
      alert("답변이 등록되었습니다!");
    } catch (error) {
      console.error("답변 등록 에러:", error);
    }
  };

  const handleItemClick = (q: Question) => {
    // ✅ 관리자/매니저라면 비밀글이라도 비밀번호 확인 없이 바로 볼 수 있게 배려
    if (isStaff) {
      alert(`[운영진 확인]\n제목: ${q.title}\n내용: ${q.content}`);
      return;
    }

    if (!q.isPrivate) {
      alert(`[내용]\n${q.content}`);
      return;
    }
    setViewingId(q.id);
  };

  const verifyPassword = () => {
    const target = questions.find((q) => q.id === viewingId);
    if (target?.password === checkPwd) {
      alert(`[비밀문의 내용]\n${target.content}`);
      setViewingId(null);
      setCheckPwd("");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  return (
    <section className="contact-section layout-center">
      <div className="contact-header">
        <button className="qa-title-btn" onClick={() => setIsOpen(!isOpen)}>
          Q&A
        </button>
        <p className="qa-subtitle">클릭하시면 문의 창과 목록이 열립니다.</p>
      </div>

      {isOpen && (
        <div className="qa-container animate-fade-in">
          <form className="qa-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="질문 제목을 입력하세요"
              aria-label="질문 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="질문 내용을 입력하세요 (최대 1200자)"
              aria-label="질문 내용"
              maxLength={1200}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="form-footer">
              <div className="footer-left">
                <label className="private-check">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                  />{" "}
                  비밀글
                </label>
                {isPrivate && (
                  <input
                    type="password"
                    placeholder="비밀번호 4자리"
                    aria-label="비밀글 비밀번호"
                    maxLength={4}
                    className="pwd-input"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                )}
              </div>
              <div className="button-group">
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  닫기
                </button>
                <button type="submit" className="submit-btn">
                  등록하기
                </button>
              </div>
            </div>
            <p className="helper-text">
              * 비밀글 선택 시 관리자와 작성자 본인만 열람 가능합니다.
            </p>
          </form>

          <div className="qa-list">
            <h3 className="list-title">최근 질문 목록</h3>
            {currentItems.length > 0 ? (
              <ul className="list-group">
                {currentItems.map((q) => (
                  <li key={q.id} className="list-item">
                    <div className="q-main" onClick={() => handleItemClick(q)}>
                      <div>
                        <span
                          className={`status-badge ${q.answer ? "done" : "waiting"}`}
                        >
                          {q.answer ? "답변완료" : "답변대기"}
                        </span>
                        <span className="q-title">
                          {q.isPrivate ? "🔒 비밀글입니다." : q.title}
                        </span>
                      </div>
                      <span className="q-date">{q.date}</span>
                    </div>

                    {/* ✅ 관리자이고 답변이 아직 없을 때만 버튼 표시 */}
                    {isStaff && !q.answer && (
                      <div
                        className="admin-controls"
                        style={{ marginTop: "10px" }}
                      >
                        <button
                          className="admin-reply-btn"
                          style={{
                            backgroundColor: "#5bb68c",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const reply = prompt("운영자 답변을 입력하세요:");
                            if (reply) handleAdminReply(q.id, reply);
                          }}
                        >
                          답변달기 ({role === "admin" ? "관리자" : "매니저"})
                        </button>
                      </div>
                    )}

                    {q.answer && (
                      <div
                        className="answer-preview"
                        style={{
                          marginTop: "10px",
                          background: "#f9f9f9",
                          padding: "10px",
                        }}
                      >
                        <p>ㄴ Re: {q.answer}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">등록된 질문이 없습니다.</p>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {viewingId && (
        <div className="modal-overlay">
          <div className="pwd-modal">
            <h4>비밀번호 확인</h4>
            <p>작성 시 설정한 숫자 4자리를 입력하세요.</p>
            <input
              type="password"
              aria-label="비밀번호 확인 입력"
              maxLength={4}
              value={checkPwd}
              onChange={(e) => setCheckPwd(e.target.value)}
              autoFocus
            />
            <div className="modal-btns">
              <button onClick={() => setViewingId(null)}>취소</button>
              <button className="confirm-btn" onClick={verifyPassword}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default QnA;
