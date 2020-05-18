import React, { useState, useEffect } from "react";

const Features = ({ features }) => {
  const [selectedFeatures, setFeatures] = useState(
    features.map((feature) => {
      return {
        feature,
        value: "",
      };
    })
  );

  function handleChange(event) {
    event.preventDefault();
    selectedFeatures.map((feature) => {
      if (feature.feature === event.target.name) {
        feature.value = event.target.value;
      }
    });
    console.log(selectedFeatures);
  }

  return features.map((feature, index) => {
    return (
      <>
        <form>
          <div>
            <label>
              <span>{feature}</span>
              <input
                type="text"
                placeholder={feature}
                name={feature}
                className="form-control"
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </form>
      </>
    );
  });
};

export default Features;
