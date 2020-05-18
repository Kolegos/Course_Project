import * as types from "../actions/actionTypes";

export default function featuresReducer(state = [], action) {
  switch (action.type) {
    case types.UPDATE_FEATURES:
      return { ...state, updatedFeatures: action.features };
    default:
      return state;
  }
}
