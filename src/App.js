import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  SignupContainer,
  LoginContainer,
  HeaderContainer,
  QuestionContainer,
  MypageContainer,
  NewQuestionContainer,
} from "./containers";

import "./App.css";

function App() {
  const { isLoggedIn } = useSelector((state) => state.loginLogout.status);

  return (
    <div className="App">
      <Router>
        <header>
          <HeaderContainer />
        </header>
        <main>
          <Switch>
            <Route path="/mypage" component={MypageContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/newQuestion" component={NewQuestionContainer} />
            <Route exact path="/" component={QuestionContainer} />
          </Switch>
        </main>
        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
