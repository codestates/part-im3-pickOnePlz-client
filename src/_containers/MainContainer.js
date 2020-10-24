import React, { Component } from "react";
import Main from "./_components";

class MainContainer extends Component {
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default MainContainer;
// redux 상태 처리가 필요함
// 로그인되지 않았다면 : ...
// 로그인되었다면 : ...

// 그냥 Main 컴포넌트에서 바로 받아서 바로 처리해줘도 되지 않나? 싶기는 함... 컨테이너가 꼭 필요할까?
