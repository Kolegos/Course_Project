import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { history } from "../../redux/history";
import * as types from "../../redux/actions/actionTypes";

const PostGuest = ({ authenticated, user, owner, addNewComment }) => {
  const [images, setImages] = useState([]);

  const post = {
    id: "1",
    photos: [
      "https://parkers-images.bauersecure.com/Scale/pagefiles/203454/cut-out/450x300/406_est.jpg",
      "https://d1ix0byejyn2u7.cloudfront.net/drive/images/made/drive/images/remote/https_ssl.caranddriving.com/f2/images/used/big/peug406estate9904_750_500_70.jpg",
    ],
    userId: "edgaras@edgaras.lt",
    title: "Peugeot 406",
    price: "100",
    phoneNumber: "868668666",
    description: "Naudotas automobilis",
    category: "Mašinos",
    features: [
      {
        feature: "Gamintojas",
        value: "Peugeot",
      },
      {
        feature: "Nauja/Naudota",
        value: "Naudota",
      },
    ],
  };

  const comments = [
    {
      comment: "Gera mašina",
      userId: "tomas@tomas.lt",
    },
  ];

  useEffect(() => {
    let photos = [];
    post.photos.map((photo) => {
      photos.push({ original: photo, thumbnail: photo });
      return 0;
    });
    console.log(photos);
    setImages(photos);
  }, []);

  function handleLoad(e) {
    e.preventDefault();
  }

  return (
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner">
        <div className="row">
          <div className="col-lg-8">
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
          </div>
          <div className="col-lg-4">
            <table className="table table-striped table-borderless">
              <tbody>
                <tr>
                  <th scope="col">
                    <h4>Kaina</h4>
                  </th>
                  <th scope="col">
                    <h4 align="right">{post?.price} €</h4>
                  </th>
                </tr>
                {post?.features.map((ft, index) => {
                  return (
                    <tr key={index}>
                      <th>{ft.feature}</th>
                      <th>
                        <p align="right">{ft.value}</p>
                      </th>
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
                  <p className="text-muted">{post.category}</p>
                </div>
                <p className="card-text lead">{post.description}</p>
              </div>
            </div>
          </div>
          <div className="row ml-1">
            <div className="col-lg">
              <img
                style={{ width: 256 }}
                src={
                  "https://kurtoliau.lt/app/uploads/2017/12/facebook-avatar.jpg"
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
                            Redaguoti
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
        <div className="container-wrapper mt-3">
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

              {comments.map((comment) => {
                return (
                  <div key={comment._id} className="popout">
                    <div className="col col-lg-8 ml-0 pl-0 ">
                      <div className="card bg-light mb-3 card border-light mb-3">
                        <div className="card-body">
                          <h4 className="card-title mr-4">{comment.userId}</h4>

                          <p className="card-text lead">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

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
};

export default PostGuest;
