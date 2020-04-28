/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => (
  <div>
    <table className="table table-hover" style={{ width: "100%" }}>
      <tbody>
        {posts.map((post) => {
          return (
            <tr style={{ minWidth: "800" }} key={post._id}>
              <td style={{ width: "30%" }}>
                <img
                  src={
                    typeof post.photos === "undefined" ||
                    typeof post.photos[0] === "undefined"
                      ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                      : post.photos[0]
                  }
                  className="img-fluid img-thumbnail"
                  alt={post.title}
                />
                <p>{console.log(post.photos)}</p>
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
                  <Link to={"/post/" + post._id}>
                    <h4>{post.title}</h4>
                  </Link>
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
  </div>
);

export default PostList;
