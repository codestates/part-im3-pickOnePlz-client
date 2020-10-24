import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
// import Container, { SignupContainer } from "./containers";
import { SignupContainer } from "./containers";
import NewQuestion from "./NewQuestion";

function App() {
  return (
    <div className="App">
      <div className="Body">
        <Router>
          <Header />
          <Switch>
            <div>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignupContainer} />
              <Route path="/newQuestion" component={NewQuestion} />
              <Route exact path="/" component={Main} />
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
