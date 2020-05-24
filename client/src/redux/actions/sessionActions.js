import * as types from "./actionTypes";
import axios from "axios";
import { toast } from "react-toastify";

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
        localStorage.setItem("refreshToken", response.data.refreshToken);
        dispatch(continueAuthenticateUser(response.data.user));
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Neteisingi prisijungimo duomenys");
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
          if (localStorage.refreshToken)
            axios
              .post(url + "/refreshtoken", { token: localStorage.refreshToken })
              .then((res) => {
                localStorage.setItem("token", res.data.accessToken);
                setAuthToken(localStorage.token);
                dispatch(continueAuthenticateUser(res.data.user));
              })
              .catch((err) => {
                dispatch(processAuthenticateUser(types.NOT_AUTHENTICATED));
              });
          else dispatch(processAuthenticateUser(types.NOT_AUTHENTICATED));
        });
    }
  };
}

export function logOut() {
  return function (dispatch) {
    axios
      .post(url + "/logout", { token: localStorage.refreshToken })
      .then((res) => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("token");
        dispatch(processAuthenticateUser(types.NOT_AUTHENTICATED));
      })
      .catch((err) => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("token");
        dispatch(processAuthenticateUser(types.NOT_AUTHENTICATED));
        console.log("err");
      });
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
