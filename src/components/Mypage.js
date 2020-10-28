import React from "react";
import { useHistory } from "react-router-dom";
import "./Mypage.css";

function Mypage(props) {
  // props.nickname
  const history = useHistory();

  if (props.currentUser === null) {
    alert("로그인이 되어있지 않습니다.");
    history.push("/login");
  }

  let nickname = null;
  if (typeof props.nickname !== "number") {
    nickname = "아직 닉네임을 정하지 않으셨습니다.";
  } else {
    nickname = props.nickname;
  }

  if (props.currentUser === null) {
    alert("로그인이 되어있지 않습니다.");
    history.push("/login");
  }

  return (
    <>
      <fieldset>
        <form className="form">
          <div>현재 닉네임 : {nickname}</div>
          <div className="input">
            <span>
              <input placeholder="닉네임" />
            </span>
            <button>저장</button>
          </div>
          <div>비밀번호 수정하기</div>
          <div className="input">
            <span>
              <input placeholder="기존 비밀번호" />
            </span>
            <button>저장</button>
          </div>
          <div>
            <input placeholder="새 비밀번호" />
          </div>
          <div>
            <input placeholder="새 비밀번호 확인" />
          </div>
        </form>
      </fieldset>
    </>
  );
}
export default Mypage;
