import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function sessionReducer(
  userSession = initialState.session || {},
  action
) {
  let { type, authenticated } = action;
  switch (type) {
    case types.SET_STATE:
      return { ...userSession, id: action.state.session.id };
    case types.AUTHENTICATE_USER:
      return { ...userSession, authenticated: types.AUTHENTICATING };
    case types.PROCESSING_AUTHENTICATE_USER:
      return { ...userSession, authenticated };
    case types.AUTHENTICATED:
      return { ...userSession, ...authenticated, user: action.user };
    default:
      return userSession;
  }
}
