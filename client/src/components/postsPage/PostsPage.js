import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";

export default class PostsPage extends Component {
  render() {
    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <div className="form-group">
          <label>First name</label>
          <input type="text" className="form-control" placeholder="Vardenis" />
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Pavardenis"
          />
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="s@gmail.com"
          />
          <Form>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control as="select">
                <option>Choose...</option>
                <option>Vilnius</option>
                <option>Kaunas</option>
                <option>Skaudvilė</option>
                <option>Šiauliai</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>

        <p className="text-left">
          <a href="/changePassword">
            <a> Change password</a>
          </a>
        </p>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </div>
    );
  }
}
