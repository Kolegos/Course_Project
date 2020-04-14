import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/postActions";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PostForm extends Component {
  notify = () => toast.success("Post successfully added");

  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const description = this.getDescription.value;
    const price = this.getPrice.value;
    const phoneNumber = this.getPhoneNumber.value;
    const photos = [];
    const category = (this.handleDropdownChange = this.handleDropdownChange.bind(
      this
    ));

    const data = {
      id: new Date(),
      title,
      description,
      price,
      category,
      phoneNumber,
      photos,
      editing: false,
    };
    const post = {
      userId: "N/A",
      title: title,
      category: this.state.selectValue,
      price: price,
      phoneNumber: phoneNumber,
      description: description,
      photos: photos,
    };
    this.props.addPost(post);

    this.getTitle.value = "";
    this.getDescription.value = "";
    this.getPrice.value = "";
    this.getPhoneNumber.value = "";
  };
  render() {
    return (
      <div className="post-container">
        <h1
          className="post_heading"
          style={{ width: 400, textAlign: "center" }}
        >
          Create Post
        </h1>
        <br />
        <br />
        <form
          className="form"
          style={{ width: 400, textAlign: "center" }}
          onSubmit={this.handleSubmit}
        >
          <h5>Title</h5>
          <input
            required
            type="text"
            ref={(input) => (this.getTitle = input)}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <h5>Description</h5>
          <textarea
            required
            rows="5"
            ref={(input) => (this.getDescription = input)}
            cols="28"
            placeholder="Enter description"
          />
          <br />
          <br />
          <h5>Price</h5>
          <input
            required
            type="text"
            ref={(input) => (this.getPrice = input)}
            placeholder="Enter price in €"
          />
          <br />
          <br />
          <h5>Category</h5>
          <select id="dropdown" onChange={this.handleDropdownChange}>
            <option value="N/A">N/A</option>
            <option value="Skaudvile">Skaudvile</option>
            <option value="yra">yra</option>
            <option value="didelis">didelis</option>
            <option value="kaimas">kaimas</option>
          </select>
          <br />
          <br />
          <h5>Phone number</h5>
          <input
            type="text"
            ref={(input) => (this.getPhoneNumber = input)}
            placeholder="Enter your phone number"
          />
          <br />
          <br />
          <h5>Photos</h5>
          <input
            type="file"
            id="file"
            multiple
            onBlur={(e) => {
              let ph = [];
              for (let i = 0; i < e.currentTarget.files.length; i++) {
                ph.push(e.currentTarget.files[i]);
              }
              console.log(ph);
            }}
            //ref={(input) => (this.getPhotos = input)}
          />
          <br />
          <br />
          <button onClick={this.notify}>Post</button>
          <ToastContainer />
        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(PostForm);
