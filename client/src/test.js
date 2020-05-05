import React, { useEffect } from "react";

const Test = (props) => {
  useEffect(() => {
    console.log(props.match.params.id);
  }, [props.match.params.id]);

  return <h1>{props.match.params.id}</h1>;
};

export default Test;
