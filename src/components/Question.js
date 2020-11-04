/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, Row, Col, Modal } from "react-bootstrap";
import "./css/Question.css";

const Question = ({
  answer_1,
  answer_2,
  currentUser,
  deleteQuestion,
  index,
  nickname,
  question,
  questionId,
  title,
  userId,
  votingQuestion,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isLoggedIn } = useSelector((state) => state.loginLogout.status);

  const isCurrentUser = userId === currentUser;

  const isVotedAnswer = (answer) => answer.votes.length > 0;

  const history = useHistory();
  // Main 이거 이름 별로인 듯. => Question 으로 수정함
  const handleDeleteReq = () => {
    if (currentUser === null) {
      console.log("로그인이 되어있지 않습니다.");
      return;
    }
    deleteQuestion(questionId, index);
  };

  const colors = ["#ff4b5c", "#0e918c", "#fa7f72", "#1f3c88", "#625261"];
  let random_color_1 = colors[Math.floor(Math.random() * colors.length)];
  let random_color_2 = colors[Math.floor(Math.random() * colors.length)];

  // 이건 컴포넌트로 빼주세요.
  let deleteAndUpdateButton = (
    <Button
      className="w-100"
      variant="outline-danger"
      type="button"
      onClick={handleShow}
    >
      삭제하기
    </Button>
  );

  return (
    <Card className="question mx-auto my-4">
      <Card.Header>{nickname} 씨</Card.Header>
      <Card.Title className="mt-4">{title}</Card.Title>
      <Card.Body>
        <Row>
          <Col>
            <Card
              className="answer"
              onClick={() => {
                if (currentUser === null) {
                  alert("로그인 후 투표해 주세요!");
                  history.push("/login");
                } else {
                  votingQuestion(questionId, answer_1.id);
                }
              }}
            >
              <Card.Body
                style={{
                  background: random_color_1,
                  borderBottomLeftRadius: isCurrentUser && 0,
                  borderBottomRightRadius: isCurrentUser && 0,
                }}
              >
                <Card.Text>
                  {isLoggedIn && isVotedAnswer(answer_1) && "✓"}{" "}
                  {answer_1.message}
                </Card.Text>
              </Card.Body>
              {isCurrentUser && (
                <Card.Footer>
                  <div>골라준 사람</div>
                  {answer_1.votingCount}
                </Card.Footer>
              )}
            </Card>
          </Col>
          <Col>
            <Card
              className="answer"
              onClick={() => {
                if (currentUser === null) {
                  alert("로그인 후 투표해 주세요!");
                  history.push("/login");
                } else {
                  votingQuestion(questionId, answer_2.id);
                }
              }}
            >
              <Card.Body
                style={{
                  background: random_color_2,
                  borderBottomLeftRadius: isCurrentUser && 0,
                  borderBottomRightRadius: isCurrentUser && 0,
                }}
              >
                <Card.Text>
                  {isLoggedIn && isVotedAnswer(answer_2) && "✓"}{" "}
                  {answer_2.message}
                </Card.Text>
              </Card.Body>
              {isCurrentUser && (
                <Card.Footer>
                  <div>골라준 사람</div>
                  {answer_2.votingCount}
                </Card.Footer>
              )}
            </Card>
          </Col>
        </Row>
      </Card.Body>
      {isCurrentUser && <Card.Footer>{deleteAndUpdateButton}</Card.Footer>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>고민 삭제하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>고민을 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="secondary" onClick={handleDeleteReq}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Question;
