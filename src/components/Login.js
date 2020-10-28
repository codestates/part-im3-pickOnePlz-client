import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login(props) {
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
      props.handleLogin(email, password);
      // props.handleLogin(email, password).then((result) => {
      //   if (!result) {
      //     setEmail("");
      //     setPassword("");
      //   }
      // });
    }
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We`ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> 체크박스 부분 사용여부 확인*/}
        <Button
          variant="primary"
          // type="submit" : 이렇게 주면, 버튼을 눌렀을 때 전송 기능이 실행되고 페이지가 새로고침된다 : https://dololak.tistory.com/763
          type="button" // 그래서 이렇게 줘야 한다.
          onClick={postLoginReq}
        >
          Submit
        </Button>
      </Form>
      <Link to="/signup">골라죠 회원이 아니신가요?</Link>
    </div>
  );
}

export default Login;
