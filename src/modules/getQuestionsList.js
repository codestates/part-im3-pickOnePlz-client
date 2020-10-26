/* 1. ActionTypes - getAllQuestions */
export const QUESTION_LIST_START = "QUESTION_LIST_START";
export const QUESTION_LIST_SUCCESS = "QUESTION_LIST_SUCCESS";
export const QUESTION_LIST_FAILURE = "QUESTION_LIST_FAILURE";

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "QUESTION_LIST_START" 등등)를 리턴합니다. */
export function questionListStart() {
  return {
    type: QUESTION_LIST_START,
  };
}

// export function questionListSuccess(data, isInitial, listType) {
export function questionListSuccess(data) {
  return {
    type: QUESTION_LIST_SUCCESS,
    data,
    // isInitial,
    // listType,
  };
}

export function questionListFailure() {
  return {
    type: QUESTION_LIST_FAILURE,
  };
}

/* 3. initialState 및 reducer 함수 */
const initialState = {
  // post: {
  //   status: "INIT",
  //   error: -1,
  // },
  list: {
    status: "INIT",
    data: [],
    // isLast: false,
  },
  // edit: {
  //   status: "INIT",
  //   error: -1,
  // },
  // remove: {
  //   status: "INIT",
  //   error: -1,
  // },
  // star: {
  //   status: "INIT",
  //   error: -1,
  // },
};

export default function getQuestionsList(state = initialState, action) {
  switch (action.type) {
    case QUESTION_LIST_START:
      return {
        ...state,
        list: {
          ...state.list,
          status: "WAITING",
        },
      };
    case QUESTION_LIST_SUCCESS:
      if (action.isInitial) {
        return {
          ...state,
          list: {
            ...state.list,
            status: "SUCCESS",
            data: action.data,
            // isLast 값은, API 가 전달해 준 데이터의 길이가 6 이하일 때 true 가 되는 값으로,
            // 마지막 메모리스트인지 확인하는 용도로 사용됩니다.
            // isLast: action.data.length < 6,
          },
        };
        // 처음 메모리스트를 요청한 것이 아니라 id 를 기준으로 (thunk 의 인자) 새 메모나 이전 메모를 불러오는 요청에 따른 state 변경코드입니다.
        // id 를 기준으로 새 메모들을 불러왔다면 data 배열의 앞에 새로 로딩된 메모가 위치해야하며,
        // 이전 메모를 불러왔다면 data 배열의 뒤에 위치해야합니다.
      } else {
        if (action.listType === "new") {
          // 배열의 앞부분에 추가
          return {
            ...state,
            list: {
              ...state.list,
              status: "SUCCESS",
              data: [...action.data, ...state.list.data],
            },
          };
        } else {
          //action.listType === 'older' //배열의 뒷부분에 추가
          return {
            ...state,
            list: {
              ...state.list,
              status: "SUCCESS",
              data: [...state.list.data, ...action.data],
              // isLast: action.data.length < 6,
            },
          };
        }
      }
    case QUESTION_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: "FAILURE",
        },
      };
    default:
      return state;
  }
}
