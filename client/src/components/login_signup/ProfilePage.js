import React from "react";
import { connect } from "react-redux";
import Spinner from "../misc/Spinner";

function ProfilePage({ user = null }) {
  return user === null ? (
    <Spinner />
  ) : (
    <div>
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
            </tbody>
          </table>
        </div>
        <div className=" col-lg-4">
          <img
            src="https://baltmodus.lt/wp-content/uploads/2018/08/profile-icon-empty.png"
            className="img-fluid img-thumbnail"
            alt="ProfilePicture"
          />
        </div>
      </div>

      <div className="col col-lg">
        <h3>
          Kolegos
          <small className="text-muted"> geriausias skelbimų portalas</small>
        </h3>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  let id;
  debugger;
  if (state.sessions.user) {
    id = state.sessions.user._id;
  }
  const user = state.sessions.user;

  return {
    id,
    user,
  };
}

export default connect(mapStateToProps, null)(ProfilePage);
