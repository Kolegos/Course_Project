import React from "react";
import { connect } from "react-redux";
import * as sessionTypes from "../../redux/actions/actionTypes";
import * as sessionActions from "../../redux/actions/sessionActions";
import { history } from "../../redux/history";

export default function (ComposedComponent, forAdmin = false) {
  class Authenticate extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      if (this.props.authenticated === sessionTypes.AUTHENTICATED) {
        if (forAdmin && this.props.user !== "admin@kolegos.lt") {
          history.push("/");
          return;
        }
        this.setState({ loading: false });
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.user !== this.props.user) {
        const authed = this.props.authenticated;

        if (authed === sessionTypes.NOT_AUTHENTICATED) {
          console.log("not authed");
          history.push("/login");
        } else if (authed === sessionTypes.AUTHENTICATED) {
          if (forAdmin) {
            if (!this.props.user) return;
            else if (this.props.user !== "admin@kolegos.lt") {
              {
                history.push("/");
                return;
              }
            }
          }
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
      user:
        sessions !== undefined && sessions.user !== undefined
          ? sessions.user.email
          : null,
      authenticated: sessions !== undefined ? sessions.authenticated : null,
    };
  }

  return connect(mapStateToProps, sessionActions)(Authenticate);
}
