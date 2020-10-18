import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Signup from "./Signup";
import NewQuestion from "./NewQuestion";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Body">
        <Router>
          <Switch>
            <div>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
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
