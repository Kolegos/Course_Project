import * as sessionTypes from "./redux/actions/actionTypes";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./redux/history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NaviBar from "./components/navigation/Navibar";
import Login from "./components/login_signup/Login";
import SignUp from "./components/login_signup/Signup";
import ForgotPassword from "./components/login_signup/ForgotPassword";
import ProfilePage from "./components/login_signup/ProfilePage";
import ChangePassword from "./components/login_signup/ChangePassword";
import Categories from "./components/Categories";
import Test from "./components/Test";
import PageNotFound from "./components/PageNotFound";
import PostsPage from "./components/Post/Page";
import LoginFirst from "./components/LoginFirst";

function App({ authenticated }) {
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
            <PrivateRoute
              authenticated={authenticated}
              path="/profilePage"
              component={ProfilePage}
            />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="/categories" component={Categories} />
            <Route path="/loginFirst" component={LoginFirst} />
            <Route path="/Page" component={PostsPage} />
            <Route component={PageNotFound} />
          </Switch>{" "}
          <ToastContainer autoClose={5000} hideProgressBar />
        </div>
      </div>
    </Router>
  );
}

function mapStateToProps({ sessions }) {
  return {
    authenticated: sessions != undefined ? sessions.authenticated : null,
  };
}

function PrivateRoute({ component: Component, authenticated }) {
  return (
    <Route
      render={(props) =>
        authenticated === sessionTypes.AUTHENTICATED ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/loginFirst", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default connect(mapStateToProps)(App);
