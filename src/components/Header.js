import React from "react";
import "./Header.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = ({ handleLogout }) => {
  // let isLogin = false; 로그인 여부 확인 (아직 못받아왔음)

  const loginSignupView = (
    <>
      <Nav>
        <Nav.Link href="/login">로그인</Nav.Link>
        <Nav.Link href="/signup">회원가입</Nav.Link>
      </Nav>
    </>
  );

  const logoutMypageView = (
    <>
      <Nav>
        <Nav.Link href="/mypage">마이페이지</Nav.Link>
        <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
      </Nav>
    </>
  );

  let currentView;

  if (document.cookie === "") {
    currentView = loginSignupView;
  } else {
    currentView = logoutMypageView;
  }

  return (
    <Navbar
      collapseOnSelect
      variant="dark"
      className="justify-content-between"
      style={{ background: "#d7385e" }}
    >
      <Container>
        <Navbar.Brand href="/">골라죠</Navbar.Brand>
        {currentView}
      </Container>
    </Navbar>
  );
};

export default Header;
