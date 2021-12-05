import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { history } from "../../redux/history";
import * as types from "../../redux/actions/actionTypes";

const PostLoggedIn = ({ authenticated, user, owner, addNewComment }) => {
  const [images, setImages] = useState([]);
  const [post, setPost] = useState({
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
    gamintojas: "Peugeot",
    naujaNaudota: "Naudota",
  });
  const [canEdit, setCanEdit] = useState({
    kaina: false,
    gamintojas: false,
    naujaNaudota: false,
    pavadinimas: false,
    vardas: false,
    telefonas: false,
    kategorija: false,
    aprasymas: false,
  });

  const comments = [
    {
      comment: "Gera mašina",
      userId: "tomas@tomas.lt",
    },
  ];

  const handleKeyPress = (event, prop) => {
    if (event.key === "Enter") {
      console.log(canEdit);
      setCanEdit({ ...canEdit, [prop]: false });
      console.log(canEdit);
    }
  };

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
                  {canEdit.kaina ? (
                    <input
                      type="text"
                      className="form-control"
                      value={post?.price}
                      onChange={(e) => {
                        setPost({ ...post, ["kaina"]: e.target.value });
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(e, "kaina");
                      }}
                      placeholder="Įveskite pavadinimą"
                    />
                  ) : (
                    <th
                      scope="col"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <h4 align="right">{post?.price} €</h4>
                      <img
                        onClick={() =>
                          setCanEdit({ ...canEdit, ["kaina"]: true })
                        }
                        width={25}
                        src={
                          "https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png"
                        }
                      />
                    </th>
                  )}
                </tr>
                <tr>
                  <th scope="col">
                    <p>Gamintojas</p>
                  </th>
                  {canEdit.gamintojas ? (
                    <input
                      type="text"
                      className="form-control"
                      value={post?.gamintojas}
                      onChange={(e) => {
                        setPost({ ...post, ["gamintojas"]: e.target.value });
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(e, "gamintojas");
                      }}
                      placeholder="Įveskite pavadinimą"
                    />
                  ) : (
                    <th
                      scope="col"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <p align="right">{post?.gamintojas}</p>
                      <img
                        onClick={() =>
                          setCanEdit({ ...canEdit, ["gamintojas"]: true })
                        }
                        width={25}
                        src={
                          "https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png"
                        }
                      />
                    </th>
                  )}
                </tr>
                <tr>
                  <th scope="col">
                    <p>Nauja/Naudota</p>
                  </th>
                  {canEdit.naujaNaudota ? (
                    <input
                      type="text"
                      className="form-control"
                      value={post?.naujaNaudota}
                      onChange={(e) => {
                        setPost({ ...post, ["naujaNaudota"]: e.target.value });
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(e, "naujaNaudota");
                      }}
                      placeholder="Įveskite pavadinimą"
                    />
                  ) : (
                    <th
                      scope="col"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <p align="right">{post?.naujaNaudota}</p>
                      <img
                        onClick={() =>
                          setCanEdit({ ...canEdit, ["naujaNaudota"]: true })
                        }
                        width={25}
                        src={
                          "https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png"
                        }
                      />
                    </th>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col col-lg-8">
            <div className="card bg-light mb-3 card border-light mb-3">
              <div className="card-body">
                <div className="row">
                  {canEdit.pavadinimas ? (
                    <input
                      type="text"
                      className="form-control"
                      value={post?.pavadinimas}
                      onChange={(e) => {
                        setPost({ ...post, ["title"]: e.target.value });
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(e, "pavadinimas");
                      }}
                      placeholder="Įveskite pavadinimą"
                    />
                  ) : (
                    <>
                      <h4 className="card-title mr-2">{post.title}</h4>
                      <img
                        className="mr-2"
                        onClick={() =>
                          setCanEdit({ ...canEdit, ["pavadinimas"]: true })
                        }
                        width={25}
                        src={
                          "https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png"
                        }
                      />
                    </>
                  )}

                  {canEdit.kategorija ? (
                    <input
                      type="text"
                      className="form-control"
                      value={post?.category}
                      onChange={(e) => {
                        setPost({ ...post, category: e.target.value });
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(e, "kategorija");
                      }}
                      placeholder="Įveskite pavadinimą"
                    />
                  ) : (
                    <>
                      <p className="text-muted">{post.category}</p>
                      <img
                        className="mr-2"
                        onClick={() =>
                          setCanEdit({ ...canEdit, ["kategorija"]: true })
                        }
                        width={25}
                        src={
                          "https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png"
                        }
                      />
                    </>
                  )}
                </div>

                {canEdit.aprasymas ? (
                  <input
                    type="text"
                    className="form-control"
                    value={post?.description}
                    onChange={(e) => {
                      setPost({ ...post, description: e.target.value });
                    }}
                    onKeyPress={(e) => {
                      handleKeyPress(e, "aprasymas");
                    }}
                    placeholder="Įveskite pavadinimą"
                  />
                ) : (
                  <div style={{ display: "flex" }}>
                    <p className="card-text lead">{post.description}</p>
                    <img
                      className="mr-2"
                      onClick={() =>
                        setCanEdit({ ...canEdit, ["aprasymas"]: true })
                      }
                      width={25}
                      src={
                        "https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png"
                      }
                    />
                  </div>
                )}
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
                      <tr>
                        {canEdit.vardas ? (
                          <input
                            type="text"
                            className="form-control"
                            value={post?.userId}
                            onChange={(e) => {
                              setPost({
                                ...post,
                                ["userId"]: e.target.value,
                              });
                            }}
                            onKeyPress={(e) => {
                              handleKeyPress(e, "vardas");
                            }}
                            placeholder="Įveskite pavadinimą"
                          />
                        ) : (
                          <th
                            scope="col"
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <th scope="col">
                              <h5>{post.userId}</h5>
                            </th>
                            <img
                              onClick={() =>
                                setCanEdit({
                                  ...canEdit,
                                  ["vardas"]: true,
                                })
                              }
                              width={25}
                              src={
                                "https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png"
                              }
                            />
                          </th>
                        )}
                      </tr>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">
                      <tr>
                        {canEdit.telefonas ? (
                          <input
                            type="text"
                            className="form-control"
                            value={post?.phoneNumber}
                            onChange={(e) => {
                              setPost({
                                ...post,
                                ["phoneNumber"]: e.target.value,
                              });
                            }}
                            onKeyPress={(e) => {
                              handleKeyPress(e, "telefonas");
                            }}
                            placeholder="Įveskite pavadinimą"
                          />
                        ) : (
                          <th
                            scope="col"
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <th scope="col">
                              <h5>{post.phoneNumber}</h5>
                            </th>
                            <img
                              onClick={() =>
                                setCanEdit({
                                  ...canEdit,
                                  ["telefonas"]: true,
                                })
                              }
                              width={25}
                              src={
                                "https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png"
                              }
                            />
                          </th>
                        )}
                      </tr>
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
                <div align="right">
                  <button type="button" class="btn btn-warning">
                    <p class="text-danger">
                      <strong>Ištrinti skelbimą</strong>
                    </p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoggedIn;
