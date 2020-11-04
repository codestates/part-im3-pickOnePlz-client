import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./css/NewQuestion.css";

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
      alert("고민이 없으신가요?");
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
  };

  return (
    <>
      <div className="py-5">
        <h4 className="mb-5">무엇을 골라드릴까요?</h4>
        <Form className="newQuestionForm m-auto">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="text-left">고민을 작성해주세요</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="오늘 뭐 먹을까요?"
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <InputGroup>
                  <InputGroup.Prepend></InputGroup.Prepend>
                  <FormControl
                    as="textarea"
                    name="firstAnswer"
                    aria-label="With textarea"
                    className="inputbox"
                    placeholder="짜장면"
                    rows="5"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <InputGroup>
                  <InputGroup.Prepend></InputGroup.Prepend>
                  <FormControl
                    as="textarea"
                    name="secondAnswer"
                    aria-label="With textarea"
                    className="inputbox"
                    placeholder="짬뽕"
                    rows="5"
                    onChange={handleChange}
                  />
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
            골라달라고 하기
          </Button>
        </Form>
      </div>
    </>
  );
};

export default NewQuestion;
