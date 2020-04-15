import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators } from "redux";
import Spinner from "../misc/Spinner";

function Post({ loadOnePost, id, post = null }) {
  useEffect(() => {
    if (post === null) {
      loadOnePost(id)
        .catch((error) => {
          alert("loading post failed " + error);
        })
        .then();
    }
  });
  return post === null ? (
    <Spinner /> //history push i home
  ) : (
    <table className="table" style={{ width: 800 }}>
      <thead>
        <tr>
          <th>user</th>
          <th>title</th>
          <th style={{ width: 400 }}>description</th>
          <th>category</th>
          <th>price</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr key={post._id}>
          <td>{post.userId}</td>
          <td>{post.title}</td>
          <td>{post.description}</td>
          <td>{post.category}</td>
          <td>{post.price}</td>
        </tr>
      </tbody>
    </table>
  );
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const post = state.posts.onePost;

  return {
    id,
    post,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadOnePost: bindActionCreators(postActions.loadOnePost, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
