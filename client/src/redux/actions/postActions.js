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

export function loadMorePosts(number, search) {
  return function (dispatch) {
    return axios
      .get(url + `/getMore`, {
        params: {
          search,
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

export function editPostSuccess(post) {
  history.push(`/post/${post._id}`);

  return {
    type: types.EDIT_POST,
    post: post,
  };
}

export function editPost(post) {
  return function (dispatch) {
    axios.post(url + "/Edit", post).then((response) => {
      if (response.status === 200) {
        //console.log(response.data);
        dispatch(editPostSuccess(response.data));
      }
    });
  };
}

export function clearPosts() {
  return {
    type: types.CLEAR_POSTS,
  };
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
  axios
    .post(url + "/posts/add", newPost)
    .then((res) => {
      dispatch({
        type: types.ADD_POST,
        data: res.data,
      });
      history.push(`/post/${res.data._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export function searchForPosts(query) {
  console.log(query);
  return function (dispatch) {
    return axios
      .get(url + "/search", {
        params: {
          query,
        },
      })
      .then((res) => {
        dispatch(searchForPostsSuccess(res));
      });
  };
}

export function loadUserPosts(user) {
  return function (dispatch) {
    axios.post(url + "/userPosts", user).then((response) => {
      // console.log(response.data);
      if (response.status === 204) dispatch(loadUserPostsFailed(user));
      if (response.status === 200)
        dispatch(loadUserPostsSuccess(response.data));
    });
  };
}

export function loadUserPostsSuccess(posts) {
  //console.log(posts);
  return {
    type: types.LOAD_USER_POSTS_SUCCESS,
    posts: posts,
  };
}
export function loadUserPostsFailed(user) {
  return {
    type: types.LOAD_USER_POSTS_FAILED,
  };
}

export function searchForPostsSuccess(posts) {
  return {
    type: types.SEARCH_POSTS_SUCCESS,
    posts: posts,
  };
}
