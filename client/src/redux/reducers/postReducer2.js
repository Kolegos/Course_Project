import * as types from "../actions/actionTypes";

const postReducer2 = (state = [], action) => {
  switch (action.type) {
    case types.ADD_POST: {
      return state.concat([action.data]);
    }
    case types.GET_POST: {
      return state.concat([action.data]);
    }
    case types.DELETE_POST:
      return state.filter((post) => post.id !== action.id);
    case types.EDIT_POST:
      return { ...state, edited: types.EDIT_POST };
    default:
      return state;
  }
};
export default postReducer2;
