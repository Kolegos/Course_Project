import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/postActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loadCategories } from "../../redux/actions/categoriesActions";
import RecursiveDropdown from "./RecursiveDropdown";
import Features from "./Features";

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
      categories: [],
      features: [{}],
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.nameAppoint = this.nameAppoint.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories().catch((error) => {
      console.log(error + "Loading categories failed");
    });
  }

  notify = (arr) => {
    if (arr === "title") toast.error("Title field is empty", {});
    else if (arr === "description")
      toast.error("Description field is empty!", {});
    else if (arr === "price") toast.error("Price field is empty", {});
    else if (arr === "photos") toast.error("Photos are required", {});
    else if (arr === "category") toast.error("Category is required", {});
    else toast.success("Post added");
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
    const category = (this.handleDropdownChange = this.handleDropdownChange.bind(
      this
    ));

    let valid = false;
    if (title === "") this.notify("title");
    else if (description === "") this.notify("description");
    else if (price === "") this.notify("price");
    else if (category === "") this.notify("category");
    else valid = true;

    if (!valid) return;

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
          this.setState({ isLoading: false });
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                this.ocShowAlert("Max size: 2MB", "red");
              } else if ("LIMIT_UNEXPECTED_FILE" === response.data.error.code) {
                this.ocShowAlert("Max 4 images allowed", "red");
              } else {
                // If not the given file type
                this.ocShowAlert(response.data.error, "red");
              }
            } else {
              // Success
              this.nameAppoint(response);
              const post = {
                userId: this.props.user.email,
                title: title,
                category: this.state.selectValue,
                price: price,
                phoneNumber: phoneNumber,
                description: description,
                photos: this.state.photos,
              };
              this.props.addPost(post);
              this.notify("success");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  multipleFileChangedHandler = (event) => {
    this.setState({
      selectedFiles: event.target.files,
      isLoading: true,
    });
  };

  ifUploaded = (arr) => {
    if (this.state.isLoading === true) {
      if (arr.length === 0)
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
      <div>
        <h1 className="row justify-content-center">Create Post</h1>
        <div className="container">
          <div className="form">
            <div>
              <h5>Title</h5>
              <input
                required
                type="text"
                ref={(input) => (this.getTitle = input)}
                placeholder="Enter Post Title"
              />
            </div>
            <div className="pt-4">
              <h5>Description</h5>
              <textarea
                required
                rows="5"
                ref={(input) => (this.getDescription = input)}
                cols="28"
                placeholder="Enter description"
              />
            </div>
            <div className="pt-4">
              <h5>Price</h5>
              <input
                required
                type="text"
                ref={(input) => (this.getPrice = input)}
                placeholder="Enter price in €"
              />
            </div>
            <div className="pt-4">
              <h5>Category</h5>
              {typeof this.props.categories === "undefined" ? null : (
                <RecursiveDropdown
                  parent="^(?![\s\S])"
                  categories={this.props.categories}
                />
              )}
            </div>
            <div>
              {typeof this.props.categories === "undefined" ? null : (
                <div>
                  {this.props.categories.map((category) => {
                    if (category.category === this.props.selectedCategory) {
                      return <Features features={category.features} />;
                    }
                  })}
                </div>
              )}
            </div>
            <div className="pt-4">
              <h5>Phone number</h5>
              <input
                type="text"
                ref={(input) => (this.getPhoneNumber = input)}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="pt-4">
              <input
                id="input-b1"
                name="input-b1"
                type="file"
                multiple
                className="file"
                onChange={this.multipleFileChangedHandler}
                data-browse-on-zone-click="true"
              ></input>
            </div>
          </div>
          <form className="form" onSubmit={this.handleSubmit}>
            <button className="mt-4 btn btn-primary">Post</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const defaultUser = {
    userId: "Undefined",
  };
  return {
    selectedCategory: state.categories.updatedCategory,
    user: state.sessions.user ? state.sessions.user : defaultUser,
    categories: state.categories.categories,
    selectedFeatures: state.features.updatedFeatures,
  };
}
export default connect(mapStateToProps, { addPost, loadCategories })(PostForm);
