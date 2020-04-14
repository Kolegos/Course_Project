import React, { Component } from "react";

import { Table, Button, Form } from "react-bootstrap";
import { FormRow } from "react-bootstrap/Form";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  uploadSingleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
    });
  }

  upload(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

  render() {
    console.log(this.props.user);
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
          <input
            type="text"
            className="form-control"
            placeholder="Vardenis"
            value={this.props.user.firstName}
          />
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Pavardenis"
            value={this.props.user.lastName}
          />
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="s@gmail.com"
            value={this.props.user.email}
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

function mapStateToProps(state) {
  const defaultUser = {
    firstName: "Vardenis",
    lastName: "Pavardenis",
    email: "email@domain.com",
  };
  return {
    user: state.sessions.user ? state.sessions.user : defaultUser,
  };
}

export default connect(mapStateToProps)(ProfilePage);
