
import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

function Header() {
  // let isLogin = false; 로그인 여부 확인
  return (
    <div>
      <div className="Header">
        하나만 골라줘
        <Link to="/login" className="login">
          로그인
        </Link>
        <span className="slash">/</span>
        <Link to="/signup" className="signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Header;
