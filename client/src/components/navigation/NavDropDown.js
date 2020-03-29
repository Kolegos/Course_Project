import React from "react";
import PropTypes from "prop-types";

class NavDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isToggleOn: false
    };
  }

  showDropDown(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    const classDropDownMenu =
      "dropdown-menu dropdown-menu-right" +
      (this.state.isToggleOn ? " show " : "");
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDropDown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={e => {
            this.showDropDown(e);
          }}
        >
          {this.props.name}
        </a>
        <div className={classDropDownMenu} aria-labelledby="navbarDropdown">
          {this.props.children}
        </div>
      </li>
    );
  }
}

NavDropDown.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

export default NavDropDown;
