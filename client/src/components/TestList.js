/* eslint-disable react/prop-types */
import React from "react";

const TestList = ({ posts }) => (
  <table className="table table-hover">
    <tbody>
      {posts.map((post) => {
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
            <td style={{ width: "60%" }}>{post.description}</td>
            <td style={{ width: "10%" }}>{post.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default TestList;
