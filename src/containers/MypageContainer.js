import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  getUserInfoStart,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUerInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailure,
} from "../modules/handleUserInfo";

import axios from "axios";

import Mypage from "../components/Mypage";

const MyPageContainer = () => {
  const userInfoState = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.handleUserInfo, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  const loginState = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.loginLogout, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  const history = useHistory();

  const dispatch = useDispatch();

  const getUserInfo = (currentUserId) => {
    dispatch(getUserInfoStart());

    return axios
      .get(
        `http://localhost:5000/users/${currentUserId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((userInfo) => {
        console.log("userInfo.data : ", userInfo.data); // 잘 받아온다
        dispatch(getUserInfoSuccess(userInfo.data));
        history.push("/mypage");
      })
      .catch((error) => {
        dispatch(getUserInfoFailure());
      });
  };

  // 문제점 1 : 닉네임을 바꾸고 싶은 경우와 패스워드를 바꾸고 싶은 경우를 별도로 고려해야 한다.
  // 지금은 하나의 함수를 공유하기 때문에, 서버에서 닉네임을 바꿀건지를 첫번째 분기로 잡고 있어서,
  // 닉네임값이 주어지면 패스워드변경은 적용해 주지 않고 있다.
  const updateUserInfo = (currentUser, nickname, password, newPassword) => {
    dispatch(updateUerInfoStart());

    return axios
      .put(
        `http://localhost:5000/users/${currentUser}`,
        {
          id: currentUser,
          nickname: nickname,
          password: password,
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(updateUserInfoSuccess());
        console.log("response.data : ", response.data);
        alert("사용자 정보가 성공적으로 변경되었습니다.");
        history.push("/mypage");
        getUserInfo(loginState.status.currentUser);
        // 개선점 2 : 리디렉트가 깔끔하지 않고, 정보변경 후에 입력창의 값을 지우고 싶다.
        // alert이 없으면 닉네임은 변경된 값이 곧바로 적용되어 렌더링되지 않고 있음 (변경 자체는 잘 된다.)
      })
      .catch((error) => {
        console.log("error : ", error);
        dispatch(updateUserInfoFailure());
      });
  };

  useEffect(() => {
    getUserInfo(loginState.status.currentUser);
  }, []);

  let userInfo = userInfoState.userInfo.userData;
  console.log("userInfo : ", userInfo);

  return (
    <main>
      <Container>
        <Mypage
          currentUser={loginState.status.currentUser}
          nickname={userInfo.nickname}
          updateUserInfo={updateUserInfo}
        />
      </Container>
    </main>
  );
};

export default MyPageContainer;
