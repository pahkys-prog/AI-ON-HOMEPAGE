import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Terms.module.css';


const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 style={{ marginBottom: '40px', borderBottom: '2px solid #5bb68c', paddingBottom: '10px' }}>
        이용약관
      </h1>

      <div style={{ lineHeight: '1.8', color: '#444' }}>
        <p>본 약관은 제주 AI ON 협동조합(이하 “협동조합”)이 제공하는 서비스의 이용과 관련하여 협동조합과 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.</p>

        <h3 style={{ marginTop: '30px' }}>제1조 (목적)</h3>
        <p>이 약관은 협동조합이 운영하는 웹사이트 및 관련 서비스의 이용 조건 및 절차를 규정합니다.</p>

        <h3 style={{ marginTop: '30px' }}>제2조 (서비스 내용)</h3>
        <p>협동조합은 디지털 교육 프로그램, 교육용 서적 및 콘텐츠 소개, AI Art 전시 안내 등의 서비스를 제공합니다.</p>

        <h3 style={{ marginTop: '30px' }}>제3조 (회원가입)</h3>
        <p>이용자가 약관에 동의하고 필요한 정보를 입력하여 신청하면 협동조합의 승인을 거쳐 가입이 완료됩니다.</p>

        <h3 style={{ marginTop: '30px' }}>제4조 (회원의 의무)</h3>
        <p>회원은 타인의 정보 도용, 서비스 운영 방해, 불법적 콘텐츠 게시 등을 해서는 안 됩니다.</p>

        <h3 style={{ marginTop: '30px' }}>제5조 (지적재산권)</h3>
        <p>웹사이트에 게시된 모든 콘텐츠의 저작권은 협동조합 또는 저작권자에게 있습니다.</p>

        <h3 style={{ marginTop: '30px' }}>제6조 (면책 조항)</h3>
        <p>협동조합은 이용자의 귀책 사유로 발생한 문제나 천재지변 등 불가항력적 상황에 대해서는 책임을 지지 않습니다.</p>
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

export default Terms;