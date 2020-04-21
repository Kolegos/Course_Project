import React, { useEffect } from "react";
import * as userTypes from "../../redux/actions/actionTypes";
import * as userActions from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { history } from "../../redux/history";

const SignUp = ({ createUser, created }) => {
  useEffect(() => {
    if (created === userTypes.CREATE_USER_FAILED) {
      toast.error("This e-mail address is already registered", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
    if (created === userTypes.CREATE_USER_SUCCESS) {
      toast.success("You have successfully registered!", {
        position: toast.POSITION.TOP_LEFT,
      });
      history.push("/");
    }
  });
  return (
    <div>
      <form onSubmit={createUser}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>First name</label>
          <input
            required={true}
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            required={true}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            required={true}
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            required={true}
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>{" "}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  created: users != undefined ? users.created : null,
});

const mapDispatchToProps = (dispatch) => ({
  createUser(e) {
    e.preventDefault();
    let firstName = e.target[`firstName`].value;
    let lastName = e.target[`lastName`].value;
    let email = e.target[`email`].value;
    let password = e.target[`password`].value;
    const newUser = {
      _id: email,
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(userActions.createUser(newUser));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
