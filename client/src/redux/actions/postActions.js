import * as types from "./actionTypes";
import axios from "axios";
import { history } from "../../redux/history";

const url =
  process.env.NODE_ENV === `production` ? `/api` : "http://localhost:5000/api";

export function loadPostsSuccess(posts) {
  return { type: types.LOAD_POSTS_SUCCESS, posts };
}

export function loadOnePostSuccess(post) {
  return { type: types.LOAD_ONE_POST_SUCCESS, post };
}

export function loadMorePosts(number) {
  return function (dispatch) {
    return axios
      .get(url + `/getMore`, {
        params: {
          number,
        },
      })
      .then((posts) => dispatch(loadPostsSuccess(posts)));
  };
}

export function loadOnePost(id) {
  return function (dispatch) {
    return axios
      .get(url + `/posts/getOne`, {
        params: {
          id,
        },
      })
      .then((post) => dispatch(loadOnePostSuccess(post)));
  };
}

export function cleanOnePost() {
  return { type: types.CLEAN_ONE_POST_SUCCESS };
}

export const editPost = (editedPost) => (dispatch) => {
  axios.post(url + "/posts/edit", editedPost).then((post) =>
    dispatch({
      type: types.EDIT_POST,
      data: post,
    })
  );
};

export function loadPosts() {
  return function (dispatch) {
    return axios
      .get(url + `/get`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((posts) => {
        dispatch(loadPostsSuccess(posts));
      })
      .catch(() => {
        history.push("/login");
      });
  };
}

export function loadLength() {
  return function (dispatch) {
    return axios
      .get(url + `/postsLength`)
      .then((length) => dispatch(loadLengthSuccess(length)));
  };
}

export function loadLengthSuccess(length) {
  return { type: types.LOAD_LENGTH_SUCCESS, length };
}

export const addPost = (newPost) => (dispatch) => {
  axios.post(url + "/posts/add", newPost).then((post) =>
    dispatch({
      type: types.ADD_POST,
      data: post,
    })
  );
};
