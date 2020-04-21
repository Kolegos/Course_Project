import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./redux/history";
import App from "./App";
import Login from "./components/login_signup/Login";
import SignUp from "./components/login_signup/Signup";
import ForgotPassword from "./components/login_signup/ForgotPassword";
import ProfilePage from "./components/login_signup/ProfilePage";
import ChangePassword from "./components/login_signup/ChangePassword";
import Categories from "./components/Categories";
import Test from "./components/Test";
import PageNotFound from "./components/PageNotFound";
import PostsPage from "./components/Post/Page";
import Post from "./components/Post/Post";
import LoginFirst from "./components/LoginFirst";
import requireAuth from "./components/login_signup/RequireAuth";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./components/login_signup/RequireAuth";

export default (
  <Router history={history}>
    <App>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Test} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/profilePage" component={RequireAuth(ProfilePage)} />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="/categories" component={Categories} />
            <Route path="/post/:id" component={Post} />
            <Route path="/post" component={Post} />
            <Route path="/loginFirst" component={LoginFirst} />
            <Route path="/Page" component={PostsPage} />
            <Route component={PageNotFound} />
          </Switch>
          <ToastContainer autoClose={5000} hideProgressBar />
        </div>
      </div>
    </App>
  </Router>
);

/*function NonAuthedRoute({ component: Component, authenticated }) {
  return (
    <Route
      render={(props) =>
        authenticated === sessionTypes.NOT_AUTHENTICATED ? (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        ) : authenticated === sessionTypes.AUTHENTICATED ? (
          <Component {...props} />
        ) : (
          <div>Loading</div>
        )
      }
    />
  );
}
*/
