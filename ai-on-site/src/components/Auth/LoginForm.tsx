import React, { useState } from "react";
import { auth } from "../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  // 유실되었던 상태(State) 추가
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 핸들러 로직
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인에 실패:please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;