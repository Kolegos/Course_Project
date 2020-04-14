/* eslint-disable react/prop-types */
import React from "react";

const TestList = ({ posts }) => (
  <table className="table table-hover" style={{ width: "100%" }}>
    <tbody>
      {posts.map((post) => {
        return (
          <tr style={{ minWidth: "800" }} key={post._id}>
            <td style={{ width: "30%" }}>
              <img
                src="https://images.unsplash.com/photo-1533299346856-b1a85808f2ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
                className="img-fluid img-thumbnail"
                alt="Sheep"
              />
            </td>
            <td
              style={{
                width: "60%",
                maxWidth: "0",
                overflowWrap: "break-word",
                textOverflow: "ellipsis",
              }}
            >
              <div>
                <h6>{post.title}</h6>
              </div>
              <div
                style={{
                  maxHeight: 150,
                  overflow: "auto",
                  textOverflow: "ellipsis",
                  whiteSpace: "pre-wrap",
                }}
              >
                <p>{post.description}</p>
              </div>
            </td>
            <td style={{ width: "15%" }}>
              <h6>{post.price} €</h6>
              <p>{post.category}</p>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default TestList;
