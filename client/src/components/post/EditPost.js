import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators } from "redux";
import Spinner from "../misc/Spinner";
import ImageGallery from "react-image-gallery";

function EditPost({ loadOnePost, cleanOnePost, id, post = null, editPost }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    window.onpopstate = (e) => {
      cleanOnePost();
    };
  });

  useEffect(() => {
    if (post === null) {
      loadOnePost(id)
        .catch((error) => {
          alert("loading post failed " + error);
        })
        .then();
    }
    if (post !== null && post.photos.length !== 0 && images.length === 0) {
      let photos = [];
      post.photos.map((photo) => {
        photos.push({ original: photo, thumbnail: photo });
        return 0;
      });
      setImages(photos);
      //$("input-2").fileinput();
    }
  }, [post, images.length, loadOnePost, id]);

  function handleLoad(e) {
    e.preventDefault();
  }

  return post === null ? (
    <Spinner />
  ) : (
    <div>
      <form onSubmit={(e) => editPost(e, id)}>
        <div id="container-wrapper" className="container-wrapper">
          <div id="container-inner" className="container-inner">
            <div>
              {images.length !== 0 ? (
                <ImageGallery
                  slideOnThumbnailOver={false}
                  onImageLoad={handleLoad}
                  onErrorImageURL="https://i.kym-cdn.com/entries/icons/facebook/000/000/091/TrollFace.jpg"
                  useBrowserFullscreen={false}
                  lazyLoad={true}
                  thumbnailPosition="bottom"
                  showPlayButton={false}
                  items={images}
                />
              ) : (
                <h1>Nėra nuotraukų</h1>
              )}
              <table className="table table-striped table-borderless">
                <tbody>
                  <tr>
                    <th scope="col">
                      <h4>Pavadinimas</h4>
                    </th>
                    <th scope="col">
                      <h4 align="right">
                        <input
                          type="text"
                          defaultValue={post.title}
                          name="postTitle"
                        ></input>
                      </h4>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">
                      <h4>Kaina</h4>
                    </th>
                    <th scope="col">
                      <h4 align="right">
                        <input
                          type="number"
                          defaultValue={post.price}
                          name="postPrice"
                        ></input>
                        €
                      </h4>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">
                      <h4>Telefono numeris</h4>
                    </th>
                    <th scope="col">
                      <h4 align="right">
                        <input
                          type="text"
                          defaultValue={post.phoneNumber}
                          name="postPhoneNumber"
                        ></input>
                      </h4>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">
                      <h4>Kategorija</h4>
                    </th>
                    <th scope="col">
                      <h4 align="right">
                        <input
                          rows="10"
                          cols="40"
                          type="text"
                          defaultValue={post.category}
                          name="postCategory"
                        ></input>
                      </h4>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">
                      <h4>Aprašymas</h4>
                    </th>
                    <th scope="col">
                      <h4 align="right">
                        <textarea
                          rows="10"
                          cols="40"
                          type="text"
                          defaultValue={post.description}
                          name="postDescription"
                        ></textarea>
                      </h4>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="btn btn-secondary btn-block">Išsaugoti</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const post = state.posts.onePost;

  return {
    id,
    post,
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadOnePost: bindActionCreators(postActions.loadOnePost, dispatch),
  cleanOnePost: bindActionCreators(postActions.cleanOnePost, dispatch),
  editPost(e, id) {
    e.preventDefault();
    let title = e.target[`postTitle`].value;
    let description = e.target[`postDescription`].value;
    let category = e.target[`postCategory`].value;
    let phoneNumber = e.target[`postPhoneNumber`].value;
    let price = e.target[`postPrice`].value;
    let _id = id;
    const editedPost = {
      _id,
      title,
      description,
      category,
      phoneNumber,
      price,
    };
    dispatch(postActions.editPost(editedPost));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
