/*import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import EditComponent from "./EditPost";
import axios from "axios";
import PostForm from "./PostForm";
import * as types from "../../redux/actions/actionTypes";

const url =
  process.env.NODE_ENV === `production` ? `/api` : "http://localhost:5000/api";
const employees = [{ _id: 1, name: "foo", contact: "abc", age: 20 }];
const fakeRequest = () =>
  new Promise((resolve) => setTimeout(() => resolve(employees), 1000));
class CurrentPost extends Component {
  state = {
    employees: [],
  };
  componentDidMount() {
    fakeRequest().then((employees) => this.setState({ employees }));
  }
  getPost() {
    console.log("getting");
    axios
      .get(url + "/posts", { params: { userId: "tomasjorudas23@gmail.com" } })
      .then((post) => {
        console.log(post.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const employees = this.state.employees.map((employee) => (
      <div style={{ border: "1px solid black" }} key={employee._id}>
        <h3>Name: {employee.name}</h3>
        <p>Contact: {employee.contact}</p>
        <p>{employee.age}</p>
      </div>
    ));
    return (
      <div>
        <p>Data will be fetched in a second automatically.</p>
        {employees}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts.data,
  };
};

export default connect(mapStateToProps)(CurrentPost);
*/
