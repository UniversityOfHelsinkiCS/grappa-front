import React from "react";
import { Link, browserHistory } from "react-router";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error";
import Errors from "../ui/Errors";

export class RequestResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      requestResetPassword: Validate.createForm("rrpForm", "requestResetPassword"),
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("rrpForm", "lox", (requestResetPassword) => { this.setState({ requestResetPassword, });});
  }

  componentWillUnmount() {
    Validate.unsubscribe("lox");
  }

  handleChange(name, event) {
    Validate.updateForm("rrpForm", name, event.target.value);
  }


  handleClick(type, event) {
    event.preventDefault();
    if (type === "submit" && Validate.isFormValid("rrpForm")) {
      const { email } = this.state.requestResetPassword.values;
      this.props.requestPasswordResetion(email);
    }
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="ui">
          <div className="ui large form">
            <div className="ui fluid large">
              Enter your email to receive a link to reset your password.
            </div>
            <div className="ui stacked segment">
              <div className="field error">
                <div className="ui left icon input">
                  <i className="mail icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    value={ this.state.requestResetPassword.values.email }
                    onChange={ this.handleChange.bind(this, "email") }
                  />
                </div>
              </div>
            </div>
            <div className="ui fluid large blue submit button" onClick={this.handleClick.bind(this, "submit")}>
              Send
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { requestPasswordResetion } from "auth/auth.actions";

const mapDispatchToProps = (dispatch) => ({
  requestPasswordResetion(email) {
    dispatch(requestPasswordResetion(email));
  },
});

export default connect(null, mapDispatchToProps)(RequestResetPassword);
