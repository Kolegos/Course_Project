import * as types from "./actionTypes";
import axios from "axios";

const url =
  process.env.NODE_ENV === `production` ? `/api` : "http://localhost:5000/api";

export function loadCommentsSuccess(comments) {
  return { type: types.LOAD_COMMENTS, comments };
}

export function LoadComments(postID) {
  return function (dispatch) {
    return axios
      .get(url + "/comments", { params: { PostID: postID } })
      .then((comments) => dispatch(loadCommentsSuccess(comments)))
      .catch((err) => {
        console.log(err);
      });
  };
}

export function addNewComment(newCom) {
  return function (dispatch) {
    return axios
      .post(url + "/comments/add", newCom)
      .then((res) => {
        dispatch({
          type: types.ADD_COMMENT,
          data: res.data,
        });
        // history.push(`/post/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
