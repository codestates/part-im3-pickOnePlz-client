// 액션생성자 함수와 thunk 를 정의하는 파일입니다.

import axios from "axios";
import {
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from "./ActionTypes";

/* 디스패치 (dispatch)

  디스패치는 스토어의 내장함수 중 하나입니다. 
  디스패치는, 액션을 발생 시키는 것 이라고 이해하시면 됩니다. 
  dispatch 라는 함수에는 액션을 파라미터로 전달합니다.
  dispatch(action) 이런식으로 말이죠.

  그렇게 호출을 하면, 스토어는 리듀서 함수를 실행시켜서, 
  해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어줍니다.

*/

/* 
  액션 메서드에서는 리듀서(reducer)로 데이터 생성을 요청한다. 

  비즈니스 로직을 주로 액션 메서드에 개발하기 때문에, 액션 메서드는 컴포넌트의 재활용을 높이고 코드를 관리하는 데 중요한 역할을 한다.
*/

/* REGISTER */
export function registerRequest(email, password) {
  return (dispatch) => {
    // Inform Register API is starting
    dispatch(register());

    return axios
      .post(
        "http://localhost:5000/users/signup",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(registerFailure(error.response));
      });
  };
}

// 액션생성자 함수로, 액션객체(action 객체의 type 값은 "AUTH_REGISTER")를 리턴합니다.
export function register() {
  return {
    type: AUTH_REGISTER,
  };
}

// 액션생성자 함수로, action.type 값이 "AUTH_REGISTER_SUCCESS"인 객체를 리턴합니다.
export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
}

// 액션생성자 함수로, action.type 값이 "AUTH_REGISTER_FAILURE"인 객체를 리턴
export function registerFailure(error) {
  return {
    type: AUTH_REGISTER_FAILURE,
    error,
  };
}

// -------------------------------------------------------------------------------------

/* LOGIN */
export function loginRequest(email, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API REQUEST
    return axios
      .post(
        "http://localhost:5000/users/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        // SUCCEED
        dispatch(loginSuccess(email));
        console.log("response : ", response);
        return response;
      })
      .catch((error) => {
        // FAILED
        dispatch(loginFailure());
      });
  };
}

export function login() {
  return {
    type: AUTH_LOGIN,
  };
}

export function loginSuccess(email) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    email,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
  };
}

// -------------------------------------------------------------------------------------
