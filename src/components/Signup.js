import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Form, Button, Row, Col } from "react-bootstrap";
import "./css/Signup.css";

const Signup = ({ handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChange = (e) => {
    let targetName = e.target.name;

    if (targetName === "email") {
      setEmail(e.target.value);
    }
    if (targetName === "password") {
      setPassword(e.target.value);
    }
    if (targetName === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
  };

  const postSignupReq = () => {
    if (password === "") {
      alert("비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.");
    } else if (password !== passwordConfirm) {
      alert(
        "입력하신 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요."
      );
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (!passwordValidation.test(password)) {
        alert(
          "비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요."
        );
      } else {
        handleRegister(email, password);
        return false;
      }
    }
  };

  return (
    <div className="py-5">
      <h4 className="mb-5">회원가입</h4>
      <Form className="SignupForm m-auto">
        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm={4} className="text-left pr-0">
            이메일
          </Form.Label>
          <Col sm={8}>
            <Form.Control type="email" name="email" onChange={handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left pr-0">
            비밀번호
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left pr-0">
            비밀번호 확인
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="password"
              name="passwordConfirm"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button
          className="w-100"
          variant="secondary"
          type="button"
          onClick={postSignupReq}
        >
          가입하기
        </Button>
      </Form>
      <div className="loginLink mx-auto mt-4 text-right">
        <Link to="/login">골라죠 회원이신가요?</Link>
      </div>
    </div>
  );
};

Signup.propTypes = {
  mode: PropTypes.bool,
  onRegister: PropTypes.func,
  onLogin: PropTypes.func,
};

Signup.defaultProps = {
  mode: true,
  handleRegister: (id, pw) => {
    console.error("register function is not defined");
  },
};

export default Signup;
