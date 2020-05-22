import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateCategory } from "../../redux/actions/categoriesActions";

const RecursiveDropdown = ({ parent, categories, dispatch }) => {
  const [selectedCategory, setCategory] = useState("");
  const [shouldShow, setShow] = useState(false);

  function checkIfHasChildren() {
    setShow(false);
    categories.map((categoryFromArray) => {
      if (categoryFromArray.parent === `/${selectedCategory}/`) {
        setShow(true);
        return 0;
      }
      return 0;
    });
  }

  useEffect(() => {
    setCategory("");
    if (parent !== "") dispatch(updateCategory(parent));
  }, [parent]);

  useEffect(() => {
    checkIfHasChildren();
    if (selectedCategory !== "") {
      dispatch(updateCategory(selectedCategory));
    } else {
      dispatch(updateCategory(parent));
    }
  }, [selectedCategory, checkIfHasChildren, dispatch]);

  function handleChange(event) {
    setCategory(event.target.value);
  }
  return (
    <div className={document.location.pathname === "/" ? "row  " : ""}>
      <div
        className={
          document.location.pathname !== "/" ? "mb-1 pb-1" : "mr-3 pr-2"
        }
      >
        <select id="dropdown" onChange={handleChange} className="form-control">
          <option value="">------------</option>
          {categories.map((category) => {
            if (category.parent.match(parent)) {
              return (
                <option key={category.category} value={category.category}>
                  {category.name}
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>
      </div>
      {shouldShow ? (
        <RecursiveDropdown
          parent={selectedCategory}
          categories={categories}
          dispatch={dispatch}
        />
      ) : null}
    </div>
  );
};

export default connect(null)(RecursiveDropdown);
