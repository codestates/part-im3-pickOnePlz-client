import React from "react";
import "./Main.css";

export default function Main(props) {
  // Main 이거 이름 별로인 듯.
  let eachQuestion__mainPage = (
    <div className="eachQuestion__mainPage">
      <div className="questionTitle__mainPage">{props.title}</div>
      <div className="allAnswers__mainPage">
        <div className="answer__mainPage">{props.answer_1.message}</div>
        <div style={{ display: "inline-block", margin: "5px" }}>vs</div>
        <div className="answer__mainPage">{props.answer_2.message}</div>
      </div>
      <div className="description__mainPage">description(optional-미구현)</div>
      <div className="buttons__mainPage">
        <input type="button" className="editButton" value="글 수정"></input>
        <input type="button" className="deleteButton" value="글 삭제"></input>
      </div>
    </div>
  );

  // console.log(eachQuestion__mainPage._owner.key); // 나중에, 각 question의 key를 잡기 위해서 써먹어야 할 것 같은데...
  // 각 answer에도 key 이런걸로 접근할 수 있어야 할 것인데..어떻게 하지?

  return <div>{eachQuestion__mainPage}</div>;
}
