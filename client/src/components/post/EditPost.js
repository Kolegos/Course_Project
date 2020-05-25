import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators } from "redux";
import Spinner from "../misc/Spinner";
import Features from "./Features";
import { loadCategories } from "../../redux/actions/categoriesActions";

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

function EditPost({
  loadOnePost,
  cleanOnePost,
  loadCats,
  id,
  post = null,
  editPost,
  selectedCategory,
  selectedFeatures,
  user,
  categories,
}) {
  const [images, setImages] = useState([]);

  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getPrice, setPrice] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    window.onpopstate = (e) => {
      cleanOnePost();
    };
  }, []);

  useEffect(() => {
    if (post === null) {
      loadOnePost(id).catch((error) => {
        alert("loading post failed " + error);
      });
    }
    if (post !== null) {
      loadCats().catch((error) => {
        console.log(error + "Loading categories failed");
      });
      setTitle(post.title);
      setDescription(post.description);
      setPrice(post.price);
    }
  }, [post]);

  function handleLoad(e) {
    e.preventDefault();
  }

  return post === null ? (
    <Spinner />
  ) : (
    <div className="container-wrapper">
      <div className="container-inner">
        <div className="container">
          <h1 className="row justify-content-center">Redaguoti skelbimą</h1>
          <table className="table table-borderless table-sm">
            <tbody>
              <InputRow
                name="Pavadinimas "
                input={
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={getTitle}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
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
                    value={getDescription}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
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
                    value={getPrice}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    placeholder="Įveskite kainą eurais"
                  />
                }
              />
              {typeof categories === "undefined"
                ? null
                : categories.map((category, index) => {
                    if (category._id === selectedCategory) {
                      return (
                        <Features
                          features={category.features}
                          key={index}
                          value={post.features}
                        />
                      );
                    }
                  })}
            </tbody>
          </table>
          <div>
            {isLoading ? (
              <Spinner />
            ) : (
              <button
                onClick={() => {
                  editPost(
                    post._id,
                    getTitle,
                    getDescription,
                    getPrice,
                    selectedFeatures
                  );
                }}
                className="mt-4 btn btn-lg btn-primary"
              >
                Išsaugoti skelbimą
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const post = state.posts.onePost;
  const defaultUser = {
    userId: "Undefined",
  };

  return {
    id,
    post,
    selectedCategory: post ? post.category : null,
    user: state.sessions.user ? state.sessions.user : defaultUser,
    categories: state.categories.categories,
    selectedFeatures: state.features.updatedFeatures,
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadOnePost: bindActionCreators(postActions.loadOnePost, dispatch),
  cleanOnePost: bindActionCreators(postActions.cleanOnePost, dispatch),
  loadCats: bindActionCreators(loadCategories, dispatch),
  editPost(id, title, description, price, features) {
    const editedPost = {
      id,
      title,
      description,
      price,
      features,
    };
    dispatch(postActions.editPost(editedPost));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
