import * as types from "./actionTypes";
import axios from "axios";

const url =
  process.env.NODE_ENV === `production`
    ? `/api`
    : "http://localhost:5000/api/categories";

export function loadCategories() {
  return function (dispatch) {
    return axios
      .get(url + `/getAll`)
      .then((categories) => dispatch(loadCategoriesSuccess(categories)));
  };
}

export function addCategory(category) {
  return function (dispatch) {
    return axios.post(url + `/add`, category).then((category) => {
      dispatch(addCategorySuccess(category));
    });
  };
}

export function deleteCategory(category) {
  return function (dispatch) {
    return axios.post(url + `/delete`, category).then(() => {
      dispatch(deleteCategorySuccess);
    });
  };
}

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

export function addCategorySuccess(category) {
  return { type: types.ADD_CATEGORY_SUCCESS, category };
}

export function deleteCategorySuccess() {
  return { type: types.DELETE_CATEGORY_SUCCESS };
}
