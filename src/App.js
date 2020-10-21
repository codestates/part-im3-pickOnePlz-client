import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import "./App.css";

import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
// import Signup from "./components/Signup";
import SignupContainer from "./containers";
import NewQuestion from "./NewQuestion";

const store = createStore(reducers, applyMiddleware(thunk));

function App() {
  return (
    <div className="App">
      <div className="Body">
        <Provider store={store}>
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
        </Provider>
      </div>
    </div>
  );
}

export default App;
