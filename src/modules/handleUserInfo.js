/* 1. ActionTypes - mypage */
export const USER_INFO_START = "USER_INFO_START";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILURE = "USER_INFO_FAILURE";

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "QUESTION_LIST_START" 등등)를 리턴합니다. */
export function userInfoStart() {
  return {
    type: USER_INFO_START,
  };
}

export function userInfoSuccess(userData) {
  return {
    type: USER_INFO_SUCCESS,
    userData,
  };
}

export function userInfoFailure() {
  return {
    type: USER_INFO_FAILURE,
  };
}

/* 3. initialState 및 reducer 함수 */
const initialState = {
  userInfo: {
    status: "INIT",
    userData: {},
  },
  update: {
    status: "INIT",
    error: -1,
  },
};

export default function handleUserInfo(state = initialState, action) {
  switch (action.type) {
    case USER_INFO_START:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: "WAITING",
        },
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: "SUCCESS",
          userData: action.userData,
        },
      };
    case USER_INFO_FAILURE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: "FAILURE",
        },
      };
    default:
      return state;
  }
}
