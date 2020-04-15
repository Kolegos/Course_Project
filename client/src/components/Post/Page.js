/* eslint-disable react/prop-types */
import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators, compose } from "redux";

import PostForm from "./PostForm";
import AllPost from "./AllPosts";
import CurrentPost from "./CurrentPost";

class Page extends Component {
  render() {
    return (
      <div>
        <PostForm />
      </div>
    );
  }
}
export default Page;
