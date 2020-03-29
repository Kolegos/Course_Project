import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NaviBar from "./components/navigation/Navibar";
import Login from "./components/login-signup/Login";
import SignUp from "./components/login-signup/Signup";
import ForgotPassword from "./components/login-signup/ForgotPassword";
import ProfilePage from "./components/login-signup/ProfilePage";
import ChangePassword from "./components/login-signup/ChangePassword";
import Categories from "./components/Categories.jsx";
import Test from "./components/Test";
import PageNotFound from "./components/PageNotFound";

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
              <Route path="/profilePage" component={ProfilePage} />
              <Route path="/changePassword" component={ChangePassword} />
              <Route path="/categories" component={Categories} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
