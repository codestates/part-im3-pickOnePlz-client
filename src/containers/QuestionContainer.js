import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";
import REACT_APP_URL from "../config";

import Question from "../components/Question";
import {
  questionListStart,
  questionListSuccess,
  questionListFailure,
  questionRemoveStart,
  questionRemoveSuccess,
  questionRemoveFailure,
} from "../modules/getQuestionsList";

import { Button } from "react-bootstrap";

const QuestionContainer = ({ history }) => {
  const { currentUser } = useSelector((state) => state.loginLogout.status);

  const questionState = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.getQuestionsList, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  const loginState = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.loginLogout, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  const dispatch = useDispatch();

  const getAllQuestions = () => {
    dispatch(questionListStart());

    return axios
      .get(
        `${REACT_APP_URL}/questions`,
        {
          params: {
            userId: currentUser,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((questions) => {
        dispatch(questionListSuccess(questions.data));
      })
      .catch((error) => {
        dispatch(questionListFailure());
      });
  };

  const votingQuestion = async (_questionId, _answerId) => {
    const setData = {
      userId: currentUser,
      questionId: _questionId,
      answerId: _answerId,
    };
    const response = await axios
      .post(`${REACT_APP_URL}/votes`, setData, {
        withCredentials: true,
      })
      .then(({ data }) => {
        getAllQuestions();
        // alert(data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const deleteQuestion = (questionId, index) => {
    dispatch(questionRemoveStart());

    return axios
      .delete(
        `${REACT_APP_URL}/questions/${questionId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("response : ", response.data); // 성공적으로 삭제하였습니다. 라는 서버의 메세지를 출력한다.
        dispatch(questionRemoveSuccess(index));
        history.push("/");
      })
      .catch((error) => {
        dispatch(questionRemoveFailure());
      });
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  let questionsList = questionState.list.data;

  const mapToComponents = (data) => {
    // map 메소드의 첫 번째 인자는 콜백함수이며 콜백함수에 들어오는 인자는 배열의 원소, 인덱스, (배열 전체) 입니다.
    // map 메소드는 원래 배열과 같은길이의 배열을 리턴하며 각 원소는 콜백함수의 리턴값이 됩니다.
    return data.map((question, index) => {
      return (
        // // 따라서, 컴포넌트 매핑의 결과물은 <Memo ... /> 컴포넌트의 배열입니다. (길이는 매핑의 인자로 들어간 data 와 같음)
        <Question
          key={question.id}
          questionId={question.id}
          index={index}
          title={question.title}
          userId={question.user.id}
          nickname={question.user.nickname}
          answer_1={question.answers[0]}
          answer_2={question.answers[1]}
          question={question}
          deleteQuestion={deleteQuestion}
          votingQuestion={votingQuestion}
          currentUser={loginState.status.currentUser}
          // ownership={memo.writer === this.props.currentUser} // 변형 필요 : 로그인한 사람의 것인지 구별할 때 필요할 듯?
        />
      );
    });
  };
  let view = (
    <Link to="/newQuestion">
      <Button variant="primary" className="floatingButton">
        <span className="buttonInside m-0 p-0">+</span>
      </Button>
    </Link>
  );

  if (!loginState.status.currentUser) {
    view = "";
  }
  return (
    <>
      {mapToComponents(questionsList)}
      {view}
    </>
  );
};

export default QuestionContainer;
