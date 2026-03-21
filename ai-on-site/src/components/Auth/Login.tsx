import React, { useState } from "react";
import { auth } from "../../firebase";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // 로그인 후 이동을 위해 필요

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 📧 이메일 로그인 함수
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공!");
      navigate("/"); // 로그인 후 메인으로 이동
    } catch (error: any) {
      alert("로그인 실패: 정보를 확인하세요.");
    }
  };

  // 🌐 구글 로그인 함수
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("구글 로그인 성공!");
      navigate("/"); // 로그인 후 메인으로 이동
    } catch (error: any) {
      alert("구글 로그인 실패");
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '10px' }}>
       
      {/* 이메일 폼 */}
      <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" 
          placeholder="이메일" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#1841f7', color: 'white', border: 'none', cursor: 'pointer' }}>
          로그인
        </button>
      </form>

      <div style={{ margin: '20px 0', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <button 
          onClick={handleGoogleLogin}
          style={{ width: '100%', padding: '10px', backgroundColor: '#ecf2fa', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Google로 계속하기
        </button>
      </div>
    </div>
  );
};

export default Login;