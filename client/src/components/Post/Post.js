import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators } from "redux";

const Post = ({ posts }) => (
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
      {posts.map((post) => {
        console.log(post);
        return (
          <tr key={post.id}>
            <td>{post.userId}</td>
            <td>{post.title}</td>
            <td>{post.description}</td>
            <td>{post.category}</td>
            <td>{post.price}</td>
            <td>
              <a href="login">View</a>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default connect()(Post);
