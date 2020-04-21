import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/postActions";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Spinner from "../misc/Spinner";

import { BrowserRouter as Router, Route } from "react-router-dom";
const url =
  process.env.NODE_ENV === `production`
    ? ``
    : "http://localhost:5000/api/images";
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      photos: [],
      selectedFiles: null,
      isLoading: false,
      isNumber: false,
      isTitle: false,
      isDescription: false,
      isPrice: false,
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.nameAppoint = this.nameAppoint.bind(this);
  }

  notify = (arr) => {
    if (arr == "title") toast.error("Title field is empty", {});
    else if (arr == "description")
      toast.error("Description field is empty!", {});
    else if (arr == "price") toast.error("Price field is empty", {});
    else if (arr == "photos") toast.error("Photos are required", {});
    else if (arr == "category") toast.error("Category is required", {});
    else toast.success("Post added");
    //toast.success("Post successfully added");
  };

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  nameAppoint(event) {
    let ph = [];
    for (let i = 0; i < event.data.locationArray.length; i++) {
      ph.push(event.data.locationArray[i]);
    }
    this.setState({ photos: ph });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const title = this.getTitle.value;
    const description = this.getDescription.value;
    const price = this.getPrice.value;
    const phoneNumber = this.getPhoneNumber.value;
    const photos = this.state.photos;
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
      userId: this.props.user.email,
      title: title,
      category: this.state.selectValue,
      price: price,
      phoneNumber: phoneNumber,
      description: description,
      photos: photos,
    };
    this.props.addPost(post);
    console.log(post);
    if (!this.post) {
      if (post.title == "") this.notify("title");
      else if (post.description == "") this.notify("description");
      else if (post.price == "") this.notify("price");
      else if (post.category == "") this.notify("category");
      else if (post.photos.length == 0) this.notify("photos");
    }
  };
  multipleFileChangedHandler = (event) => {
    this.setState({
      selectedFiles: event.target.files,
      isLoading: true,
    });
    //console.log(event.target.files);
  };

  multipleFileUploadHandler = (event) => {
    const data = new FormData();
    let selectedFiles = this.state.selectedFiles;
    // If file selected
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append("galleryImage", selectedFiles[i], selectedFiles[i].name);
      }
      this.setState({ isLoading: true });
      axios
        .post(url + "/multi", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          this.nameAppoint(response);
          this.setState({ isLoading: false });
          console.log("res", response.data.locationArray);
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                this.ocShowAlert("Max size: 2MB", "red");
              } else if ("LIMIT_UNEXPECTED_FILE" === response.data.error.code) {
                this.ocShowAlert("Max 4 images allowed", "red");
              } else {
                // If not the given ile type
                this.ocShowAlert(response.data.error, "red");
              }
            } else {
              // Success
              let fileName = response.data;
              console.log("fileName", fileName);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  ifUploaded = (arr) => {
    if (this.state.isLoading == true) {
      if (arr.length == 0)
        return (
          <div
            class="p-3 mb-2 bg-danger text-white"
            style={{ width: 400, textAlign: "center" }}
          >
            Press the button to upload the pictures
          </div>
        );
      else
        return (
          <div
            class="p-3 mb-2 bg-success text-white"
            style={{ width: 400, textAlign: "center" }}
          >
            Images uploaded, you can post now
          </div>
        );
    }
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
        <div className="form" style={{ width: 400, textAlign: "center" }}>
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
            <option value="miestas">kaimas</option>
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
            multiple
            onChange={this.multipleFileChangedHandler}
          />

          <button onClick={this.multipleFileUploadHandler}>Upload</button>

          <br />
        </div>

        <form
          className="form"
          style={{ width: 400, textAlign: "center" }}
          onSubmit={this.handleSubmit}
        >
          <button disabled={this.state.isLoading}>Post</button>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const defaultUser = {
    userId: "Undefined",
  };
  return {
    user: state.sessions.user ? state.sessions.user : defaultUser,
  };
}
export default connect(mapStateToProps, { addPost })(PostForm);
