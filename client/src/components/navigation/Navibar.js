import React from "react";
import NavItem from "./NavItem";
import NavDropDown from "./NavDropDown";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as types from "../../redux/actions/actionTypes";
import { logOut } from "../../redux/actions/sessionActions";
import { history } from "../../redux/history";

class Navibar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavBar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "navbar-toggler vanbar-toggler-right-collapsed"
      : "navbar-toggler navbar - toggler-right";
    return (
      <nav className="navbar sticky-top navbar-expand-md navbar-light bg-muted">
        <a className="navbar-brand" href="/">
          <h4>
            Kolegos
            <small className="text-muted"> geriausias skelbimų portalas</small>
          </h4>
        </a>
        <button
          onClick={this.toggleNavBar}
          className={`${classTwo}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${classOne}`} id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <NavItem path="/" name="Pagrindinis" />
            {this.props.authenticated === types.NOT_AUTHENTICATED ? (
              <>
                <NavItem path="/login" name="Prisijungti" />
                <NavItem path="/signup" name="Užsiregistruoti" />
              </>
            ) : null}
            {this.props.email === "admin@kolegos.lt" ? (
              <NavItem path="/admin" name="Admino sekcija" />
            ) : null}
            {this.props.authenticated === types.AUTHENTICATED ? (
              <NavDropDown name={this.props.email}>
                <a className="dropdown-item" href="/YourPosts">
                  Jūsų skelbimai
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/profilePage">
                  Jūsų profilis
                </a>
                <a className="dropdown-item" href="/Page">
                  Pridėti naują skelbimą
                </a>
                <p
                  onClick={() => {
                    this.props.logout();
                    history.push("/");
                  }}
                  className="dropdown-item my-0"
                  style={{ cursor: "pointer" }}
                >
                  Atsijungti
                </p>
              </NavDropDown>
            ) : null}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const authenticated = state.sessions.authenticated;
  const email =
    state.sessions && state.sessions.user ? state.sessions.user._id : "";

  return {
    authenticated,
    email,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logOut, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navibar);
