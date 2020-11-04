import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import REACT_APP_URL from "../config";

import axios from "axios";

import Header from "../components/Header";
import { logout } from "../modules/loginLogout";

const HeaderContainer = () => {
  const state = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.loginLogout, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  let currentUser = state.status.currentUser;

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogout = () => {
    return axios
      .post(`${REACT_APP_URL}/users/logout`, {}, { withCredentials: true })
      .then(() => {
        dispatch(logout());
        alert("로그아웃되었습니다.");
        history.push("/");
      });
  };

  return <Header handleLogout={handleLogout} currentUser={currentUser} />;
};

export default HeaderContainer;
