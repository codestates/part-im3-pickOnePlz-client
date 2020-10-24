import React from "react";
import './Mypage.css';

function Mypage() {
  return (
      <>
      <fieldset>
        <form className="form">
            <div>닉네임</div>
            <div className="input">
                <span>
                <input placeholder="닉네임"/>
                </span>
                <button>저장</button>
            </div>
            <div>비밀번호</div>
            <div className="input">
                <span>
                <input placeholder="기존 패스워드"/>
                </span>
                <button>저장</button>
            </div>
            <div>
            <input placeholder="새 패스워드"/>
            </div>
            <div>
            <input placeholder="새 패스워드 확인"/>
            </div>
        </form>
      </fieldset>
      </>
  );
}
export default Mypage;