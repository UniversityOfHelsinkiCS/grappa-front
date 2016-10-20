import React from "react";
import { Link, browserHistory } from "react-router";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";
import Errors from "../ui/Errors.component";

export class UserResetPassword extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     resetUserPassword: Validate.createForm("resetUserPassword", "resetUserPassword"),
  //   };
  // }

  // componentWillMount() {
  //   Validate.subscribeToForm("resetUserPassword", "lox", (resetUserPassword) => { this.setState({ resetUserPassword, });});
  // }
  //
  // componentWillUnmount() {
  //   Validate.unsubscribe("lox");
  // }
  //
  // handleChange(name, event) {
  //   Validate.updateForm("resetUserPassword", name, event.target.value);
  // }
  //
  // handleClick(type, event) {
  //   event.preventDefault();
  //   if (Validate.isFormValid("resetUserPassword")) {
  //     const { email, password } = this.state.resetUserPassword.values;
  //     this.props.resetUserPassword(email, password);
  //   }
  // }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        Enter your email to receive a link to reset your password.
        <div className="ui">
          <div className="ui large form">
            <div className="ui stacked segment">
              <div className="field error">
                <div className="ui left icon input">
                  <i className="mail icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { resetUserPassword } from "auth/auth.actions";

const mapDispatchToProps = (dispatch) => ({
  requestPasswordResetion(email) {
    dispatch(requestPasswordResetion(email));
  },
});

export default connect(null, mapDispatchToProps)(UserResetPassword);
