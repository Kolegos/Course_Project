import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoriesActions from "../../../redux/actions/categoriesActions";
import { history } from "../../../redux/history";

const CreateCategory = ({ loadCategories, addCategory, categories = [] }) => {
  const [newCategory, setCategory] = useState({ parent: "" });

  useEffect(() => {
    if (categories.length === 0) loadCategoriesFromDB();
  });

  function loadCategoriesFromDB() {
    debugger;
    loadCategories().catch((error) => {
      console.log("loading categories failed" + error);
    });
  }

  function handleChange(event) {
    event.preventDefault();
    const updatedCategory = {
      ...newCategory,
      [event.target.name]: event.target.value,
    };
    setCategory(updatedCategory);
  }
  function handleSave(event) {
    event.preventDefault();
    addCategory(newCategory).catch((error) => {
      console.log(error + "was not able to add category");
    });
    history.push("/admin/categories");
    return;
  }

  return categories.length === 0 ? (
    <h1>loading...</h1>
  ) : (
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner">
        <div className="container">
          <form onSubmit={handleSave}>
            <h2>Add category</h2>
            <div>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span>Category path</span>
                <input
                  type="text"
                  placeholder="category"
                  name="category"
                  className="form-control"
                  pattern="^\/.+"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button className="btn btn-info" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: bindActionCreators(
      categoriesActions.loadCategories,
      dispatch
    ),
    addCategory: bindActionCreators(categoriesActions.addCategory, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);
