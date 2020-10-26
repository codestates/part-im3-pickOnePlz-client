import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NewQuestion.css";

function NewQuestion({ onSubmit }) {

  const { currentUser } = useSelector(state => state.loginLogout.status)

  const [title, setTitle] = useState('');
  const [firstAnswer, setFirstAnswer] = useState('');
  const [secondAnswer, setSecondAnswer] = useState('');

  const inputValidation = () => {
    if(title===''||firstAnswer===''||secondAnswer===''){
      alert("정보를 입력하세요");
      return false;
    }
    return true;
  }

  function handleChange(e) {
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
    <div>
      <div className="questionTitle">
        어떤 것이 고민이신가요?
        <div>
          <input
            type="text"
            size="40"
            name='title'
            maxLength="30"
            placeholder="제목을 입력하세요!"
            onChange={handleChange}
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
              name='firstAnswer'
              onChange={handleChange}
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
              name='secondAnswer'
              onChange={handleChange}
              style={{ resize: "none" }}
              placeholder="두번째 선택지를 입력하세요."
            ></textarea>
          </div>
        </div>
      </div>
      {/* <div>
        <textarea
          className="description"
          cols="45"
          rows="5"
          maxlength="1000"
          style={{ resize: "none" }}
          placeholder="상황 설명을 입력하세요(필수가 아닙니다)."
        ></textarea>
      </div> */}
      <div>
          <Button className="inputButton" variant="primary" onClick={()=>{
            if(inputValidation()){
              onSubmit({
                title: title,
                answers: [{
                  message: firstAnswer
                },
                {
                  message: secondAnswer
                }],
                userId: currentUser
              });
            }
          }}>
            골라주세요!!!
          </Button>
      </div>
    </div>
  );
}

export default NewQuestion;
