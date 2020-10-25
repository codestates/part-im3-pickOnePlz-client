import { combineReducers } from "redux";
import signup from "./signup";
import loginLogout from "./loginLogout";

const reducers = combineReducers({
  signup,
  loginLogout,
});

export default reducers;
