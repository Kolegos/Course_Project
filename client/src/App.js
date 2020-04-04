import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./redux/history";
import NaviBar from "./components/navigation/Navibar";
import Login from "./components/login_signup/Login";
import SignUp from "./components/login_signup/Signup";
import ForgotPassword from "./components/login_signup/ForgotPassword";
import ProfilePage from "./components/login_signup/ProfilePage";
import ChangePassword from "./components/login_signup/ChangePassword";
import Categories from "./components/Categories";
import Test from "./components/Test";
import PageNotFound from "./components/PageNotFound";
//import Session from "./components/Session";

// const RouteGuard = (Component) => ({ match }) => {
//   console.info("route guard", match);
//   if (5 == 6) {
//     return <Redirect to="/login"></Redirect>;
//   } else {
//     return <Component match={match} />;
//   }
// };

class App extends Component {
  render() {
    return (
      <Router history={history}>
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
