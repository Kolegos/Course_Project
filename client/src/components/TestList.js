/* eslint-disable react/prop-types */
import React from "react";

const TestList = ({ posts }) => (
  <table className="table" style={{ width: 800 }}>
    <thead>
      <tr>
        <th>user</th>
        <th>title</th>
        <th style={{ width: 400 }}>description</th>
        <th>category</th>
      </tr>
    </thead>
    <tbody>
      {posts.map((post) => {
        return (
          <tr key={post.id}>
            <td>{post.userId}</td>
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
