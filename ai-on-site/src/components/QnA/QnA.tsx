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
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 추가

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
  const navigate = useNavigate(); // 로그인 페이지 이동용
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

  const { role } = useAuthStore();
  const isStaff = role === "admin" || role === "manager";

  // ✅ [변경] 이제 로그인 체크 없이 누구나 Q&A 목록을 열 수 있습니다.
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // --- 데이터 로딩 및 답변 등록 로직 (기존과 동일) ---
  useEffect(() => {
    const q = query(collection(db, "qna"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const qnaArray: Question[] = [];
      
      querySnapshot.forEach((docSnap) => { // 여기 변수명을 docSnap으로 확인!
        const data = docSnap.data();
        
        qnaArray.push({
          id: docSnap.id, // 이제 에러 없이 docSnap.id를 찾을 수 있습니다.
          title: data.title || "",
          content: data.content || "",
          isPrivate: data.isPrivate ?? false,
          password: data.password || "",
          answer: data.answer || "",
          date: data.createdAt?.toDate().toLocaleDateString() || new Date().toLocaleDateString(),
        });
      });
      
      setQuestions(qnaArray);
    });
    return () => unsubscribe();
  }, []);

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
      alert("질문이 안전하게 등록되었습니다!");
    } catch (error) { console.error(error); }
  };

  const handleAdminReply = async (docId: string, replyText: string) => {
    try {
      await updateDoc(doc(db, "qna", docId), { answer: replyText, status: "done" });
      alert("답변이 등록되었습니다!");
    } catch (error) { console.error(error); }
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  return (
    <section className="qna-section">
      <div className="qna-header">
        <button className="qa-title-btn" onClick={handleToggleOpen}>Q&A</button>
        <p className="qa-subtitle">클릭하시면 질문을 확인할 수 있습니다.</p>
      </div>

      {isOpen && (
        <div className="qa-container animate-fade-in">
          {/* ✅ [변경] 로그인 상태에 따른 상단 영역 조건부 렌더링 */}
          {auth.currentUser ? (
            <form className="qa-form" onSubmit={handleSubmit}>
             
              <input aria-label="질문제목" type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
          
              <textarea aria-label="상세 내용" placeholder="내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} />
              <div className="form-footer">
                <div className="footer-left">
                  <label><input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} /> 비밀글</label>
                  {isPrivate && <input type="password" placeholder="4자리" maxLength={4} value={password} onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, ""))} />}
                </div>
                <div className="button-group">
                  <button type="button" className="close-btn" onClick={() => setIsOpen(false)}>닫기</button>
                  <button type="submit" className="submit-btn">등록하기</button>
                </div>
              </div>
            </form>
          ) : (
            /* ✅ 비로그인 유저에게 보여줄 로그인 유도 카드 */
            <div className="login-prompt-card" style={{ 
              padding: '30px', textAlign: 'center', background: '#fdfdfd', 
              border: '1px dashed #5bb68c', borderRadius: '12px', marginBottom: '30px' 
            }}>
              <p style={{ color: '#555', marginBottom: '15px', fontWeight: '500' }}>
                궁금한 점이 있으신가요? <br/>
                <span style={{ fontSize: '0.9rem', color: '#888' }}>로그인하시면 바로 질문을 남기실 수 있습니다.</span>
              </p>
              <button 
                className="submit-btn" 
                onClick={() => navigate("/login")} // 로그인 페이지 경로에 맞게 수정하세요
                style={{ padding: '10px 25px' }}
              >
                로그인하러 가기
              </button>
            </div>
          )}

          <div className="qa-list">
            <h3 className="list-title">최근 질문 목록</h3>
            <ul className="list-group">
              {currentItems.map((q) => (
                <li key={q.id} className="list-item">
                  <div className="q-main" onClick={() => handleItemClick(q)}>
                    <div>
                      <span className={`status-badge ${q.answer ? "done" : "waiting"}`}>{q.answer ? "답변완료" : "답변대기"}</span>
                      <span className="q-title">{q.isPrivate ? "🔒 비밀글입니다." : q.title}</span>
                    </div>
                    <span className="q-date">{q.date}</span>
                  </div>

                  {isStaff && !q.answer && (
                    <button className="admin-reply-btn" onClick={(e) => {
                      e.stopPropagation();
                      const reply = prompt("답변 입력:");
                      if (reply) handleAdminReply(q.id, reply);
                    }}>답변달기</button>
                  )}

                  {/* ✅ 중복 없는 깔끔한 답변 출력 로직 */}
                  {q.answer && (
                    <div className="answer-preview" style={{ marginTop: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "4px" }}>
                      {(isStaff || !q.isPrivate) ? (
                        <p style={{ margin: 0, color: "#333" }}>ㄴ Re: {q.answer}</p>
                      ) : (
                        <p style={{ margin: 0, color: "#999", fontSize: "0.85rem" }}>
                          ㄴ 🔒 비밀 답변입니다. (클릭하여 본인 확인 후 확인 가능)
                        </p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i+1} onClick={() => setCurrentPage(i+1)} className={currentPage === i+1 ? "active" : ""}>{i+1}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 비밀번호 확인 모달 (기존과 동일) */}
      {viewingId && (
        <div className="modal-overlay">
          <div className="pwd-modal">
            <h4>🔒 비밀번호 확인</h4>
            <input type="password" maxLength={4} value={checkPwd} onChange={(e) => setCheckPwd(e.target.value)} autoFocus />
            <div className="modal-btns">
              <button onClick={() => { setViewingId(null); setCheckPwd(""); }}>취소</button>
              <button className="confirm-btn" onClick={() => {
                const target = questions.find((q) => q.id === viewingId);
                if (target?.password === checkPwd) {
                  alert(`[내용]\n${target.content}\n\n[답변]\n${target.answer || "아직 답변이 없습니다."}`);
                  setViewingId(null); setCheckPwd("");
                } else { alert("비밀번호 불일치"); }
              }}>확인</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default QnA;