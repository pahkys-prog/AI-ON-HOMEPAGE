import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
// ✅ Firebase 설정 임포트 확인 (googleProvider 포함)
import { auth, db, googleProvider } from "../firebase"; 
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import logo from "../assets/images/Logo-AION.png";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    interest: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ 1. 이메일 회원가입 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 1) Firebase Auth 계정 생성 (앞뒤 공백 제거)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password.trim()
      );
      const user = userCredential.user;

      // 2) Firestore 'users' 컬렉션에 추가 정보 저장
      // 이 정보들이 저장되어야 나중에 관리자 페이지에서 회원 관리가 가능합니다.
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: form.name,
        email: form.email.trim(),
        phone: form.phone,
        organization: form.organization,
        interest: form.interest,
        role: "user", // 기본 권한
        createdAt: serverTimestamp(),
      });

      console.log("회원가입 및 데이터 저장 완료");
      alert("AI-ON 회원가입을 축하드립니다!");
      navigate("/welcome");
      
    } catch (error: unknown) {
      console.error("회원가입 에러:", error);
      if ((error as { code?: string }).code === "auth/email-already-in-use") {
        alert("이미 사용 중인 이메일입니다.");
      } else if ((error as { code?: string }).code === "auth/weak-password") {
        alert("비밀번호는 6자리 이상이어야 합니다.");
      } else {
        alert("회원가입에 실패했습니다: " + (error as { message?: string }).message);
      }
    }
  };

  // ✅ 2. 구글 회원가입/로그인 핸들러
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 구글 로그인 시에도 최소한의 유저 정보를 Firestore에 생성/업데이트합니다.
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        role: "user",
        createdAt: serverTimestamp(),
      }, { merge: true });

      alert(`${user.displayName}님, 환영합니다!`);
      navigate("/welcome");
    } catch (error: unknown) {
      console.error("구글 가입 에러:", error);
      if ((error as { code?: string }).code !== "auth/cancelled-popup-request") {
        alert("구글 연동 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={logo} className="signup-logo" alt="AI-ON 로고" />

        <h2 className="signup-title">회원가입</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* ✅ 각 input에 value와 required 속성을 추가하여 안정성을 높였습니다. */}
          <input 
            name="name" 
            placeholder="이름" 
            value={form.name}
            onChange={handleChange} 
            required 
          />

          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input 
            name="phone" 
            placeholder="전화번호" 
            value={form.phone}
            onChange={handleChange} 
          />

          <input
            name="organization"
            placeholder="소속"
            value={form.organization}
            onChange={handleChange}
          />

          <input
            name="interest"
            placeholder="관심분야"
            value={form.interest}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button className="signup-button" type="submit">
            회원가입
          </button>
        </form>

        <div className="divider">
          <span>또는</span>
        </div>

        {/* ✅ 구글 버튼에 클릭 이벤트 연결 */}
        <button 
          className="google-button" 
          type="button" 
          onClick={handleGoogleSignup}
        >
          Google로 시작하기
        </button>

        <div className="signup-footer">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
}