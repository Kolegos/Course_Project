import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoriesActions from "../../../redux/actions/categoriesActions";
import { Link } from "react-router-dom";

const Categories = ({ loadCategories, categories = [] }) => {
  useEffect(() => {
    if (categories.length === 0) {
      loadCategoriesFromDB();
    }
  });

  function loadCategoriesFromDB() {
    loadCategories().catch((error) => {
      console.log("loading categories failed" + error);
    });
  }

  const RecursiveComponent = ({ parent }) => {
    return (
      <div>
        {categories.map((category) => {
          if (category.parent.match(parent)) {
            return (
              <ul key={category.category}>
                <h1>
                  {category.name} ({category.category})
                </h1>
                <ol>
                  {category.features.map((feature) => {
                    return <li key={feature}>{feature}</li>;
                  })}
                </ol>
                <RecursiveComponent parent={`^/${category._id}`} />
                <Link
                  to={"/admin/categories/createSubcategory/" + category._id}
                >
                  Create Subcategory of {category.category}
                </Link>
              </ul>
            );
          }
        })}
      </div>
    );
  };

  return categories.length === 0 ? (
    <h1>loading...</h1>
  ) : (
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner">
        <ul>
          <RecursiveComponent parent="^(?![\s\S])" />
          <Link to={"/admin/categories/createSubcategory/"}>
            Create Category
          </Link>
        </ul>
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
    deleteCategory: bindActionCreators(
      categoriesActions.deleteCategory,
      dispatch
    ),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
