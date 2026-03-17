import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo-AION.png";
import "./Header.css";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="header-container">
      <div className="header-inner">
        <Link to="/">
          <img src={logo} className="logo" alt="AI-ON 로고" />
        </Link>
        <nav className="nav-menu">
          <Link to="/about" className="nav-item">
            About
          </Link>

          {/* 드롭다운을 가진 메뉴 */}
          <div className="nav-item-dropdown">
            <span className="nav-item">Business ▾</span>
            <div className="dropdown-content">
              <Link to="/business" state={{ tabIndex: 0 }}>AI 도구 활용</Link>
              <Link to="/business" state={{ tabIndex: 1 }}>디지털 콘텐츠 제작</Link>
              <Link to="/business" state={{ tabIndex: 2 }}>기관/대상 맞춤형교육</Link>
            </div>
          </div>

          <Link to="/gallery" className="nav-item">
            Gallery
          </Link>
          <Link to="/contact" className="nav-item">
            Contact
          </Link>
        </nav>
        <div className="header-buttons">
          {user ? (
            <>
              <span className="user-email">{user.email}</span>

              <button className="logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="Hlogin-btn">
                로그인
              </Link>

              <Link to="/signup" className="signup-btn">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
