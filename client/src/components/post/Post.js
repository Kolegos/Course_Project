import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators } from "redux";
import Spinner from "../misc/Spinner";
import ImageGallery from "react-image-gallery";
import { history } from "../../redux/history";
import * as types from "../../redux/actions/actionTypes";
import * as commentActions from "../../redux/actions/commentActions";

function Post({
  loadOnePost,
  cleanOnePost,
  id,
  post = null,
  authenticated,
  user,
  owner,
  comments = null,
  LoadComments,
  addNewComment,
}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    window.onpopstate = (e) => {
      cleanOnePost();
    };
  });

  useEffect(() => {
    if (post !== null) LoadComments(post._id);
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
    }
  }, [post, images.length, loadOnePost, id]);

  function handleLoad(e) {
    e.preventDefault();
  }

  return post === null ? (
    <Spinner />
  ) : (
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner">
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
          <div className="col-lg-4">
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
                {post.features.map((ft, index) => {
                  return (
                    <tr key={index}>
                      <th>{ft.feature}</th>
                      <th>{ft.value}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col col-lg-8">
            <div className="card bg-light mb-3 card border-light mb-3">
              <div className="card-body">
                <div className="row">
                  <h4 className="card-title mr-4">{post.title}</h4>
                  <p className="text-muted">{post.categoryObj[0].name}</p>
                </div>
                <p className="card-text lead">{post.description}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg">
              <img
                style={{ width: 256 }}
                src={
                  owner.users && owner.users.profilePicture
                    ? owner.users.profilePicture
                    : "https://baltmodus.lt/wp-content/uploads/2018/08/profile-icon-empty.png"
                }
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
                      <h6>{owner && owner.city ? owner.city : ""}</h6>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {user ? (
                        authenticated === types.AUTHENTICATED &&
                        user.email === post.userId ? (
                          <button
                            className="btn btn-secondary btn-block"
                            onClick={() => {
                              history.push(`/Edit/${post._id}`);
                            }}
                          >
                            Edit
                          </button>
                        ) : null
                      ) : null}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="container-wrapper">
          <div className="container-inner">
            <form onSubmit={(e) => addNewComment(e, post, user)}>
              <h2>Komentarai</h2>
              {authenticated === types.AUTHENTICATED ? (
                <div>
                  <div>
                    <textarea
                      className="overflow-auto col-8"
                      style={{ height: 100, width: 800 }}
                      name="comment"
                    ></textarea>
                  </div>
                  <button className="btn btn-primary mb-5">
                    Skelbti komentarą
                  </button>
                </div>
              ) : null}

              {comments && comments.length !== 0 ? (
                comments.map((comment) => {
                  return (
                    <div key={comment._id} className="popout">
                      <div className="col col-lg-8 ml-0 pl-0 ">
                        <div className="card bg-light mb-3 card border-light mb-3">
                          <div className="card-body">
                            <h4 className="card-title mr-4">
                              {comment.UserID}
                            </h4>

                            <p className="card-text lead">{comment.Comment}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Komentarų nėra</div>
              )}

              <div className="col col-lg">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const post = state.posts.onePost;
  const authenticated = state.sessions.authenticated;
  const user = state.sessions.user;
  const owner = state.users ? state.users : null;
  const comments = state.comments.comment;

  return {
    id,
    post,
    authenticated,
    user,
    owner,
    comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadOnePost: bindActionCreators(postActions.loadOnePost, dispatch),
    cleanOnePost: bindActionCreators(postActions.cleanOnePost, dispatch),
    LoadComments: bindActionCreators(commentActions.LoadComments, dispatch),
    addNewComment(e, post, user) {
      e.preventDefault();
      let Comment = e.target[`comment`].value;
      let UserID = user._id;
      let PostID = post._id;
      e.target[`comment`].value = "";

      const comment = {
        Comment,
        UserID,
        PostID,
      };
      dispatch(commentActions.addNewComment(comment));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
