import React from "react";
import ReactDOM from "react-dom";
import { Router, BrowserRouter } from "react-router-dom";
import { history } from "./redux/history";
import "./index.scss";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import setAuthToken from "./redux/actions/sessionActions";
import routes from "./routes";

const store = configureStore();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

ReactDOM.render(
  <ReduxProvider store={store}>
    <BrowserRouter>{routes}</BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);
