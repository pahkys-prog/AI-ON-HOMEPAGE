function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">AI ON</h1>

        <ul className="menu">
          <li><a href="#about">조합소개</a></li>
          <li><a href="#business">사업내용</a></li>
          <li><a href="#join">조합원모집</a></li>
          <li><a href="#contact">문의</a></li>
          <li><a href="#gallery">활동</a></li>
        </ul>
      </nav>

      <div className="hero">
        <h2>AI ON 협동조합</h2>
        <p>
          제주 AI ON은 디자이너, 교육자, 콘텐츠 제작자들이
          협력하여 성장하는 창작 협동조합입니다.
        </p>
      </div>
    </header>
  )
}

export default Header