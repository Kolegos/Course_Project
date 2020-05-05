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
    case types.EDIT_USER:
      return {
        ...userSession,
        user: {
          ...userSession.user,
          city: action.user.city,
          email: action.user.email,
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          phoneNumber: action.user.phoneNumber,
          profilePicture: action.user.profilePicture,
        },
      };
    default:
      return userSession;
  }
}
