import React, { Component } from "react";

import { Table, Button, Form } from "react-bootstrap";
import { FormRow } from "react-bootstrap/Form";
import { Grid, Row, Col } from "react-bootstrap";

export default class profilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  uploadSingleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });
  }

  upload(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

  render() {
    let imgPreview;

    if (this.state.file) {
      imgPreview = (
        <img src={this.state.file} alt="avatar" className="avatar-img" />
      );
    }
    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <form>
          <div className="form-group preview">{imgPreview}</div>

          <div className="form-group">
            <button>
              <input type="file" onChange={this.uploadSingleFile} />
            </button>
          </div>
        </form>

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
