import React from "react";
import PropTypes from "prop-types";
const NavItem = props => {
  const pageURI = window.location.pathname + window.location.search;
  const liClass = props.path === pageURI ? "nav-item active" : "nav-item";
  const aClass = props.disabled ? "nav-link disabled" : "nav-link";
  return (
    <li className={liClass}>
      <a href={props.path} className={aClass}>
        {props.name}
        {props.path === pageURI ? (
          <span className="sr-only">(current)</span>
        ) : (
          ""
        )}
      </a>
    </li>
  );
};

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  disabled: PropTypes.any,
  name: PropTypes.string.isRequired
};

export default NavItem;
