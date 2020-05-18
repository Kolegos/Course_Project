import React from "react";
import NavItem from "./NavItem";
import NavDropDown from "./NavDropDown";

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
      <nav className="navbar sticky-top navbar-expand-md navbar-light bg-info">
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
            <NavItem path="/" name="Home" />
            <NavItem path="/login" name="Login" />
            <NavItem path="/signup" name="Sign up" />
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <NavDropDown name="Profile">
              <a className="dropdown-item" href="/YourPosts">
                Your posts
              </a>
              <a className="dropdown-item" href="/">
                Comments
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/profilePage">
                Personal information
              </a>
              <a className="dropdown-item" href="/Page">
                Add post
              </a>
            </NavDropDown>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navibar;
