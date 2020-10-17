import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header"
import Main from "./Main"
import Login from "./Login"
import Signup from "./Signup"

import './App.css';

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
              <Route exact path="/" component={Main} />
            </div>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
