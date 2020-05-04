import * as types from "../actions/actionTypes";

export default function userReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return { ...state, created: types.CREATE_USER_SUCCESS };
    case types.CREATE_USER_FAILED:
      return { ...state, created: types.CREATE_USER_FAILED };
    case types.EDIT_USER:
      return { ...state, edited: types.EDIT_USER };
    default:
      return state;
  }
}
