import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators } from "redux";
import Spinner from "../misc/Spinner";
import ImageGallery from "react-image-gallery";

function Post({ loadOnePost, cleanOnePost, id, post = null }) {
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
      });
      setImages(photos);
    }
  });

  function handleLoad(e) {
    e.preventDefault();
  }

  return post === null ? (
    <Spinner />
  ) : (
    <div>
      <div className="row">
        <div className="col-lg-8">
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
            <h1>There are no images :(</h1>
          )}
        </div>
        <div className=" col-lg-4">
          <table className="table table-striped table-borderless">
            <tbody>
              <tr>
                <th scope="col">
                  <h4>Price</h4>
                </th>
                <th scope="col">
                  <h4 align="right">{post.price} €</h4>
                </th>
              </tr>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Some kind of feature</th>
              </tr>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Some kind of feature</th>
              </tr>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Some kind of feature</th>
              </tr>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Some kind of feature</th>
              </tr>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Some kind of feature</th>
              </tr>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Some kind of feature</th>
              </tr>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Some kind of feature</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg">
          <div className="card bg-light mb-3 card border-light mb-3">
            <div className="card-body">
              <h4 className="card-title">{post.title}</h4>
              <p className="card-text lead">{post.description}</p>
            </div>
          </div>
        </div>
        <div className="col col-lg">
          <div className="row">
            <div className="col-lg">
              <img
                src="https://baltmodus.lt/wp-content/uploads/2018/08/profile-icon-empty.png
"
                className="img-fluid img-thumbnail"
                alt="ProfilePicture"
              />
            </div>
            <div className="col col-lg">
              <table>
                <tbody>
                  <tr>
                    <th scope="col">
                      <h5>{post.userId}</h5>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">
                      <h6>{post.phoneNumber}</h6>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">
                      <h6>Location</h6>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col col-lg">
            <h3>
              Kolegos
              <small className="text-muted">
                {" "}
                geriausias skelbimų portalas
              </small>
            </h3>
          </div>
        </div>
      </div>
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

function mapDispatchToProps(dispatch) {
  return {
    loadOnePost: bindActionCreators(postActions.loadOnePost, dispatch),
    cleanOnePost: bindActionCreators(postActions.cleanOnePost, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
