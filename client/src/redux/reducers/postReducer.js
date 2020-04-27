import * as types from "../actions/actionTypes";

export default function postReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_POST_SUCCESS:
      return [...state, { ...action.state }];
    case types.LOAD_POSTS_SUCCESS:
      return action.posts;
    default:
      return state;
  }
}
