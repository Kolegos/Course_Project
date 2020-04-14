import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import EditComponent from "./EditPost";
import axios from "axios";

const url =
  process.env.NODE_ENV === `production` ? `/api` : "http://localhost:5000/api";

class AllPost extends Component {
  addPost() {
    return;
    const newPost = {
      userId: "gaidy",
      title: "title",
      category: "category",
      description: "description",
      photos: "photos",
      phoneNumber: "phoneNumber",
    };
  }

  getPosts() {
    axios
      .get(url + "/posts", { params: { userId: "Dima" } })
      .then((posts) => {
        return posts.map((post) => {
          return <Post post={post} key={post._id} />;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1 className="post_heading">All Posts</h1>
        {this.getPosts()}
        {this.props.posts.posts2.map((post) => (
          <div key={post.id}>
            <Post post={post} key={post.id} />
          </div>
        ))}
      </div>
    );
  }
}

/*
        {this.props.posts.posts2.map((post) => (
          <div key={post.id}>
            {post.editing ? (
              <EditComponent post={post} key={post.id} />
            ) : (
              <Post post={post} key={post.id} />
            )}
          </div>
        ))}
*/

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};

export default connect(mapStateToProps)(AllPost);
