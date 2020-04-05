import * as types from "./actionTypes";
import axios from "axios";
import { history } from "../history";

const url =
  process.env.NODE_ENV === `production` ? `` : "http://localhost:5000";

export function authenticateUser(email, password) {
  return function (dispatch) {
    axios
      .post(url + `/authenticate`, {
        email,
        password,
      })
      .then((response) => {
        dispatch(continueAuthenticateUser(response.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log("Can't authenticate");
          dispatch(processAuthenticateUser(types.NOT_AUTHENTICATED));
        }
      });
  };
}

export function continueAuthenticateUser(data) {
  return function (dispatch) {
    console.log("Authenticated!", data);

    dispatch(processAuthenticateUser(types.AUTHENTICATED));
    dispatch(setState(data));
    history.push("/profilePage");
  };
}
export function processAuthenticateUser(
  status = types.AUTHENTICATING,
  session = null
) {
  return {
    type: types.PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status,
  };
}
export function setState(state = {}) {
  return {
    type: types.SET_STATE,
    state,
  };
}
