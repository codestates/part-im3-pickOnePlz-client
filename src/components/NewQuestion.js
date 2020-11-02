import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NewQuestion.css";

const NewQuestion = ({ onSubmit }) => {
  const { currentUser } = useSelector((state) => state.loginLogout.status);

  const [title, setTitle] = useState("");
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");

  const postData = {
    title: title,
    answers: [
      {
        message: firstAnswer,
      },
      {
        message: secondAnswer,
      },
    ],
    userId: currentUser,
  };

  const inputValidation = () => {
    if (title === "" || firstAnswer === "" || secondAnswer === "") {
      alert("정보를 입력하세요");
      return false;
    }
    return true;
  };
  
  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        return;
      case "firstAnswer":
        setFirstAnswer(e.target.value);
        return;
      case "secondAnswer":
        setSecondAnswer(e.target.value);
        return;
      default:
        return;
    }
  }

  return (
    <>
    <div className="py-5">
    <h4 className="mb-5">글 작 성</h4>
    <Form className="newQuestionForm m-auto">
      <Form.Group as={Row} controlId="formBasicEmail">
        <Form.Label column sm={2} className="text-left">
          제목
        </Form.Label>
        <Col sm={10} className="pl-0">
          <Form.Control type="text" name="title" onChange={handleChange} />
        </Col>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={4} className="text-left">
              선택1
          </Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
                </InputGroup.Prepend>
              <FormControl as="textarea" name="firstAnswer" aria-label="With textarea" className="inputbox" rows="5" onChange={handleChange}/>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={4} className="text-left">
            선택2
            </Form.Label>
            <InputGroup>
            <InputGroup.Prepend>
                </InputGroup.Prepend>
              <FormControl as="textarea" name="secondAnswer" aria-label="With textarea" className="inputbox" rows="5" onChange={handleChange}/>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      
      <Button
        className="w-100"
        variant="secondary"
        type="button"
        onClick={() => {
          if (inputValidation()) {
            onSubmit(postData);
          }
        }}
      >
        작성
      </Button>
    </Form>
    </div>
    </>
  );
}

export default NewQuestion;
