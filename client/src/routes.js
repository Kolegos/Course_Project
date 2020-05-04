import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./redux/history";
import App from "./App";
import Login from "./components/login_signup/Login";
import SignUp from "./components/login_signup/Signup";
import ForgotPassword from "./components/login_signup/ForgotPassword";
import ProfilePage from "./components/login_signup/ProfilePage";
import ChangePassword from "./components/login_signup/ChangePassword";
import Categories from "./components/admin/categories/Categories";
import CreateCategory from "./components/admin/categories/CreateCategory";
import CreateSubcategory from "./components/admin/categories/CreateSubcategory";
import Home from "./components/Home";
import PageNotFound from "./components/misc/PageNotFound";
import PostsPage from "./components/post/Page";
import Post from "./components/post/Post";
import LoginFirst from "./components/login_signup/LoginFirst";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./components/login_signup/RequireAuth";
import Test from "./test";
export default (
  <Router history={history}>
    <App>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/profilePage" component={RequireAuth(ProfilePage)} />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="/post/:id" component={Post} />
            <Route path="/post" component={Post} />
            <Route path="/loginFirst" component={LoginFirst} />
            <Route path="/Page" component={PostsPage} />
            <Route
              path="/admin/categories/createSubcategory/:id"
              component={CreateSubcategory}
            />
            <Route path="/admin/categories/create" component={CreateCategory} />
            <Route path="/admin/categories" component={Categories} />
            <Route path="/test/:id+" component={Test} />
            <Route component={PageNotFound} />
          </Switch>
          <ToastContainer autoClose={5000} hideProgressBar />
        </div>
      </div>
    </App>
  </Router>
);
