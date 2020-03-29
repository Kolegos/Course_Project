/* eslint-disable react/prop-types */
import React from "react";

const TestList = ({ posts }) => (
  <table className="table">
    <tbody>
      {posts.map(post => {
        return (
          <tr key={post.id}>
            <td>{post.owner}</td>
            <td>{post.name}</td>
            <td>{post.price}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default TestList;
