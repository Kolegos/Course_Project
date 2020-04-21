import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import { bindActionCreators } from "redux";
import Spinner from "../misc/Spinner";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    media: "(max-width: 100px)",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://www.bigstockphoto.com/images/homepage/module-6.jpg",
    thumbnail: "https://www.bigstockphoto.com/images/homepage/module-6.jpg",
  },
  {
    original:
      "https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg",
    thumbnail:
      "https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg",
  },
  {
    original: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    thumbnail: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  },
  {
    original:
      "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
  },
  {
    original:
      "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
    thumbnail:
      "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
  },
];

function Post({ loadOnePost, id, post = null }) {
  useEffect(() => {
    if (post === null) {
      loadOnePost(id)
        .catch((error) => {
          alert("loading post failed " + error);
        })
        .then();
    }
  });

  function handleLoad(e) {
    e.preventDefault();
    console.log("loading");
  }

  return post === null ? (
    <Spinner /> //history push i home
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
                src="https://baltmodus.lt/wp-content/uploads/2018/08/profile-icon-empty.png"
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
