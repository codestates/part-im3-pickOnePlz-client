import React from 'react'
import "./Header.css"

function Header() {
  // let isLogin = false; 로그인 여부 확인 
  return (
    <div>
      <div className="Header">
        하나만 골라줘
        <button className='button'>로그인</button>
        <button className='button'>회원가입</button>
      </div>
    </div>
  )
}

export default Header
