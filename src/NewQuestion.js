import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NewQuestion.css";

function NewQuestion() {
  return (
    <div>
      <div className="questionTitle">
        어떤 것이 고민이신가요?
        <div>
          <input
            type="text"
            size="40"
            maxLength="30"
            placeholder="제목을 입력하세요!"
          ></input>
        </div>
      </div>
      <div className="allAnswers">
        <div className="answer">
          이거랑....
          <div>
            <textarea
              className="textareaBox"
              required
              rows="5"
              wrap="hard"
              style={{ resize: "none" }}
              placeholder="첫번째 선택지를 입력하세요."
            ></textarea>
          </div>
        </div>

        <div className="answer">
          이거중에....
          <div>
            <textarea
              className="textareaBox"
              required
              rows="5"
              maxlength="200"
              style={{ resize: "none" }}
              placeholder="두번째 선택지를 입력하세요."
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <textarea
          className="description"
          cols="45"
          rows="5"
          maxlength="1000"
          style={{ resize: "none" }}
          placeholder="상황 설명을 입력하세요(필수가 아닙니다)."
        ></textarea>
      </div>
      <div>
        <Link to="/">
          <Button className="inputButton" variant="primary">
            골라주세요!!!
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NewQuestion;
