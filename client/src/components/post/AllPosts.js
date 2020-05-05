import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import EditComponent from "./EditPost";
import axios from "axios";

const url =
  process.env.NODE_ENV === `production` ? `/api` : "http://localhost:5000/api";

class AllPost extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios
      .get(url + "/posts", { params: { userId: "Dima" } })
      .then((posts) => {
        console.log(posts.data);
        this.setState({ posts: posts.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  mapPosts() {
    console.log(this.state.posts);
    return <Post post={this.state.posts} key={this.state.posts._id} />;
  }

  render() {
    return (
      <div>
        <h1 className="post_heading">All Posts</h1>
        {this.mapPosts()}
        {this.props.posts.posts2.map((post) => (
          <div key={post.id}>
            <Post post={post} key={post.id} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};

export default connect(mapStateToProps)(AllPost);
