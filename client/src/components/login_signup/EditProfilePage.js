import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "../misc/Spinner";
import { logOut } from "../../redux/actions/sessionActions";
import { history } from "../../redux/history";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { editUser } from "../../redux/actions/userActions";
import * as userActions from "../../redux/actions/userActions";
import axios from "axios";

const url =
  process.env.NODE_ENV === `production`
    ? ``
    : "http://localhost:5000/api/images";

const EditProfilePage = ({ user = null, editUser }) => {
  const [selectedFile, setFile] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [isloaded, setLoad] = useState(null);
  const [isloadedProfilePicture, setLoadProfile] = useState(null);
  const [isloadedProfilePicture2, setLoadProfile2] = useState(null);

  function singleFileChangedHandler(event) {
    setFile(event.target.files[0]);
    setLoad(true);
    setLoadProfile(true);
    setLoadProfile2(true);
  }
  const data = new FormData();
  // If file selected
  if (isloaded)
    if (selectedFile) {
      setLoad(false);
      data.append("profileImage", selectedFile);
      axios
        .post(url + "/profile-img-upload", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          setProfileImg(response.data.location);
          if (200 === response.status) {
            setLoadProfile2(false);
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
              } else {
              }
            } else {
              // Success
              let fileName = response.data;
            }
          }
        })
        .catch((error) => {
          // If another error
        });
    }

  return user === null ? (
    <Spinner />
  ) : (
    <div>
      <form onSubmit={(e) => editUser(e, user.email, profileImg)}>
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
            <input
              id="input-b1"
              name="input-b1"
              type="file"
              onChange={singleFileChangedHandler}
              className="file"
              data-browse-on-zone-click="true"
            ></input>
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
  editUser(e, prevEmail, profileImg) {
    e.preventDefault();

    let firstName = e.target[`firstName`].value;
    let lastName = e.target[`lastName`].value;
    let email = prevEmail;
    let phoneNumber = e.target[`phoneNumber`].value;
    let profileImage = profileImg;
    let city = e.target[`city`].value;
    const editedUser = {
      _id: email,
      firstName,
      lastName,
      profileImage,
      city,
      email,
      phoneNumber,
    };
    dispatch(userActions.editUser(editedUser, email));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
