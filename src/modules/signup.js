/* 1. ActionTypes - Signup */
const AUTH_SIGNUP_START = "AUTH_SIGNUP_START";
const AUTH_SIGNUP_SUCCESS = "AUTH_SIGNUP_SUCCESS";
const AUTH_SIGNUP_FAILURE = "AUTH_SIGNUP_FAILURE";

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_SIGNUP" 등등)를 리턴합니다. */
export function signupStart() {
  return {
    type: AUTH_SIGNUP_START,
  };
}

export function signupSuccess() {
  return {
    type: AUTH_SIGNUP_SUCCESS,
  };
}

export function signupFailure(error) {
  return {
    type: AUTH_SIGNUP_FAILURE,
    // error,
  };
}

/* 3. initialState 및 reducer 함수 */
const initialState = {
  // login: {
  //   status: "INIT",
  // },
  signup: {
    status: "INIT",
    // error: -1,
  },
  // status: {
  //   valid: false,
  //   isLoggedIn: false,
  //   currentUser: "",
  // },
};

export default function signup(state = initialState, action) {
  switch (action.type) {
    /* REGISTER */
    case AUTH_SIGNUP_START:
      return {
        ...state,
        signup: {
          status: "WAITING",
        },
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          ...state.signup,
          status: "SUCCESS",
        },
      };
    case AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          status: "FAILURE",
        },
      };

    default:
      return state;
  }
}
