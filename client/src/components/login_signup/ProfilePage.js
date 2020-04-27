import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";

export default class profilePage extends Component {
  render() {
    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <Grid className="landing-grid middle">
          <Cell col={1}>
            <img
              src="https://www.intrahealth.org/sites/ihweb/files/styles/large/public/person-thumbnail-images/avatar-20_0.png?itok=mM4-Q4b-"
              alt="avatar"
              className="avatar-img"
            />
          </Cell>
          <Cell col={2}>
            <div className="form-group">
              <label>First name</label>
              <input type="text" className="form-control" />
              <label>Last name</label>
              <input type="text" className="form-control" />
              <label>Email address</label>
              <input type="email" className="form-control" />
            </div>
          </Cell>
          <p className="text-left">
            <a href="/changePassword">
              Change password
            </a>
          </p>
        </Grid>
      </div>
    );
  }
}
