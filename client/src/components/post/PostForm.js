import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/postActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loadCategories } from "../../redux/actions/categoriesActions";
import RecursiveDropdown from "./RecursiveDropdown";
import Features from "./Features";
import ImageUpload from "../misc/ImageUpload";
import Spinner from "../misc/Spinner";

const url =
  process.env.NODE_ENV === `production`
    ? `/api/images`
    : "http://localhost:5000/api/images";

export const InputRow = ({ name, input }) => {
  return (
    <tr>
      <td className="text-right pt-2" style={{ maxWidth: 200, minWidth: 100 }}>
        <h5>{name}</h5>
      </td>
      <td>
        <div
          style={{ maxWidth: 450, minWidth: 300 }}
          className="row justify-content-start ml-0"
        >
          {input}
        </div>
      </td>
    </tr>
  );
};

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
    if (arr === "title") toast.error("Reikalingas pavadinimas", {});
    else if (arr === "description") toast.error("Reikalingas aprašymas", {});
    else if (arr === "price") toast.error("Reikalinga kaina", {});
    else if (arr === "photos") toast.error("Reikalingos nuotraukos", {});
    else if (arr === "category") toast.error("Reikalinga kategorija", {});
    else if (arr === "photo") toast.error("Reikalingos nuotraukos", {});
    else toast.success("Skelbimas sėkmingai pridėtas");
  };

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  handleFiles = (files) => {
    this.setState({ photos: files });
  };

  nameAppoint(event) {
    let ph = [];
    for (let i = 0; i < event.data.locationArray.length; i++) {
      ph.push(event.data.locationArray[i]);
    }
    this.setState({ photos: ph });
  }

  handleSubmit = (e) => {
    //e.preventDefault();
    const title = this.getTitle.value;
    const description = this.getDescription.value;
    const price = this.getPrice.value;
    const phoneNumber = this.getPhoneNumber.value;
    const category = this.props.selectedCategory;
    const photos = this.state.photos;

    let valid = false;
    if (title === "") this.notify("title");
    else if (description === "") this.notify("description");
    else if (price === "") this.notify("price");
    else if (category === "") this.notify("category");
    else if (photos.length === 0) this.notify("photo");
    else valid = true;

    if (!valid) return;

    const data = new FormData();

    this.setState({ isLoading: true });
    for (let i = 0; i < this.state.photos.length; i++) {
      data.append(
        "galleryImage",
        this.state.photos[i],
        this.state.photos[i].name
      );
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
            this.setState({ isLoading: false });
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
              category: category,
              features: this.props.selectedFeatures,
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
            Pridėti paveikslėlį
          </div>
        );
      else
        return (
          <div
            class="p-3 mb-2 bg-success text-white"
            style={{ width: 400, textAlign: "center" }}
          >
            Paveikslėliai pridėti
          </div>
        );
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="row justify-content-center">Pridėti skelbimą</h1>
        <table className="table table-borderless table-sm">
          <tbody>
            <InputRow
              name="Pavadinimas "
              input={
                <input
                  required
                  type="text"
                  className="form-control"
                  ref={(input) => (this.getTitle = input)}
                  placeholder="Įveskite pavadinimą"
                />
              }
            />
            <InputRow
              name="Aprašymas "
              input={
                <textarea
                  required
                  rows="5"
                  className="form-control"
                  ref={(input) => (this.getDescription = input)}
                  cols="28"
                  placeholder="Įveskite aprašymą"
                />
              }
            />
            <InputRow
              name="Kaina "
              input={
                <input
                  required
                  type="text"
                  className="form-control"
                  ref={(input) => (this.getPrice = input)}
                  placeholder="Įveskite kainą eurais"
                />
              }
            />
            <InputRow
              name="Kategorija "
              input={
                typeof this.props.categories === "undefined" ? null : (
                  <RecursiveDropdown
                    parent="^(?![\s\S])"
                    categories={this.props.categories}
                  />
                )
              }
            />
            {typeof this.props.categories === "undefined" ? null : (
              <tr style={{ height: 20 }}>
                <td></td>
              </tr>
            )}
            {typeof this.props.categories === "undefined"
              ? null
              : this.props.categories.map((category, index) => {
                  if (category._id === this.props.selectedCategory) {
                    return (
                      <Features features={category.features} key={index} />
                    );
                  }
                })}
            <InputRow
              name="Telefono numeris"
              input={
                <input
                  type="text"
                  className="form-control"
                  ref={(input) => (this.getPhoneNumber = input)}
                  placeholder="Įveskite telefono numerį"
                />
              }
            />
          </tbody>
        </table>
        <div>
          <h2 className="text-center">Nuotraukos</h2>
          <ImageUpload onDrop={this.handleFiles} multiple={true} />
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <button
              onClick={() => {
                this.handleSubmit();
              }}
              className="mt-4 btn btn-lg btn-primary"
            >
              Pridėti skelbimą
            </button>
          )}
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
