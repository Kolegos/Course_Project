import React, { Component } from "react";
import { connect } from "react-redux";

class EditComponent extends Component {
  handleEdit = (e) => {
    e.preventDefault();
    const newTitle = this.getTitle.value;
    const newDescription = this.getDescription.value;
    const data = {
      newTitle,
      newDescription,
    };
    this.props.dispatch({ type: "UPDATE", id: this.props.post.id, data: data });
  };
  render() {
    return (
      <div key={this.props.post.id} className="post">
        <form className="form" onSubmit={this.handleEdit}>
          <input
            required
            type="text"
            ref={(input) => (this.getTitle = input)}
            defaultValue={this.props.post.title}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={(input) => (this.getDescription = input)}
            defaultValue={this.props.post.description}
            cols="28"
            placeholder="Enter Post"
          />
          <br />
          <br />
          <button>Update</button>
        </form>
      </div>
    );
  }
}
export default connect()(EditComponent);
