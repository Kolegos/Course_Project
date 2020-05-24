import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as sessionActions from "../../redux/actions/sessionActions";
import * as sessionTypes from "../../redux/actions/actionTypes";
import { history } from "../../redux/history";
import { toast } from "react-toastify";

const Login = ({ authenticateUser, authenticated, user }) => {
  useEffect(() => {
    if (authenticated === sessionTypes.AUTHENTICATED) {
      toast.success(`Sveiki, ${user}`);
      history.push("/profilePage");
    }
  }, [user]);

  return (
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner small">
        <form onSubmit={authenticateUser}>
          <h3>Prisijungti</h3>
          <div className="form-group">
            <label>El. pašto adresas</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Įveskite el. pašto adresą"
            />
          </div>

          <div className="form-group">
            <label>Slaptažodis</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Įveskite slaptažodį"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Prisijungti
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ sessions }) => ({
  authenticated: sessions !== undefined ? sessions.authenticated : null,
  user: sessions && sessions.user ? sessions.user.firstName : null,
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
