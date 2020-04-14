import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { checkToken } from "./redux/actions/sessionActions";
import NaviBar from "./components/navigation/Navibar";

class App extends React.Component {
  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    return (
      <div>
        <NaviBar></NaviBar>
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default connect(null, { checkToken })(App);
