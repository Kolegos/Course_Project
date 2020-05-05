import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoriesActions from "../../../redux/actions/categoriesActions";
import { Link } from "react-router-dom";

const Subcategories = ({ category, categories, deleteCategory }) => {
  function handleDelete(subcategory) {
    deleteCategory(subcategory).catch((error) => {
      console.log("wasn't able to delete the subcategory");
    });
    window.location.reload(false);
  }

  return category === null ? (
    <h1>{null}</h1>
  ) : (
    <div>
      <div>
        <table className="table table-striped .table-borderless">
          <tbody>
            {categories.map((categoryFromArray) => {
              let regex = new RegExp("^" + category + "/.+");
              if (categoryFromArray.category.match(regex)) {
                //matches only the subcategories of given category
                return (
                  <tr key={categoryFromArray.category}>
                    <td>
                      <h4 style={{ textAlign: "left" }}>
                        {categoryFromArray.name}
                      </h4>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(categoryFromArray)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
              return <tr key={`div${categoryFromArray.category}`}></tr>;
            })}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="btn btn-secondary">
          <Link
            to={"/admin/categories/createSubcategory" + category}
            style={{ textDecoration: "none", color: "white" }}
          >
            Create Subcategory
          </Link>
        </button>
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
    deleteCategory: bindActionCreators(
      categoriesActions.deleteCategory,
      dispatch
    ),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Subcategories);
