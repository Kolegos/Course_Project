import * as types from "../actions/actionTypes";

export default function commentsReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_COMMENTS:
      return { ...state, comment: action.comments.data };
    case types.ADD_COMMENT:
      return { ...state, newcomment: action.comments.data };
    default:
      return state;
  }
}
