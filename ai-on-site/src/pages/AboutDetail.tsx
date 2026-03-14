import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>혁신적인 AI 솔루션의 상세 이야기</h1>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
        저희는 기술을 넘어 파트너의 가치를 창출하는 데 집중합니다.<br/>
        이곳은 상세한 비전과 히스토리를 담는 공간입니다.
      </p>
      <button onClick={() => navigate(-1)} style={{ marginTop: '30px', padding: '10px 20px', cursor: 'pointer' }}>
        뒤로 가기
      </button>
    </div>
  );
};
export default AboutDetail;