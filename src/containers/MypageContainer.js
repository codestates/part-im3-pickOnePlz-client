import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userInfoStart,
  userInfoSuccess,
  userInfoFailure,
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

  const dispatch = useDispatch();

  const getUserInfo = (currentUserId) => {
    dispatch(userInfoStart());

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
        dispatch(userInfoSuccess(userInfo.data));
      })
      .catch((error) => {
        dispatch(userInfoFailure());
      });
  };

  useEffect(() => {
    getUserInfo(loginState.status.currentUser);
  }, []);

  let userInfo = userInfoState.userInfo.userData;

  return (
    <Mypage
      currentUser={loginState.status.currentUser}
      nickname={userInfo.nickname}
      // 닉네임수정 함수
      // 비밀번호수정 함수
    />
  ); // 메인페이지로 가는 버튼 하나 필요할 듯?
};

export default MyPageContainer;
