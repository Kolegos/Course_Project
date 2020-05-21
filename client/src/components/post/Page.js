/* eslint-disable react/prop-types */

import React, { Component } from "react";
import PostForm from "./PostForm";

class Page extends Component {
  render() {
    return (
      <div id="container-wrapper" className="container-wrapper">
        <div
          style={{ width: "auto" }}
          id="container-inner"
          className="container-inner medium"
        >
          <PostForm />
        </div>
      </div>
    );
  }
}
export default Page;
