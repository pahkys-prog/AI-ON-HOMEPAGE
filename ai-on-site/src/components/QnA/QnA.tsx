import React, { useState } from "react";
import "./QnA.css";

interface Question {
  id: number;
  title: string;
  content: string;
  isPrivate: boolean;
  password?: string;
  date: string;
}

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 비밀번호 확인용 상태
  const [viewingId, setViewingId] = useState<number | null>(null);
  const [checkPwd, setCheckPwd] = useState("");

  // 질문 등록
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("제목과 내용을 입력해주세요.");
    if (isPrivate && password.length !== 4)
      return alert("비밀번호 4자리를 입력해주세요.");

    const newQuestion = {
      id: Date.now(),
      title,
      content,
      isPrivate,
      date: new Date().toLocaleDateString(),
    };

    // ✅ 이전 리스트(prev)를 가져와서 그 앞에 새 질문을 추가합니다.
    setQuestions((prev) => [newQuestion, ...prev]);

    setTitle("");
    setContent("");
    setIsPrivate(false);
    alert("질문이 등록되었습니다.");
  };

  const handleItemClick = (q: Question) => {
    if (!q.isPrivate) {
      alert(`[내용]\n${q.content}`); // 공개글은 바로 보여줌
      return;
    }
    setViewingId(q.id); // 비밀글이면 확인 모달 띄우기
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

  const handleClose = () => {
    setTitle("");
    setContent("");
    setIsPrivate(false);
    setPassword("");
    setIsOpen(false);
  };

  // 페이지네이션 로직
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

      {/* ✅ isOpen이 true일 때만 입력창과 목록이 모두 나타남 */}
      {isOpen && (
        <div className="qa-container animate-fade-in">
          {/* 1. 입력 폼 */}
          <form className="qa-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="질문 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="질문 내용을 입력하세요 (최대 1200자)"
              maxLength={1200}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="form-footer">
              <label className="private-check">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />{" "}
                비밀글
              </label>
              <p className="helper-text">
                * 비밀글 선택 시 관리자와 작성자 본인만 열람 가능합니다. 답변
                여부는 사이트 내에서 직접 확인 부탁드립니다.
              </p>
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
                />
              )}

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

          {/* 2. 질문 목록 */}
          <div className="qa-list">
            <h3 className="list-title">최근 질문 목록</h3>
            {currentItems.length > 0 ? (
              <ul className="list-group">
                {currentItems.map((q) => (
                  <li key={q.id} className="list-item">
                    <span className="q-title">
                      {q.isPrivate ? "🔒 비밀글입니다." : q.title}
                    </span>
                    <span className="q-date">{q.date}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">등록된 질문이 없습니다.</p>
            )}

            <div className="qna-item">
              <div className="question">
                {/* ✅ 답변 상태 표시 */}
                <span
                  className={`status-badge ${item.answer ? "done" : "waiting"}`}
                >
                  {item.answer ? "답변완료" : "답변대기"}
                </span>
                {item.title}
              </div>

              {/* ✅ 답변이 있을 때만 노출 */}
              {item.answer && (
                <div className="answer-box">
                  <p className="answer-content">ㄴ Re: {item.answer}</p>
                </div>
              )}
            </div>

            {/* ✅ 비밀번호 확인 모달 (viewingId가 있을 때만 표시) */}
            {viewingId && (
              <div className="modal-overlay">
                <div className="pwd-modal">
                  <h4>비밀번호 확인</h4>
                  <p>작성 시 설정한 숫자 4자리를 입력하세요.</p>
                  <input
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

            {/* 페이지네이션 */}
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
    </section>
  );
};

export default Contact;
