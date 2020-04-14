/* eslint-disable react/prop-types */
import React from "react";

const TestList = ({ posts }) => (
  <table className="table">
    <thead>
      <tr>
        <th>user</th>
        <th>title</th>
        <th>description</th>
        <th>category</th>
      </tr>
    </thead>
    <tbody>
      {posts.map((post) => {
        return (
          <tr key={post._id}>
            <td style={{ height: 80 }}>{post.userId}</td>
            <td>{post.title}</td>
            <td>{post.description}</td>
            <td>{post.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default TestList;
