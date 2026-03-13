// Header 부분 예시 코드
import React from 'react';
import { Link } from 'react-router-dom'; // 페이지 이동을 위해 필요
import logo from './assets/images/Logo-AION.png';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between', // 양 끝으로 배치
      alignItems: 'center',
      padding: '10px 50px',
      backgroundColor: '#f8f9fa'
    }}>
      {/* 왼쪽: 로고 */}
      <div className="logo">
        <img src={logo} alt="AI ON Logo" style={{ height: '40px' }} />
      </div>

      {/* 오른쪽: 버튼들 */}
      <nav style={{ display: 'flex', gap: '20px' }}>
        <button style={buttonStyle}>로그인</button>
        <Link to="/signup">
          <button style={signupButtonStyle}>회원가입</button>
        </Link>
      </nav>
    </header>
  );
};

const buttonStyle = { border: 'none', background: 'none', cursor: 'pointer' };
const signupButtonStyle = { ...buttonStyle, backgroundColor: '#4A6741', color: 'white', padding: '8px 16px', borderRadius: '4px' };

export default Header;