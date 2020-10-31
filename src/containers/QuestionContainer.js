import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  questionListStart,
  questionListSuccess,
  questionListFailure,
  questionRemoveStart,
  questionRemoveSuccess,
  questionRemoveFailure,
} from "../modules/getQuestionsList";

import axios from "axios";

import Question from "../components/Question";

const QuestionContainer = ({ history }) => {
  const { currentUser } = useSelector((state) => state.loginLogout.status);
  // MainContainer 이거 이름 별로인 듯. => QuestionContainer 로 수정함
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
  const votingQuestion = async (_questionId, _answerId) => {
    const setData = {
      userId: currentUser,
      questionId: _questionId,
      answerId: _answerId,
    };
    const response = await axios.post("http://localhost:5000/votes", setData, {
      withCredentials: true,
    });
    if (response.status === 201) {
      alert(response.data);
      getAllQuestions();
    }
  };

  const dispatch = useDispatch();

  const getAllQuestions = () => {
    dispatch(questionListStart());

    return axios
      .get(
        "http://localhost:5000/questions",
        {
          params:{
            userId: currentUser
          }
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

  // getVotes 필요한 듯
  // data : [{ q a}  { q a}  { q a} { q a}]
  // 그러므로, 겟 요청 2개 하고, 그다음에 투표 {u q a} 기능 구현해야 할 것임

  const deleteQuestion = (questionId, index) => {
    dispatch(questionRemoveStart());

    return axios
      .delete(
        `http://localhost:5000/questions/${questionId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
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
          userId={question.userId}
          answer_1={question.Answers[0]}
          answer_2={question.Answers[1]}
          question={question}
          deleteQuestion={deleteQuestion}
          votingQuestion={votingQuestion}
          currentUser={loginState.status.currentUser}
          // ownership={memo.writer === this.props.currentUser} // 변형 필요 : 로그인한 사람의 것인지 구별할 때 필요할 듯?
        />
      );
    });
  };

  return <div>{mapToComponents(questionsList)}</div>;
};

export default QuestionContainer;
