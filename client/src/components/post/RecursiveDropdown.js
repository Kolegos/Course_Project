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
  }, [parent]);

  useEffect(() => {
    checkIfHasChildren();
    dispatch(updateCategory(selectedCategory));
  }, [selectedCategory, checkIfHasChildren, dispatch]);

  function handleChange(event) {
    setCategory(event.target.value);
  }
  return (
    <>
      <select id="dropdown" onChange={handleChange}>
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
      {shouldShow ? (
        <RecursiveDropdown
          parent={selectedCategory}
          categories={categories}
          dispatch={dispatch}
        />
      ) : null}
    </>
  );
};

export default connect(null)(RecursiveDropdown);
