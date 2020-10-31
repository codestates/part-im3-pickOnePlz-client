import React from "react";
import { useSelector } from 'react-redux';
import "./Question.css";

export default function Question(props) {
  const { isLoggedIn } = useSelector(state => state.loginLogout.status);
  
  const isVoteAnswer = ( qwer ) => {
    return qwer > 0;
  }

  const answer1 = isVoteAnswer(props.answer_1.Votes.length);
  const answer2 = isVoteAnswer(props.answer_2.Votes.length);

  const isVoted = {
    background : 'orange'
  }
  const notVoted = {
    background : 'white'
  }

  // Main 이거 이름 별로인 듯. => Question 으로 수정함
  const handleDeleteReq = () => {
    if (props.currentUser === null) {
      console.log("로그인이 되어있지 않습니다.");
      return;
    }
    props.deleteQuestion(props.questionId, props.index);
  };

  let deleteAndUpdateButton = (
    <div className="buttons__mainPage">
      <input type="button" className="editButton" value="글 수정"></input>
      <input
        type="button"
        className="deleteButton"
        value="글 삭제"
        onClick={handleDeleteReq}
      ></input>
    </div>
  );

  let eachQuestion = (
    <div className="eachQuestion__mainPage">
      <div className="questionTitle__mainPage">{props.title}</div>
      <div className="allAnswers__mainPage">
        <div className="answer__mainPage" style={answer1 ? isVoted : notVoted }>
          <div>{props.answer_1.message}</div>
          {
            isLoggedIn ?           
            <button
            onClick={() => {
              props.votingQuestion(props.questionId, props.answer_1.id);
            }}>
            투표
            </button> :
            <div></div>
          }
          <div>투표수</div>
          <div>{props.answer_1.votingCount}</div>
        </div>
        <div style={{ display: "inline-block", margin: "5px" }}>vs</div>
        <div className="answer__mainPage" style={answer2 ? isVoted : notVoted }>
          <div>{props.answer_2.message}</div>
          {
            isLoggedIn ?           
            <button
            onClick={() => {
              props.votingQuestion(props.questionId, props.answer_2.id);
            }}>
            투표
            </button> :
            <div></div>
          }
          <div>투표수</div>
          <div>{props.answer_2.votingCount}</div>
        </div>
      </div>
      <div className="description__mainPage">description(optional-미구현)</div>
      {props.currentUser === props.userId ? deleteAndUpdateButton : ""}
    </div>
  );

  // console.log(eachQuestion__mainPage._owner.key); // 나중에, 각 question의 key를 잡기 위해서 써먹어야 할 것 같은데...
  // 각 answer에도 key 이런걸로 접근할 수 있어야 할 것인데..어떻게 하지?

  return <div>{eachQuestion}</div>;
}
