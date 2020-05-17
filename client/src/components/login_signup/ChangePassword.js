import React, { Component } from "react";

export default class ChangePassword extends Component {
  render() {
    return (
      <div id="container-wrapper" className="container-wrapper">
        <div id="container-inner" className="container-inner">
          <form>
            <h3>Change password</h3>

            <div className="form-group">
              <label>Old password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />

              <label>New password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />

              <label>Retype new password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
