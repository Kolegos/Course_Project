import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateFeatures } from "../../redux/actions/featuresActions";
import { InputRow } from "./PostForm";

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
  }, [selectedFeatures, dispatch]);

  function handleChange(event) {
    event.preventDefault();
    selectedFeatures.map((feature) => {
      if (feature.feature === event.target.name) {
        feature.value = event.target.value;
      }
      return 0;
    });
  }

  return features.map((feature, index) => {
    return (
      <InputRow
        key={index}
        name={feature}
        input={
          <input
            type="text"
            placeholder={feature}
            name={feature}
            className="form-control"
            onChange={handleChange}
            required
          />
        }
      />
    );
  });
};

export default connect(null)(Features);
