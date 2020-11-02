import React from "react";
import { useSelector } from "react-redux";
import { Button, Card, CardDeck, Col, Row } from 'react-bootstrap';
import "./Question.css";

const Question = (props) => {
  const { isLoggedIn } = useSelector((state) => state.loginLogout.status);

  const isVoteAnswer = (qwer) => {
    if (isLoggedIn) {
      return qwer > 0;
    }
    return false;
  };

  const answer1 = isVoteAnswer(props.answer_1.votes.length);
  const answer2 = isVoteAnswer(props.answer_2.votes.length);

  const isVoted = {
    background: "orange",
  };
  const notVoted = {
    background: "white",
  };

  // Main 이거 이름 별로인 듯. => Question 으로 수정함
  const handleDeleteReq = () => {
    if (props.currentUser === null) {
      console.log("로그인이 되어있지 않습니다.");
      return;
    }
    props.deleteQuestion(props.questionId, props.index);
  };

  let deleteAndUpdateButton = (
    <Button
      className="w-10"
      variant="secondary"
      type="button"
      onClick={handleDeleteReq}
    >
    삭제
    </Button>
  );

  let eachQuestion = (
    <>
    <div className="py-5">
    <h4>{props.title}, 닉네임: {props.nickname}</h4> 
      <CardDeck className="questionBox m-auto">
        <div className="answers m-auto">
        <Row>
          <Col xs={12} md={6}>
            <Card className="asdf">
            {/* <Card.Iarmg variant="top" src="holder.js/100px160" /> */}
              <Card.Title className="qwer">투표수 : {props.answer_1.votingCount}</Card.Title>
              <Card.Body>
              <Card.Text>{props.answer_1.message}</Card.Text>
              </Card.Body>
              <Card.Footer>
              <small className="text-muted">          
              {isLoggedIn ? (
              <button
              onClick={() => {
                props.votingQuestion(props.questionId, props.answer_1.id);
              }}
            >
              투표
            </button>
          ) : (
            <div></div>
          )}</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="asdf">
            <Card.Title className="qwer">투표수 : {props.answer_2.votingCount}</Card.Title>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
            <Card.Text>{props.answer_2.message}</Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">          
            {isLoggedIn ? (
            <button
              onClick={() => {
                props.votingQuestion(props.questionId, props.answer_2.id);
              }}
            >
              투표
            </button>
          ) : (
            <div></div>
          )}</small>
            </Card.Footer>
            </Card>
        </Col>
      </Row>
      <Row className="deleteButton ">{props.currentUser === props.userId ? deleteAndUpdateButton : ""}</Row>
      </div>
      </CardDeck>
    </div>
    </>
  );
  
  return <div>{eachQuestion}</div>;
}

export default Question;