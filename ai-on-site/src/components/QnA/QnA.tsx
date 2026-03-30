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

  // Zustand 스토어에서 권한(role) 가져오기
  const { role } = useAuthStore();
  const isStaff = role === "admin" || role === "manager";

  // ✅ [수정] Q&A 창 열기 전 로그인 체크
  const handleToggleOpen = () => {
    if (!auth.currentUser) {
      alert("Q&A 이용을 위해 로그인이 필요합니다.");
      return;
    }
    setIsOpen(!isOpen);
  };

  // 실시간 질문 목록 불러오기
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

  // 질문 등록 함수
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

  // 관리자 답변 등록 함수
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
    <section className="qna-section layout-center">
      <div className="qna-header">
        <button className="qa-title-btn" onClick={handleToggleOpen}>
          Q&A
        </button>
        <p className="qa-subtitle">클릭하시면 문의 창과 목록이 열립니다.</p>
      </div>

      {isOpen && (
        <div className="qa-container animate-fade-in">
          {/* ✅ 로그인 된 경우에만 폼을 보여줌 */}
          {auth.currentUser ? (
            <form className="qa-form" onSubmit={handleSubmit}>
              <label htmlFor="question">질문</label>
              <input
                id="question"
                type="text"
                placeholder="질문 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                placeholder="질문 내용을 입력하세요 (최대 1200자)"
                maxLength={1200}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="form-footer">
                <div className="footer-left">
                  <label className="private-check">
                    <input
                      id="check"
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      aria-label="비밀글 여부 선택"
                    />{" "}
                    비밀글
                  </label>
                  {isPrivate && (
                    <input
                      type="password"
                      placeholder="비밀번호 4자리"
                      maxLength={4}
                      className="pwd-input"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      title="비밀번호 4자리 입력" // 👈 추가
                      aria-label="비밀번호 4자리" // 👈 추가
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
            </form>
          ) : (
            <div className="login-notice">로그인이 필요한 서비스입니다.</div>
          )}

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

                    {isStaff && !q.answer && (
                      <div
                        className="admin-controls"
                        style={{ marginTop: "10px" }}
                      >
                        <button
                          className="admin-reply-btn"
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
            <label htmlFor="pwd-check" style={{ display: "none" }}>
              비밀번호 입력
            </label>
            <input
              id="pwd-check"
              type="password"
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
