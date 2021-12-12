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
import PostGuest from "./components/post/PostGuest";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./components/login_signup/RequireAuth";
import EditProfilePage from "./components/login_signup/EditProfilePage";
import Test from "./test";
import EditPost from "./components/post/EditPost";
import AdminPanel from "./components/admin/AdminPanel";

import UserPosts from "./components/post/UserPosts";
import PostLoggedIn from "./components/post/PostLoggedIn";
import PostAdmin from "./components/post/PostAdmin";
import PostAddLoggedIn from "./components/post/PostAddLoggedIn";
import HomeGuest from "./components/HomeGuest";
import HomeAdmin from "./components/HomeAdmin";

export default (
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path="/admin" component={RequireAuth(AdminPanel, true)} />
        <Route exact path="/" component={HomeGuest} />
        <Route exact path="/home-guest" component={HomeGuest} />
        <Route exact path="/home-logged-in" component={HomeGuest} />
        <Route exact path="/home-admin" component={HomeAdmin} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/profilePage" component={RequireAuth(ProfilePage)} />
        <Route path="/changePassword" component={ChangePassword} />
        <Route path="/post-guest" component={PostGuest} />
        <Route path="/post-logged-in" component={PostLoggedIn} />
        <Route path="/post-admin" component={PostAdmin} />
        <Route path="/Edit/:id" component={EditPost} />
        <Route path="/add-Post-loggedIn" component={PostAddLoggedIn} />
        <Route path="/Page" component={PostsPage} />
        <Route
          path="/EditProfilePage"
          component={RequireAuth(EditProfilePage)}
        />
        <Route
          path="/admin/categories/createSubcategory/:id"
          component={RequireAuth(CreateSubcategory, true)}
        />
        <Route
          path="/admin/categories/createSubcategory/"
          component={RequireAuth(CreateSubcategory, true)}
        />
        <Route
          path="/admin/categories/create"
          component={RequireAuth(CreateCategory, true)}
        />
        <Route
          path="/admin/categories"
          component={RequireAuth(Categories, true)}
        />
        <Route path="/test/:id+" component={Test} />
        <Route path="/YourPosts" component={RequireAuth(UserPosts)} />
        <Route component={Home} />
      </Switch>
      <ToastContainer autoClose={5000} hideProgressBar />
    </App>
  </Router>
);
