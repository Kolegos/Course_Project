/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as postActions from "../redux/actions/postActions";
import { bindActionCreators } from "redux";
import TestList from "./TestList";

function Test({ load, posts = [] }) {
  useEffect(() => {
    if (posts.length === 0) {
      load().catch(error => {
        alert("loading posts failed " + error);
      });
    }
  });

  return (
    <div>
      <h1>Database Test</h1>
      <TestList posts={posts} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    posts: state.posts.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load: bindActionCreators(postActions.loadPosts, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
