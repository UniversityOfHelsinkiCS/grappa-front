import React from "react";

export class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
  }

  componentWillMount() {
    this.props.sendNewPassword(this.props.params.token)
      .then(wasSuccess => {
        if (wasSuccess) {
          this.setState({
            message: "New password has been emailed to you.",
          })
        } else {
          this.setState({
            message: "Your password couldn't be reseted. Please request new password-resetion link or contact the administrator to reset the password for you.",
          })
        }
      })
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        { this.state.message ?
          <span>{this.state.message}</span>
            :
          <span>Wait for the response.</span>
        }
      </div>
    );
  }
}

import { connect } from "react-redux";

import { sendNewPassword } from "auth/auth.actions";

const mapDispatchToProps = (dispatch) => ({
  sendNewPassword(token) {
    return dispatch(sendNewPassword(token));
  },
});

export default connect(null, mapDispatchToProps)(ResetPassword);
