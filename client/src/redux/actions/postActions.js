import * as types from "./actionTypes";
import axios from "axios";
const url =
  process.env.NODE_ENV === `production` ? `` : "http://localhost:7777";

export function loadPostsSuccess(posts) {
  return { type: types.LOAD_POSTS_SUCCESS, posts };
}

export function loadPosts() {
  return function(dispatch) {
    return axios
      .get(url + `/get`)
      .then(posts => dispatch(loadPostsSuccess(posts)));
  };
}
