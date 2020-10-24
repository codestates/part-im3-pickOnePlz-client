import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

// import {
//   SignupContainer,
//   LoginContainer,
//   HeaderContainer,
//   MainContainer,
//   MypageContainer,
//   NewQuestionContainer,
// } from "./_containers";

import Container from "./_containers";

function App() {
  return (
    <div className="App">
      <div className="Body">
        <Router>
          <Container.HeaderContainer />
          <Switch>
            <div>
              <Route path="/login" component={Container.LoginContainer} />
              <Route path="/signup" component={Container.SignupContainer} />
              <Route
                path="/newQuestion"
                component={Container.NewQuestionContainer}
              />
              <Route path="/mypage" component={Container.MypageContainer} />
              <Route exact path="/" component={Container.MainContainer} />
            </div>
          </Switch>
          <div>
            <Link to="/newQuestion">
              <Button variant="primary" className="floatingButton">
                <span className="buttonInside">+</span>
              </Button>
            </Link>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
