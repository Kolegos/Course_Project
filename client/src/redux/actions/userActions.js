import * as types from "../actions/actionTypes";
import axios from "axios";

const url =
  process.env.NODE_ENV === `production` ? `/api` : "http://localhost:5000/api";

export function createUserFailed() {
  return {
    type: types.CREATE_USER_FAILED,
  };
}

export function createUserSuccessful() {
  return {
    type: types.CREATE_USER_SUCCESS,
  };
}

export function createUser(user) {
  return function (dispatch) {
    axios.post(url + "/users/create", user).then((response) => {
      if (response.status === 204) dispatch(createUserFailed());
      if (response.status === 200) dispatch(createUserSuccessful());
    });
  };
}
