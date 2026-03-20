console.log("🔥 내가 수정한 로그인 파일");
import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      alert("로그인 성공!");
      console.log(userCredential.user.email);
    } catch (error: any) {
      alert("로그인 실패: " + error.code);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("🔥 구글 로그인 클릭됨");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("구글 로그인 성공:", result.user.email);
      alert("구글 로그인 성공!");
    } catch (error: any) {
      console.error(error);
      alert("구글 로그인 실패: " + error.code);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("이메일을 입력하세요");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("비밀번호 재설정 이메일 전송됨");
    } catch (error: any) {
      alert("오류: " + error.code);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>로그인</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            로그인
          </button>

          <button className="reset-btn" onClick={handlePasswordReset}>
            비밀번호 재설정
          </button>
        </form>

        <div className="divider">
          <span>또는</span>
        </div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Google로 로그인
        </button>

        <p className="signup-link">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
