import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  questionListStart,
  questionListSuccess,
  questionListFailure,
} from "../modules/getQuestionsList";

import axios from "axios";

import Main from "../components/Main";

const MainContainer = () => {
  // MainContainer 이거 이름 별로인 듯.
  const state = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.getQuestionsList, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  const dispatch = useDispatch();

  const getAllQuestions = () => {
    dispatch(questionListStart());

    return axios
      .get(
        "http://localhost:5000/questions",
        {},
        {
          withCredentials: true,
        }
      )
      .then((questions) => {
        console.log("questions.data : ", questions.data); // 배열이 매번 다른 순서로 리턴되고 있다. 서버 문제인 듯?
        dispatch(questionListSuccess(questions.data));
      })
      .catch((error) => {
        dispatch(questionListFailure());
      });
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  let questionsList = state.list.data;

  const mapToComponents = (data) => {
    // map 메소드의 첫 번째 인자는 콜백함수이며 콜백함수에 들어오는 인자는 배열의 원소, 인덱스, (배열 전체) 입니다.
    // map 메소드는 원래 배열과 같은길이의 배열을 리턴하며 각 원소는 콜백함수의 리턴값이 됩니다.
    return data.map((question) => {
      console.log(question.id);
      return (
        // // 따라서, 컴포넌트 매핑의 결과물은 <Memo ... /> 컴포넌트의 배열입니다. (길이는 매핑의 인자로 들어간 data 와 같음)
        <Main
          key={question.id}
          title={question.title}
          answer_1={question.answers[0]}
          answer_2={question.answers[1]}
          question={question}
          // ownership={memo.writer === this.props.currentUser} // 변형 필요 : 로그인한 사람의 것인지 구별할 때 필요할 듯?
        />
      );
    });
  };

  return <div>{mapToComponents(questionsList)}</div>;
};

export default MainContainer;
