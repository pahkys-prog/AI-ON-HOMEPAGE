import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {console.error(error); alert("로그인 실패");
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

        </form>

        <div className="divider">또는</div>

        <button className="google-btn">
          Google로 로그인
        </button>

        <p className="signup-link">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>

      </div>
    </div>
  );
}