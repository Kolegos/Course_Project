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
          <tr key={post._id}>
            <td class="w-25" style={{ width: "20%" }}>
              <img
                src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg"
                className="img-fluid img-thumbnail"
                alt="Sheep"
              />
            </td>
            <td style={{ width: "10%", align: "right" }}>{post.title}</td>
            <td style={{ width: "50%" }}>{post.description}</td>
            <td style={{ width: "10%" }}>{post.category}</td>
            <td style={{ width: "10%" }}>{post.price}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default connect()(TestList);
