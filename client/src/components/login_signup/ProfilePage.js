import React from "react";
import { connect } from "react-redux";
import Spinner from "../misc/Spinner";
import { logOut } from "../../redux/actions/sessionActions";
import { history } from "../../redux/history";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

function ProfilePage({ user = null, logout }) {
  function handleLogout() {
    logout();
    history.push("/");
  }
  return user === null ? (
    <Spinner />
  ) : (
    <div id="container-wrapper" className="container-wrapper">
      <div id="container-inner" className="container-inner">
        <div className="row">
          <div className="col-lg-8">
            <table className="table table-striped table-borderless">
              <tbody>
                <tr>
                  <th scope="col" style={{ width: "80%" }}>
                    First Name
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    {user.firstName}
                  </th>
                </tr>
                <tr>
                  <th scope="col" style={{ width: "80%" }}>
                    Last Name
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    {user.lastName}
                  </th>
                </tr>
                <tr>
                  <th scope="col" style={{ width: "80%" }}>
                    Email address
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    {user.email}
                  </th>
                </tr>
                <tr>
                  <th scope="col" style={{ width: "80%" }}>
                    City
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    {user.city}
                  </th>
                </tr>
                <tr>
                  <th scope="col" style={{ width: "80%" }}>
                    Phone number
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    {user.phoneNumber}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" col-lg-4">
            {user.profilePicture == null ? (
              <img
                src="https://baltmodus.lt/wp-content/uploads/2018/08/profile-icon-empty.png"
                className="img-fluid img-thumbnail"
                alt="ProfilePicture"
              />
            ) : (
              <img
                src={user.profilePicture}
                className="img-fluid img-thumbnail"
                alt="ProfilePicture"
              />
            )}
          </div>
        </div>
        <div className="col col-lg">
          <h3>
            Kolegos
            <small className="text-muted"> geriausias skelbimų portalas</small>
          </h3>
        </div>
        <Link to={"/EditProfilePage"}>
          <button className="btn btn-secondary btn-block">Edit</button>
        </Link>
        <button className="btn btn-secondary btn-block" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}

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

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logOut, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
