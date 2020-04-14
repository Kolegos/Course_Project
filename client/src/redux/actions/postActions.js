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
export const editPost = (editedPost) => (dispatch) => {
  axios.post(url + "/posts/edit", editedPost).then((post) =>
    dispatch({
      type: types.EDIT_POST,
      data: post,
    })
  );
};
export const addPost = (newPost) => (dispatch) => {
  axios.post(url + "/posts/add", newPost).then((post) =>
    dispatch({
      type: types.ADD_POST,
      data: post,
    })
  );
};
