import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We`ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> 체크박스 부분 사용여부 확인*/}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/signup">골라죠 회원이 아니신가요?</Link>
    </div>
  );
}

export default Login;
