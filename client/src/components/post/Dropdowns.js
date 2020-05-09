import React, { useState, useEffect } from "react";

const Dropdowns = ({ categories }) => {
  const RecursiveDropdown = ({ parent, categories }) => {
    const [selectedCategory, setCategory] = useState("");
    const [shouldShow, setShow] = useState(false);

    function checkIfHasChildren() {
      setShow(false);
      categories.map((categoryFromArray) => {
        if (categoryFromArray.parent === `/${selectedCategory}/`) {
          setShow(true);
        }
      });
    }

    useEffect(() => {
      setCategory("");
    }, [parent]);

    useEffect(() => {
      checkIfHasChildren();
    }, [selectedCategory]);

    function handleChange(event) {
      setCategory(event.target.value);
    }
    return (
      <>
        <select id="dropdown" onChange={handleChange}>
          <option value="">------------</option>
          {categories.map((category) => {
            if (category.parent.match(parent)) {
              return <option value={category.category}>{category.name}</option>;
            }
          })}
        </select>
        {shouldShow ? (
          <RecursiveDropdown
            parent={selectedCategory}
            categories={categories}
          />
        ) : null}
      </>
    );
  };

  return <RecursiveDropdown parent="^(?![\s\S])" categories={categories} />;
};

export default Dropdowns;
