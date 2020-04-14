import * as types from "./actionTypes";
import axios from "axios";
import { history } from "../../redux/history";

const url =
  process.env.NODE_ENV === `production` ? `/api` : "http://localhost:5000/api";

export function loadPostsSuccess(posts) {
  return { type: types.LOAD_POSTS_SUCCESS, posts };
}

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

export const addPost = (newPost) => (dispatch) => {
  axios.post(url + "/posts/add", newPost).then((post) =>
    dispatch({
      type: "ADD_POST",
      data: post,
    })
  );
};
