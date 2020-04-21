import * as types from "../actions/actionTypes";
import { bindActionCreators } from "redux";

export default function postReducer(state = [], action) {
  switch (action.type) {
    case types.SET_STATE:
      return action.state.posts;
    case types.CREATE_POST_SUCCESS:
      return [...state, { ...action.state }];
    case types.LOAD_POSTS_SUCCESS:
      //console.log(state.data, "AS ESU GAISENA");
      //console.log(Array.isArray(action.posts.data));
      //console.log(Array.isArray(state.data));
      //return Array.isArray(state.data)
      // ? state.data.concat(action.posts.data)
      //: action.posts;
      //debugger;
      //let postsToReturn;

      //if (typeof state.posts.data !== "undefined") {
      //postsToReturn = state.posts.concat(action.posts.data);
      //console.log("zjbs");
      //} else {
      //postsToReturn = action.posts;
      //console.log("pirmasyk zjbs");
      //}
      if (typeof state.posts !== "undefined") {
        let postsToReturn = state.posts.concat(action.posts.data);
        return { ...state, posts: postsToReturn };
      } else {
        return { ...state, posts: action.posts.data };
      }
    case types.LOAD_ONE_POST_SUCCESS:
      return { ...state, onePost: action.post.data[0] };
    case types.LOAD_LENGTH_SUCCESS:
      return { ...state, length: action.length.data };
    default:
      return state;
  }
}
