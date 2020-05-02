import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Subcategories from "./Subcategories";
import * as categoriesActions from "../../../redux/actions/categoriesActions";
import { Link } from "react-router-dom";

const Categories = ({ loadCategories, deleteCategory, categories = [] }) => {
  const [subcategoriesToShow, setSubcategories] = useState(null);

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

  function handleDelete(category) {
    deleteCategory(category).catch((error) => {
      console.log("wasn't able to delete the subcategory");
    });
    window.location.reload(false);
  }

  return categories.length === 0 ? (
    <h1>loading...</h1>
  ) : (
    <>
      <h1 style={{ textAlign: "center" }}>Categories</h1>
      <div className="row">
        <div className="col-6 m-2 floatLeft">
          <table className="table table-borderless">
            <tbody>
              {categories.map((category) => {
                if (category.parent.match(/^(?![\s\S])/)) {
                  //shows the main categories (blue buttons)
                  return (
                    <tr>
                      <td>
                        <button
                          className="btn btn-primary btn-lg m-2"
                          onClick={() => setSubcategories(category.category)}
                        >
                          {category.name}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-lg m-2"
                          onClick={() => handleDelete(category)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-secondary btn-lg">
              <Link
                to={"/admin/categories/create"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Create Category
              </Link>
            </button>
          </div>
        </div>
        <div className="col-6 m-2 floatRight">
          <Subcategories category={subcategoriesToShow} />
        </div>
      </div>
    </>
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
