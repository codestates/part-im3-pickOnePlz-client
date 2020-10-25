import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 새로고침을 하면 store(state)가 날아가는데, 이것을 localStorage에 저장한 뒤 불러오기 위함.

import signup from "./signup";
import loginLogout from "./loginLogout";

const persistConfig = {
  key: "root",
  storage, // localStorage에 저장합니다.
  whitelist: ["signup", "loginLogout"],
  // whitelist -> localstorage에 저장할 리듀서들의 목록입니다.
  // blacklist -> 그것만 제외합니다
};

const reducers = combineReducers({
  signup,
  loginLogout,
});

export default persistReducer(persistConfig, reducers);
