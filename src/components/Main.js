import React from "react";
import "./Main.css";

export default function Main() {
  let eachQuestion__mainPage = (
    <div className="eachQuestion__mainPage">
      <div className="questionTitle__mainPage">title</div>
      <div className="allAnswers__mainPage">
        <div className="answer__mainPage">answer-1</div>
        <div style={{ display: "inline-block", margin: "5px" }}>vs</div>
        <div className="answer__mainPage">answer-2</div>
      </div>
      <div className="description__mainPage">description(optional)</div>
      <div className="buttons__mainPage">
        <input type="button" className="editButton" value="글 수정"></input>
        <input type="button" className="deleteButton" value="글 삭제"></input>
      </div>
    </div>
  );
  return (
    <div>
      {eachQuestion__mainPage}
      {eachQuestion__mainPage}
      {eachQuestion__mainPage}
      {eachQuestion__mainPage}
      {eachQuestion__mainPage}
      {eachQuestion__mainPage}
      {eachQuestion__mainPage}
      {eachQuestion__mainPage}
      {eachQuestion__mainPage}
    </div>
  );
}
