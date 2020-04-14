import * as types from "./actionTypes";
import axios from "axios";
import { history } from "../history";

const url =
  process.env.NODE_ENV === `production` ? `` : "http://localhost:5000/api";

export function authenticateUser(email, password) {
  return function (dispatch) {
    axios
      .post(url + `/authenticate`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        dispatch(continueAuthenticateUser(response.data.user));
      })
      .catch((error) => {
        if (error.response) {
          console.log("Can't authenticate");
          dispatch(processAuthenticateUser(types.NOT_AUTHENTICATED));
        }
      });
  };
}

export function checkToken() {
  return function (dispatch) {
    if (!localStorage.token) {
      dispatch(processAuthenticateUser(types.NOT_AUTHENTICATED));
    } else {
      dispatch(processAuthenticateUser());
      axios
        .get(url + "/checktoken")
        .then((res) => {
          dispatch(continueAuthenticateUser(res.data.user));
        })
        .catch((err) => {
          dispatch(processAuthenticateUser(types.NOT_AUTHENTICATED));
        });
    }
  };
}

export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
}

export function continueAuthenticateUser(user) {
  return function (dispatch) {
    axios.post(url + "/users", { id: user }).then((res) => {
      dispatch({ type: types.AUTHENTICATED, user: res.data });
    });
    dispatch(processAuthenticateUser(types.AUTHENTICATED));
  };
}
export function processAuthenticateUser(status = types.AUTHENTICATING) {
  return {
    type: types.PROCESSING_AUTHENTICATE_USER,
    authenticated: status,
  };
}
export function setState(state = {}) {
  return {
    type: types.SET_STATE,
    state,
  };
}
