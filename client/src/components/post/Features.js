import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateFeatures } from "../../redux/actions/featuresActions";
import { InputRow } from "./PostForm";

const Features = ({ features, features2, dispatch, value = null }) => {
  const [selectedFeatures, setFeatures] = useState(
    features.map((feature) => {
      return {
        feature,
        value: "",
      };
    })
  );

  const [defaultValue, setDefaultValue] = useState(value);

  useEffect(() => {
    if (value) dispatch(updateFeatures(value));
    else dispatch(updateFeatures(selectedFeatures));
  }, []);

  function handleChange(event, index) {
    event.preventDefault();
    const features = JSON.parse(JSON.stringify([...features2]));
    features[index].value = event.target.value;
    setFeatures(features);
    dispatch(updateFeatures(features));
  }

  return features2.map((feature, index) => {
    return (
      <InputRow
        key={index}
        name={feature.feature}
        input={
          <input
            type="text"
            placeholder={feature.feature}
            name={feature.feature}
            className="form-control"
            value={feature.value}
            onChange={(e) => handleChange(e, index)}
            required
          />
        }
      />
    );
  });
};

function mapStateToProps(state) {
  return {
    features2:
      state.features && state.features.updatedFeatures
        ? state.features.updatedFeatures
        : [],
  };
}

export default connect(mapStateToProps)(Features);
