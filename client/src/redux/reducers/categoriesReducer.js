import * as types from "../actions/actionTypes";

export default function categoriesReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      if (typeof state.categories !== "undefined") {
        let categoriesToReturn = state.categories.concat(
          action.categories.data
        );
        return { ...state, categories: categoriesToReturn };
      } else {
        return { ...state, categories: action.categories.data };
      }
    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.concat([action.category.data]),
      };
    case types.DELETE_CATEGORY_SUCCESS:
      return state;
    default:
      return state;
  }
}
