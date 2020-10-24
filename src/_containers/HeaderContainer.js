import React, { Component } from "react";
import Header from "../_components";

class HeaderContainer extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default HeaderContainer;
// redux 상태 처리가 필요함
// 로그인되지 않았다면 회원가입/로그인 버튼들을 모두 표시하도록,
// 로그인되었다면 로그아웃 버튼을 표시하도록

// 그냥 Header 컴포넌트에서 바로 받아서 바로 처리해줘도 되지 않나? 싶기는 함... 컨테이너가 꼭 필요할까?
