import * as types from "../actions/actionTypes";
import axios from "axios";
import { history } from "../history";

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
export function editUserSuccess(user) {
  history.push("/profilepage");
  return {
    type: types.EDIT_USER,
    user: user,
  };
}

export function editUser(user) {
  return function (dispatch) {
    axios.post(url + "/edit/EditProfilePage", user).then((response) => {
      if (response.status === 200) {
        dispatch(editUserSuccess(response.data));
      }
    });
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

export function getUser(user) {
  return function (dispatch) {
    axios.post(url + "/users/", { id: user }).then((response) => {
      if (response.status === 200) {
        dispatch(getUserSuccess(response.data));
      }
    });
  };
}

export function getUserSuccess(user) {
  return { type: types.GET_USER, user: user };
}
