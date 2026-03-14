import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 데이터", form);
 
  navigate("/welcome");
 };
  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={logo} className="signup-logo" alt="AI-ON 로고" />

        <h2 className="signup-title">회원가입</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="이름" onChange={handleChange} />

          <input
            name="email"
            type="email"
            placeholder="이메일"
            onChange={handleChange}
          />

          <input name="phone" placeholder="전화번호" onChange={handleChange} />

          <input
            name="organization"
            placeholder="소속"
            onChange={handleChange}
          />

          <input
            name="interest"
            placeholder="관심분야"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={handleChange}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleChange}
          />

          <button className="signup-button" type="submit">
            회원가입
          </button>
        </form>

        <div className="divider">
          <span>또는</span>
        </div>

        <button className="google-button">Google로 시작하기</button>

        <div className="signup-footer">이미 계정이 있으신가요? <Link to="/login">로그인</Link> </div>
      </div>
    </div>
  );
}
