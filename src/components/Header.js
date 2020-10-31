import React from "react";
import "./Header.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

function Header({ handleLogout }) {
  // let isLogin = false; 로그인 여부 확인 (아직 못받아왔음)

  const loginSignupView = (
    <>
      <Nav>
        <Nav.Link href="/login">로그인</Nav.Link>
        {/* <Nav.Link href="/signup">회원가입</Nav.Link> */}
      </Nav>
    </>
  );

  const logoutMypageView = (
    <>
      <Nav>
        <NavDropdown title="내 계정">
          <NavDropdown.Item href="/mypage">마이 페이지</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
        </NavDropdown>
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
      expand="sm"
      bg="dark"
      variant="dark"
      className="justify-content-between"
    >
      <Container>
        <Navbar.Brand href="/">하나만 골라죠</Navbar.Brand>
        {currentView}
      </Container>
    </Navbar>
  );
}

export default Header;
