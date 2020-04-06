/* eslint-disable react/prop-types */
import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators, compose } from "redux";

import PostForm from "./PostForm";
import AllPost from "./AllPosts";

class Page extends Component {
  render() {
    return (
      <div>
        <div>
          <h2 className="center ">Post It</h2>
        </div>
        <PostForm />
        <AllPost />
      </div>
    );
  }
}
export default Page;
