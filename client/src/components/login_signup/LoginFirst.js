import React from "react";
import { Link } from "react-router-dom";

const LoginFirst = () => (
  <div>
    <h1>Sorry, Amigo, please login first</h1>
    <Link to="/login">Login here ;)</Link>
  </div>
);

export default LoginFirst;
