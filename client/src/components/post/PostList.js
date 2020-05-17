/* eslint-disable react/prop-types */
import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts }) => (
  <div className="d-flex flex-wrap justify-content-center">
    {posts.map((post, index) => (
      <PostCard post={post} key={index} />
    ))}
  </div>
);

export default PostList;
