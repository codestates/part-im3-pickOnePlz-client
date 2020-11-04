import React from "react";
// 상태 조회는 useSelector, 액션 생성은 useDispatch
import { useSelector, useDispatch } from "react-redux";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import axios from "axios";
import REACT_APP_URL from "../config";

import Login from "../components/Login";
import { loginStart, loginSuccess, loginFailure } from "../modules/loginLogout";

import { Container } from "react-bootstrap";

const LoginContainer = ({ history, cookies }) => {
  const state = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.loginLogout, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  if (state.status.currentUser) {
    history.push("/");
  }

  const dispatch = useDispatch();

  const handleLogin = (email, password) => {
    dispatch(loginStart());

    return axios
      .post(
        `${REACT_APP_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        let loggedInUser = Number(cookies.get("session_id"));

        // jwt 적용을 위한 시도
        // const { token, id } = response.data;
        // axios.defaults.headers.common['Authorization'] = `${token}`;

        // dispatch(loginSuccess(id));  // 이렇게 받아오는 편이 더 명시적이고 깔끔하지 않나 싶은데, 쿠키를 사용하지 않는다는 점에서는 문제일 듯
        dispatch(loginSuccess(loggedInUser));
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
        history.push("/");
      })
      .catch((error) => {
        alert(`이메일 혹은 비밀번호가 잘못되었습니다. 떠올려보세요!`);
        dispatch(loginFailure(error.response));
      });
  };

  return (
    <Container>
      <Login handleLogin={handleLogin} />
    </Container>
  );
};

LoginContainer.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LoginContainer);
