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

  const [features, setFeatures] = useState([]);
  const [featuresFromParent, setFeaturesFromParent] = useState([]);

  useEffect(() => {
    if (categories.length === 0) loadCategoriesFromDB();
  });

  useEffect(() => {
    getFeaturesFromParent(id);
  }, [categories, getFeaturesFromParent, id]);

  function loadCategoriesFromDB() {
    loadCategories().catch((error) => {
      console.log("loading categories failed" + error);
    });
  }

  function getFeaturesFromParent(name) {
    categories.map((category) => {
      if (category._id === name) {
        setFeaturesFromParent(category.features);
      }
    });
  }

  function handleChange(event) {
    event.preventDefault();
    const updatedCategory = {
      ...newCategory,
      [event.target.name]:
        event.target.name === "category"
          ? `${event.target.value}`
          : event.target.value,
    };
    setCategory(updatedCategory);
  }

  function handleFeatureChange(event) {
    event.preventDefault();
    const whichElement = event.target.name.slice(event.target.name.length - 1);
    features.map((feature, index) => {
      if (index.toString() === whichElement) {
        features[index] = event.target.value;
      }
      return 0;
    });
  }

  function handleFeatureClick(event) {
    event.preventDefault();
    setFeatures(features.concat({}));
  }

  function handleSave(event) {
    event.preventDefault();
    newCategory.features = featuresFromParent.concat(features);
    newCategory.parent = id === "" ? "" : `/${id}/`;
    console.log(newCategory.parent, id, "aass");
    addCategory(newCategory).catch((error) => {
      console.log(error + "was not able to add category");
    });
    history.push("/admin/categories");
  }

  return categories.length === 0 ? (
    <h1>loading...</h1>
  ) : (
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner">
        <div className="container">
          <form>
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
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span>Features</span>
                {features.map((feature, index) => {
                  return (
                    <div key={`div${index}`}>
                      <input
                        key={`name${index}`}
                        type="text"
                        placeholder="feature"
                        name={`name${index}`}
                        className="form-control"
                        onChange={handleFeatureChange}
                        required
                      ></input>
                      <button
                        key={index}
                        className="btn btn-sm btn-danger m-2"
                        onClick={() => {
                          setFeatures(
                            features.filter((feature, id) => {
                              return id !== index;
                            })
                          );
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </label>
              <div>
                <button
                  className="btn btn-outline-secondary m-2"
                  onClick={handleFeatureClick}
                >
                  Add Feature
                </button>
              </div>
            </div>
            <button
              className="btn btn-info"
              type="submit"
              disabled={typeof features[0] === "undefined" ? true : false}
              onClick={handleSave}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const id =
    typeof ownProps.match.params.id !== "undefined"
      ? ownProps.match.params.id
      : "";
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
