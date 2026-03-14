import { Link } from "react-router-dom"
import logo from "../../assets/images/Logo-AION.png"
import "./Header.css"

export default function Header(){

  return(

    <header className="header">

      <div className="header-inner">

        <img
          src={logo}
          alt="AION"
          className="logo"
        />

        <nav className="header-menu">

          <Link to="/login">
            <button className="login-btn">
              로그인
            </button>
          </Link>

          <Link to="/signup">
            <button className="signup-btn">
              회원가입
            </button>
          </Link>

        </nav>

      </div>

    </header>

  )

}