import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import welcomeImage from "../assets/images/welcome.png";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <img src={welcomeImage} className="welcome-image" alt="환영을 알리는 풍선" />
      <h2 className="page-title">회원 가입을 환영합니다!!</h2>
    </div>
  );
}