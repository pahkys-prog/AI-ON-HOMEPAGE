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
      navigate("/");
    } catch (error: unknown) {
      alert("로그인 실패: " + (error as { code: string }).code);
    }
  };

  const handleGoogleLogin = async () => {
      try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("구글 로그인 성공:", result.user.email);
      alert("Google 로그인 성공!");
      navigate("/");
    } catch (error: unknown) {
      console.error(error);
      alert("구글 로그인 실패: " + (error as { code: string }).code);
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
    } catch (error: unknown) {
      alert("오류: " + (error as { code: string }).code);
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

        <div className="divider">
          <span>또는</span>
        </div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Google로 로그인
        </button>
        </form>
        <p className="signup-link">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
