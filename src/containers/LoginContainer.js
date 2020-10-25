import React, { useCallback } from "react";
// 상태 조회는 useSelector, 액션 생성은 useDispatch
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import Login from "../components/Login";
import { loginStart, loginSuccess, loginFailure } from "../modules/loginLogout";

const LoginContainer = ({ history }) => {
  const state = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.loginLogout, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  const dispatch = useDispatch();

  const handleLogin = (email, password) => {
    dispatch(loginStart());

    return axios
      .post(
        "http://localhost:5000/users/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        dispatch(loginSuccess(email));
        // console.log("쿠키 : ", JSON.parse(document.cookie));
        // // create session data
        // let loginData = {
        //   isLoggedIn: true,
        //   user: email,
        // };
        // // (쿠키에 저장할 때 객체를 만든 뒤, 해당 객체를 문자화(JSON.stringify 메소드) 시키고 base64 로 인코드한 뒤, 앞에 'key=' 를 붙여 저장합니다)
        // // * 쿠키에 저장된 값을 이용하여 로그인 했는지 여부를 판단합니다.
        // // * btoa 는 base64 로 인코드 하는 메소드입니다. 이에 대해 익숙치 않으신 분들은 아래의 링크를 참조해 주세요.
        // // * base64 인코드, 디코드 메소드 - btoa(), atob() : https://pro-self-studier.tistory.com/106?category=659555
        // document.cookie = "key=" + btoa(JSON.stringify(loginData));
        alert("로그인에 성공하셨습니다!");
        history.push("/");
      })
      .catch((error) => {
        alert(`로그인에 문제가 있습니다. 다시 시도해 주세요`);
        dispatch(loginFailure(error.response));
      });
  };

  return (
    <div>
      <Login handleLogin={handleLogin} />
    </div>
  );
};

export default LoginContainer;
