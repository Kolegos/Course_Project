import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NaviBar from "./components/navigation/Navibar";
import Login from "./components/Login-Signup/login";
import SignUp from "./components/Login-Signup/signup";
import ForgotPassword from "./components/Login-Signup/forgotpassword";
import profilePage from "./components/Login-Signup/profilePage";
import changePassword from "./components/Login-Signup/changePassword";
import Categories from "./components/categories";
import Test from "./components/Test";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NaviBar></NaviBar>
          <div className="container"></div>
        </div>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Test} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/profilePage" component={profilePage} />
              <Route path="/changePassword" component={changePassword} />
              <Route path="/categories" component={Categories} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
