import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Header(props) {
  // let isLogin = false; 로그인 여부 확인 (아직 못받아왔음)

  const history = useHistory();

  const postLogoutReq = () => {
    props.handleLogout();
  };

  const redirectToMypage = () => {
    history.push("/mypage");
  };

  const loginSignupView = (
    <div className="Header">
      <Link to="/login" className="login">
        로그인
      </Link>
      <span className="slash">/</span>
      <Link to="/signup" className="signup">
        회원가입
      </Link>
    </div>
  );

  const logoutMypageView = (
    <div className="Header">
      <button
        // type="submit" : 이렇게 주면, 버튼을 눌렀을 때 전송 기능이 실행되고 페이지가 새로고침된다 : https://dololak.tistory.com/763
        type="button" // 그래서 이렇게 줘야 한다.
        className="logout"
        onClick={postLogoutReq}
      >
        로그아웃
      </button>
      <button
        // type="submit" : 이렇게 주면, 버튼을 눌렀을 때 전송 기능이 실행되고 페이지가 새로고침된다 : https://dololak.tistory.com/763
        type="button" // 그래서 이렇게 줘야 한다.
        className="logout"
        onClick={redirectToMypage}
      >
        My Page
      </button>
    </div>
  );

  let currentView;

  if (document.cookie === "") {
    currentView = loginSignupView;
  } else {
    currentView = logoutMypageView;
  }

  return (
    <div>
      <div className="Header">
        <a
          href="#"
          onClick={() => {
            history.push("/");
          }}
        >
          하나만 골라줘
        </a>
        {currentView}
      </div>
    </div>
  );
}

export default Header;
