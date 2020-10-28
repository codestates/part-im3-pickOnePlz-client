import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Mypage.css";

function Mypage(props) {
  const [nickname, setNickname] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  // props.nickname
  const history = useHistory();

  // 개선점 1 : let currentNickname = props.nickname;  :  닉네임 아직 없는 경우, 이 값이 null이라 표시 안 됨
  // API에서는 '골라죠01'로 적혀있는데, 랜덤 닉네임 생성이 아직 처리되지 않은 것인가?
  let currentNickname = null;
  if (typeof props.nickname !== "string") {
    currentNickname = "아직 닉네임을 정하지 않으셨습니다.";
  } else {
    currentNickname = props.nickname;
  }

  if (props.currentUser === null) {
    alert("로그인이 되어있지 않습니다.");
    history.push("/login");
  }

  function handleChange(e) {
    let targetName = e.target.name;

    if (targetName === "nickname") {
      setNickname(e.target.value);
    }
    if (targetName === "oldPassword") {
      setOldPassword(e.target.value);
    }
    if (targetName === "newPassword") {
      setNewPassword(e.target.value);
    }
    if (targetName === "newPasswordConfirm") {
      setNewPasswordConfirm(e.target.value);
    }
  }

  // 개선점 3 : 비밀번호 수정과 닉네임 수정이 각각 다른 버튼으로 존재함
  // 이러다보니 분기 처리가 필요하게 되고, 사용자는 전체 값을 한번에 바꾸고 싶을 수도 있는데 이에 대응하지 못함
  function updateUserInfoReq() {
    if (
      nickname === "" &&
      oldPassword === "" &&
      newPassword === "" &&
      newPasswordConfirm === ""
    ) {
      alert("입력값이 없습니다. 수정하시려는 항목을 입력해 주세요.");
    } else if (newPassword !== newPasswordConfirm) {
      alert(
        "입력하신 새로운 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요."
      );
    } else if (nickname.length > 16) {
      alert("닉네임은 16글자 이하로 입력해 주세요.");
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (newPassword.length > 0 && !passwordValidation.test(newPassword)) {
        alert(
          "비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요."
        );
      } else {
        if (nickname.length > 0) {
          props.updateUserInfo(props.currentUser, nickname, null, null);
        } else {
          props.updateUserInfo(
            props.currentUser,
            null,
            oldPassword,
            newPassword
          );
        }
      }
    }
  }

  return (
    <>
      <fieldset>
        <form className="form">
          <div>현재 닉네임 : {currentNickname}</div>
          <div className="input">
            <span>
              <input
                name="nickname"
                placeholder="닉네임"
                onChange={handleChange}
              />
            </span>
            <button type="button" onClick={updateUserInfoReq}>
              저장
            </button>
          </div>
          <div>비밀번호 수정하기</div>
          <div className="input">
            <span>
              <input
                name="oldPassword"
                placeholder="기존 비밀번호"
                onChange={handleChange}
              />
            </span>
            <button type="button" onClick={updateUserInfoReq}>
              저장
            </button>
          </div>
          <div>
            <input
              name="newPassword"
              placeholder="새 비밀번호"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="newPasswordConfirm"
              placeholder="새 비밀번호 확인"
              onChange={handleChange}
            />
          </div>
        </form>
      </fieldset>
    </>
  );
}
export default Mypage;
