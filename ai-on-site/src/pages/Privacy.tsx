import { useNavigate } from 'react-router-dom';
import styles from './Privacy.module.css';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 style={{ marginBottom: '40px', borderBottom: '2px solid #5bb68c', paddingBottom: '10px' }}>
        개인정보처리방침
      </h1>
      
      <div style={{ lineHeight: '1.8', color: '#444' }}>
        <p>
          <strong>제주 AI ON 협동조합</strong>(이하 “협동조합”)은 이용자의 개인정보를 중요하게 생각하며, 
          「개인정보 보호법」 등 관련 법령을 준수합니다. 협동조합은 개인정보처리방침을 통해 이용자가 
          제공한 개인정보가 어떤 용도와 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떤 조치가 취해지고 있는지 알려드립니다.
        </p>

        <h3 style={{ marginTop: '30px' }}>1. 수집하는 개인정보 항목</h3>
        <p>협동조합은 다음과 같은 개인정보를 수집할 수 있습니다.</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>회원가입 시: 이름, 이메일 주소, 관심 분야, 가입일</li>
          <li>서비스 이용 과정에서 자동 수집: IP 주소, 브라우저 정보, 방문 기록</li>
        </ul>

        <h3 style={{ marginTop: '30px' }}>2. 개인정보 수집 및 이용 목적</h3>
        <p>협동조합은 회원 관리, 교육 프로그램 안내, 전시 및 행사 안내, 서비스 개선 및 고객 지원을 위해 개인정보를 이용합니다.</p>

        <h3 style={{ marginTop: '30px' }}>3. 개인정보 보유 및 이용 기간</h3>
        <p>개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다. 단, 서비스 악용 방지를 위해 회원 탈퇴 후 1년 동안 보관할 수 있습니다.</p>

        <h3 style={{ marginTop: '30px' }}>4. 개인정보 제3자 제공</h3>
        <p>협동조합은 이용자의 사전 동의 없이 원칙적으로 개인정보를 외부에 제공하지 않습니다.</p>

        <h3 style={{ marginTop: '30px' }}>5. 개인정보 처리 위탁</h3>
        <p>서비스 운영을 위해 Firebase(회원 인증) 및 웹 호스팅 서비스 등에 일부 업무를 위탁할 수 있습니다.</p>

        <h3 style={{ marginTop: '30px' }}>6. 이용자의 권리</h3>
        <p>이용자는 언제든지 개인정보 조회, 수정, 삭제 및 회원 탈퇴를 요청할 수 있습니다.</p>

        <h3 style={{ marginTop: '30px' }}>7. 개인정보 보호책임자</h3>
        <p>기관명: 제주 AI ON 협동조합 | 연락처: 010-9839-6655</p>
      </div>

      <button 
        onClick={() => navigate(-1)} 
        style={{ marginTop: '50px', padding: '10px 25px', backgroundColor: '#5bb68c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        이전으로
      </button>
    </div>
  );
};

export default Privacy;