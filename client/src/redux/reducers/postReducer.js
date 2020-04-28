import * as types from "../actions/actionTypes";
import { bindActionCreators } from "redux";

export default function postReducer(state = [], action) {
  switch (action.type) {
    case types.SET_STATE:
      return action.state.posts;
    case types.CREATE_POST_SUCCESS:
      return [...state, { ...action.state }];
    case types.LOAD_POSTS_SUCCESS:
      if (typeof state.posts !== "undefined") {
        let postsToReturn = state.posts.concat(action.posts.data);
        return { ...state, posts: postsToReturn };
      } else {
        return { ...state, posts: action.posts.data };
      }
    case types.LOAD_ONE_POST_SUCCESS:
      return { ...state, onePost: action.post.data[0] };
    case types.CLEAN_ONE_POST_SUCCESS:
      return { ...state, onePost: null };
    case types.LOAD_LENGTH_SUCCESS:
      return { ...state, length: action.length.data };
    default:
      return state;
  }
}
