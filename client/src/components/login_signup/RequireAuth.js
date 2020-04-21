import React from "react";
import { connect } from "react-redux";
import * as sessionTypes from "../../redux/actions/actionTypes";
import * as sessionActions from "../../redux/actions/sessionActions";
import { history } from "../../redux/history";

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      if (this.props.authenticated === sessionTypes.AUTHENTICATED) {
        this.setState({ loading: false });
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.authenticated !== this.props.authenticated) {
        const authed = this.props.authenticated;

        if (authed === sessionTypes.NOT_AUTHENTICATED) {
          console.log("not authed");
          history.push("/login");
        } else if (authed === sessionTypes.AUTHENTICATED) {
          this.setState({ loading: false });
        }
      }
    }

    render() {
      return this.state.loading ? (
        <div>loading..</div>
      ) : (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps({ sessions }) {
    return {
      authenticated: sessions != undefined ? sessions.authenticated : null,
    };
  }

  return connect(mapStateToProps, sessionActions)(Authenticate);
}
