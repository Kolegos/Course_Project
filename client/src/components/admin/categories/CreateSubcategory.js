import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoriesActions from "../../../redux/actions/categoriesActions";
import { history } from "../../../redux/history";

const CreateSubcategory = ({
  loadCategories,
  addCategory,
  categories = [],
  id,
}) => {
  const [newCategory, setCategory] = useState({
    parent: `/${id}`,
    features: [],
  });

  useEffect(() => {
    if (categories.length === 0) loadCategoriesFromDB();
  });

  function loadCategoriesFromDB() {
    loadCategories().catch((error) => {
      console.log("loading categories failed" + error);
    });
  }

  function handleChange(event) {
    event.preventDefault();
    const updatedCategory = {
      ...newCategory,
      [event.target.name]:
        event.target.name === "category"
          ? `/${id}${event.target.value}`
          : event.target.value,
    };
    setCategory(updatedCategory);
  }

  function handleSave(event) {
    event.preventDefault();
    categories.map((category) => {
      if (category.name === newCategory.name) return;
    });
    newCategory.features = event.target[2].value.split(",");
    addCategory(newCategory).catch((error) => {
      console.log(error + "was not able to add category");
    });
    history.push("/admin/categories");
  }

  return categories.length === 0 ? (
    <h1>loading...</h1>
  ) : (
    <div className="container">
      <form onSubmit={handleSave}>
        <h2>Add subcategory of {id}</h2>
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
        <div>
          <label>
            <span>Features</span>
            <input
              type="text"
              placeholder="features"
              name="features"
              className="form-control"
              required
            />
          </label>
        </div>
        <button className="btn btn-info" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  return {
    categories: state.categories.categories,
    id,
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateSubcategory);
