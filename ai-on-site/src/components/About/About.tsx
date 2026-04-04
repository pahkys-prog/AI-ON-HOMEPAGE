import subLogo from '../../assets/images/subLogo4.png';
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* 왼쪽: 이미지 영역 */}
        <div className="about-image">
          <img src={subLogo} alt="Company Introduction subLogo" />
          <div className="subLogo"></div> {/* 디자인 포인트용 박스 */}
        </div>

        {/* 오른쪽: 텍스트 영역 */}
        <div className="about-text">
          <span className="sub-title">WHO WE ARE</span>
          <h2>
            배움을 활용으로 바꾸는 AI 교육
            <br />
            맞춤형 커리큘럼 개발
          </h2>
          <p>
            AI 도구 활용, 디지털 콘텐츠 제작, 실습형 프로젝트 수업을 중심으로
            대상과 목적에 맞는 교육 프로그램을 기획·운영합니다. 단순 체험이
            아닌, 교육 이후에도 실제 활용이 가능한 수준까지 연결하는 것을 목표로
            합니다.
          </p>

          <Link to="/about-detail">
            <button className="more-btn">더보기</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default About;
