import React from "react";
// 상태 조회는 useSelector, 액션 생성은 useDispatch
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import REACT_APP_URL from "../config";

import Signup from "../components/Signup";
import { signupStart, signupSuccess, signupFailure } from "../modules/signup";

import { Container } from "react-bootstrap";

const SignupContainer = ({ history }) => {
  const state = useSelector(
    (state) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.loginLogout, // reducer 함수를 넣어줘야 하는 듯
    []
  );

  if (state.status.currentUser) {
    // 누군가 로그인한 상태라면 /signup 위지로의 접근을 막음
    history.push("/");
  }

  const dispatch = useDispatch();
  // Context에 포함된 dispatch 를 가져올 수 있다. 이 dispatch 를 이용해 action 을 발생시킨다.
  // React.useContext 으로 Provider 에서 정의한 contextValue 를 가져와 store.dispatch 를 반환한다.

  const handleRegister = (email, password) => {
    dispatch(signupStart());
    return axios
      .post(
        `${REACT_APP_URL}/users/signup`,
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        dispatch(signupSuccess());
        alert("회원가입되었습니다!");
        // react-router v4 에서는 라우트컴포넌트에 기본적으로 history, location, match 객체를 프롭스로 전달합니다.
        history.push("/login");
      })
      .catch((error) => {
        alert(`가입하신 적이 있으신가요? 떠올려보세요!`);
        dispatch(signupFailure(error.response));
      });
  };

  return (
    <Container>
      <Signup handleRegister={handleRegister} />
    </Container>
  );
};

export default SignupContainer;

/*  connect 함수와 useSelector, useDispatch의 주요 차이점

  컨테이너 컴포넌트를 만들 때 connect 함수를 사용해도 좋고, useSelector와 useDispatch를 사용해도 좋습니다. 
  차이점은 connect함수를 사용하는 경우 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때, 해당 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되지만,
  hook은 그렇지 않기 때문에 성능 최적화를 이루기 위해 React.memo를 컨터에너 컴포넌트에서 사용해줘야 합니다.

*/

/* useSelector 

  connect()함수의 mapStateToProps와 유사한 기능이며, store의 state의 데이터를 할당할 수 있도록 하는 function입니다. 
  해당 useSelector의 경우는 연결된 action이 dispatch 될때마다, useSelector에 접근되어 값을 반환하게 됩니다. 
  즉 리랜더링 된다는 말입니다.

*/

/*  useDispatch
  redux store에 설정된 action에 대한 dispatch를 연결하는 hook으로써, store파일 안에 선언된 action을 연결할 수 있도록 선언해줍니다. 
  (관련된 부분은 상단에 props내의 action을 사용할때와 동일합니다.)
*/
