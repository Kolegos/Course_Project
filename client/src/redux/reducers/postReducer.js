import * as types from "../actions/actionTypes";
import { toast } from "react-toastify";

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
      return { ...state, onePost: action.post.data[0], length: 0, posts: [] };
    case types.CLEAN_ONE_POST_SUCCESS:
      return { ...state, onePost: null };
    case types.LOAD_LENGTH_SUCCESS:
      return {
        ...state,
        length: action.length.data,
        loaded: state.loaded === "0" ? "1" : "0",
      };
    case types.LOAD_USER_POSTS_SUCCESS:
      return { ...state, posts: action.posts };
    case types.LOAD_USER_POSTS_FAILED:
      return { ...state, posts: types.LOAD_USER_POSTS_FAILED };
    case types.EDIT_POST:
      toast.success("Skelbimo redagavimas išsaugotas");
      return {
        ...state,
        onePost: null,
      };
    case types.SEARCH_POSTS_SUCCESS:
      return { ...state, postsFromSearch: action.posts.data };
    case types.CLEAR_POSTS:
      return { ...state, posts: [] };
    default:
      return state;
  }
}
