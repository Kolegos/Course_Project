import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/postActions";

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const description = this.getDescription.value;

    const data = {
      id: new Date(),
      title,
      description,
      editing: false,
    };
    const post = {
      userId: "N/A",
      title: title,
      category: "category",
      description: description,
      photos: "photos",
      phoneNumber: "phoneNumber",
    };
    this.props.addPost(post);
    /*
    this.props.dispatch({
      type: "ADD_POST",
      data,
    });*/
    this.getTitle.value = "";
    this.getDescription.value = "";
  };
  render() {
    return (
      <div className="post-container">
        <h1 className="post_heading">Create Post</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            ref={(input) => (this.getTitle = input)}
            placeholder="Enter Post Title"
          />

          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={(input) => (this.getDescription = input)}
            cols="28"
            placeholder="Enter description"
          />
          <br />
          <br />
          <button>Post</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(PostForm);
