import * as types from "./actionTypes";

export function updateFeatures(features) {
  return { type: types.UPDATE_FEATURES, features };
}
