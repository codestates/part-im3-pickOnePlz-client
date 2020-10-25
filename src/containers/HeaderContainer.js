import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Header from "../components/Header";
import { logout } from "../modules/loginLogout";

const HeaderContainer = ({ history }) => {
  const state = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.loginLogout, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    return axios
      .post("http://localhost:5000/users/logout", {}, { withCredentials: true })
      .then(() => {
        dispatch(logout());
        alert("성공적으로 로그아웃 되었습니다.");
        // history.push("/");
        // window.location = "http://localhost:3000";
        window.location = "/"; // 리디렉트를 이렇게 해도 괜찮은지 의문임
      });
  };

  return (
    <Header isLoggedIn={state.status.isLoggedIn} handleLogout={handleLogout} />
  );
};

export default HeaderContainer;
