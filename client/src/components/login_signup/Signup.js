import React, { useEffect } from "react";
import * as userTypes from "../../redux/actions/actionTypes";
import * as userActions from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { history } from "../../redux/history";

const SignUp = ({ createUser, created, authenticated }) => {
  useEffect(() => {
    if (authenticated === userTypes.AUTHENTICATED) history.push("/profilePage");

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
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner small">
        <div>
          <form onSubmit={createUser}>
            <h3>Užsiregistruoti</h3>
            <div className="form-group">
              <label>Vardas</label>
              <input
                required={true}
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Vardas"
              />
            </div>

            <div className="form-group">
              <label>Pavardė</label>
              <input
                required={true}
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Pavardė"
              />
            </div>

            <div className="form-group">
              <label>El. pašto adresas</label>
              <input
                required={true}
                type="email"
                name="email"
                className="form-control"
                placeholder="El. paštas"
              />
            </div>

            <div className="form-group">
              <label>Slaptažodis</label>
              <input
                required={true}
                type="password"
                name="password"
                className="form-control"
                placeholder="Slaptažodis"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Užsiregistruoti
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, sessions }) => ({
  authenticated: sessions !== undefined ? sessions.authenticated : null,
  created: users !== undefined ? users.created : null,
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
