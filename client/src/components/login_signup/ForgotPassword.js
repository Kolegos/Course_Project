import React, { Component } from "react";

export default class ForgotPassword extends Component {
  render() {
    return (
      <div id="container-wrapper" className="container-wrapper">
        <div id="container-inner" className="container-inner">
          <form>
            <h3>Forgot Password</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
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
