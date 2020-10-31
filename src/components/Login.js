import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Login.css";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        return;
      case "password":
        setPassword(e.target.value);
        return;
      default:
        return;
    }
  }

  // 아직 덜 됨
  function postLoginReq() {
    if (password === "") {
      alert("비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.");
    } else {
      handleLogin(email, password);
      // props.handleLogin(email, password).then((result) => {
      //   if (!result) {
      //     setEmail("");
      //     setPassword("");
      //   }
      // });
    }
  }

  return (
    <div className="py-5">
      <h4 className="mb-5">로그인</h4>

      <Form className="loginForm m-auto">
        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm={4} className="text-left">
            이메일
          </Form.Label>
          <Col sm={8} className="pl-0">
            <Form.Control type="email" name="email" onChange={handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left">
            비밀번호
          </Form.Label>
          <Col sm={8} className="pl-0">
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button
          className="w-100"
          variant="secondary"
          // type="submit" : 이렇게 주면, 버튼을 눌렀을 때 전송 기능이 실행되고 페이지가 새로고침된다 : https://dololak.tistory.com/763
          type="button" // 그래서 이렇게 줘야 한다.
          onClick={postLoginReq}
        >
          로그인
        </Button>
      </Form>
      <div className="signupLink mx-auto mt-4 text-right">
        <p className="mb-1">아직 골라죠 멤버가 아니신가요?</p>
        <Link to="/signup">골라죠 가입하기</Link>
      </div>
    </div>
  );
}

export default Login;
