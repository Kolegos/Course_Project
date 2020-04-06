import * as types from "./actionTypes";
import axios from "axios";

const url =
  process.env.NODE_ENV === `production` ? `/api` : "http://localhost:5000/api";

export function loadPostsSuccess(posts) {
  return { type: types.LOAD_POSTS_SUCCESS, posts };
}

export function loadPosts() {
  return function (dispatch) {
    return axios
      .get(url + `/get`)
      .then((posts) => dispatch(loadPostsSuccess(posts)));
  };
}

export const addPost = (newPost) => (dispatch) => {
  axios.post(url + "/posts/add", newPost).then((post) =>
    dispatch({
      type: "ADD_POST",
      data: post,
    })
  );
};
