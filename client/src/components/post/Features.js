import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateFeatures } from "../../redux/actions/featuresActions";

const Features = ({ features, dispatch }) => {
  const [selectedFeatures, setFeatures] = useState(
    features.map((feature) => {
      return {
        feature,
        value: "",
      };
    })
  );

  useEffect(() => {
    dispatch(updateFeatures(selectedFeatures));
  }, [selectedFeatures]);

  function handleChange(event) {
    event.preventDefault();
    selectedFeatures.map((feature) => {
      if (feature.feature === event.target.name) {
        feature.value = event.target.value;
      }
    });
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

export default connect(null)(Features);
