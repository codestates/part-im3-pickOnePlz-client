import React, { useState } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";
import "./css/Mypage.css";

const Mypage = (props) => {
  const [nickname, setNickname] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  let currentNickname = null;
  if (typeof props.nickname !== "string") {
    currentNickname = "아직 닉네임을 정하지 않으셨습니다.";
  } else {
    currentNickname = props.nickname;
  }

  // 이 부분이 있으니까 alert 순서가 좀 이상해짐
  // if (props.currentUser === null) {
  //   alert("로그인이 되어있지 않습니다.");
  //   history.push("/login");
  // }

  const handleChange = (e) => {
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
  };

  // 개선점 3 : 비밀번호 수정과 닉네임 수정이 각각 다른 버튼으로 존재함
  // 이러다보니 분기 처리가 필요하게 되고, 사용자는 전체 값을 한번에 바꾸고 싶을 수도 있는데 이에 대응하지 못함
  const updateUserInfoReq = () => {
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
          document.querySelector(".nickname").value = "";
          props.updateUserInfo(props.currentUser, nickname, null, null);
        } else {
          document.querySelector(".oldPassword").value = "";
          document.querySelector(".newPassword").value = "";
          document.querySelector(".newPasswordConfirm").value = "";
          props.updateUserInfo(
            props.currentUser,
            null,
            oldPassword,
            newPassword
          );
        }
      }
    }
  };

  return (
    <div className="py-5">
      <h4 className="mb-5">마이페이지 </h4>
      <Form className="mypageForm m-auto">
        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm={4} className="text-left pr-0">
            닉네임
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className="nickname"
              type="text"
              name="nickname"
              onChange={handleChange}
              placeholder={currentNickname}
            />
          </Col>
        </Form.Group>
        <Button
          className="w-100 mb-4"
          variant="secondary"
          type="button"
          onClick={updateUserInfoReq}
        >
          닉네임 수정하기
        </Button>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left pr-0">
            기존 비밀번호
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className="oldPassword"
              type="password"
              name="oldPassword"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left pr-0">
            새 비밀번호
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className="newPassword"
              type="password"
              name="newPassword"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left pr-0">
            새 비밀번호 확인
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className="newPasswordConfirm"
              type="password"
              name="newPasswordConfirm"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button
          className="w-100"
          variant="secondary"
          type="button"
          onClick={updateUserInfoReq}
        >
          비밀번호 수정하기
        </Button>
      </Form>
    </div>
  );
};
export default Mypage;
