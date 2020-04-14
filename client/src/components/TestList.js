/* eslint-disable react/prop-types */
import React from "react";
import EditComponent from "./Post/EditPost";
import { Link } from "react-router-dom";
import * as types from "../redux/actions/actionTypes";
import { connect } from "react-redux";
import Test from "./Test";

const TestList = ({ posts }) => (
  <table className="table" style={{ width: 800 }}>
    <thead>
      <tr>
        <th>user</th>
        <th>title</th>
        <th style={{ width: 400 }}>description</th>
        <th>category</th>
        <th>price</th>
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
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default connect()(TestList);
