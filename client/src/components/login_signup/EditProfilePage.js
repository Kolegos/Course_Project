import React, { useState } from "react";
import { connect } from "react-redux";
import Spinner from "../misc/Spinner";
import * as userActions from "../../redux/actions/userActions";
import axios from "axios";
import ImageUpload from "../misc/ImageUpload";

const url =
  process.env.NODE_ENV === `production`
    ? ``
    : "http://localhost:5000/api/images";

const EditProfilePage = ({ user = null, editUser }) => {
  const [selectedFile, setFile] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [isloaded, setLoad] = useState(null);
  const [isloadedProfilePicture, setLoadProfile] = useState(null);
  const [isloadedProfilePicture2, setLoadProfile2] = useState(null);

  const handleFiles = (files) => {
    setNewProfileImg(files[0]);
  };

  return user === null ? (
    <Spinner />
  ) : (
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner">
        <form
          onSubmit={(e) => editUser(e, user.email, profileImg, newProfileImg)}
        >
          <div className="row">
            <div className="col-lg-8">
              <table className="table table-striped table-borderless">
                <tbody>
                  <tr>
                    <th scope="col" style={{ width: "80%" }}>
                      First Name
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      <input
                        input={user.firstName}
                        type="text"
                        defaultValue={user.firstName}
                        name="firstName"
                      ></input>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" style={{ width: "80%" }}>
                      Last Name
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      <input
                        type="text"
                        defaultValue={user.lastName}
                        name="lastName"
                      ></input>
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" style={{ width: "80%" }}>
                      City
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      <input
                        type="text"
                        defaultValue={user.city}
                        name="city"
                      ></input>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" style={{ width: "80%" }}>
                      Phone number
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      <input
                        type="text"
                        defaultValue={user.phoneNumber}
                        name="phoneNumber"
                      ></input>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className=" col-lg-4">
              {profileImg ? (
                <img
                  src={profileImg}
                  className="img-fluid img-thumbnail"
                  alt="ProfilePicture"
                />
              ) : user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  className="img-fluid img-thumbnail"
                  alt="ProfilePicture"
                />
              ) : (
                <img
                  src="https://baltmodus.lt/wp-content/uploads/2018/08/profile-icon-empty.png"
                  className="img-fluid img-thumbnail"
                  alt="ProfilePicture"
                />
              )}
              <ImageUpload onDrop={handleFiles} />
            </div>
          </div>
          <button
            className="btn btn-secondary btn-block"
            disabled={isloadedProfilePicture && isloadedProfilePicture2}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  let id;
  if (state.sessions.user) {
    id = state.sessions.user._id;
  }
  const user = state.sessions.user;

  return {
    id,
    user,
  };
}
const mapDispatchToProps = (dispatch) => ({
  editUser(e, prevEmail, profileImg, newProfileImg) {
    e.preventDefault();

    let firstName = e.target[`firstName`].value;
    let lastName = e.target[`lastName`].value;
    let email = prevEmail;
    let phoneNumber = e.target[`phoneNumber`].value;
    let city = e.target[`city`].value;

    const editedUser = {
      _id: email,
      firstName,
      lastName,
      profileImage: profileImg,
      city,
      email,
      phoneNumber,
    };

    if (newProfileImg) {
      const data = new FormData();
      data.append("profileImage", newProfileImg);
      axios
        .post(url + "/profile-img-upload", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          editedUser.profileImage = response.data.location;

          dispatch(userActions.editUser(editedUser, email));
        })
        .catch((error) => {
          console.log(error);
        });
    } else dispatch(userActions.editUser(editedUser, email));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
