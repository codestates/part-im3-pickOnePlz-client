// 리듀서 : dispatch 함수로 부터 전달받은 action 객체의 type 값에 따라, state 를 변경하는 함수입니다.

import * as types from "../actions/ActionTypes";

const initialState = {
  login: {
    status: "INIT",
  },
  register: {
    status: "INIT",
    error: -1,
  },
  status: {
    valid: false,
    isLoggedIn: false,
    currentUser: "",
  },
};

// initialState 를 정의
// default parameter 를 사용하여 state 값에 아무것도 들어오지 않았을 때 initialState 를 사용하도록 설정
// action.type 값에 따라 state 를 변경할 떄, 원래 state 를 손상시키지 않고 새로운 state 를 리턴해야하기 때문에 ES6의 spread operator 가 사용됨
export default function authentication(state = initialState, action) {
  switch (action.type) {
    /* REGISTER */
    case types.AUTH_REGISTER:
      return {
        ...state,
        register: {
          status: "WAITING",
          error: -1,
        },
      };
    case types.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: "SUCCESS",
        },
      };
    case types.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          status: "FAILURE",
          error: action.error,
        },
      };

    default:
      return state;
  }
}
