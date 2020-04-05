import React, { Component } from "react";
import { connect } from "react-redux";
import * as sessionActions from "../../redux/actions/sessionActions";
import { bindActionCreators } from "redux";
import * as sessionTypes from "../../redux/actions/actionTypes";

const Login = ({ authenticateUser, authenticated }) => {
  return (
    <form onSubmit={authenticateUser}>
      <h3>Login</h3>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>
      <div>
        {authenticated === sessionTypes.NOT_AUTHENTICATED ? (
          <p> Login incorrect </p>
        ) : null}
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="/forgotpassword">password?</a>
      </p>
    </form>
  );
};

const mapStateToProps = ({ sessions }) => ({
  authenticated: sessions != undefined ? sessions.authenticated : null,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let email = e.target[`email`].value;
    let password = e.target[`password`].value;
    dispatch(sessionActions.authenticateUser(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
