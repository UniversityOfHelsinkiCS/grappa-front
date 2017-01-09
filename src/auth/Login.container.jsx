/**
* Login.smart for displaying and running the feature of logging in, which contains
* the Login component for creating the visual side of the page, and the container
* containing the functions for connecting the component to the reducers that handle
* the actual changes to the state.
*/
import React from "react";
import { Link, browserHistory } from "react-router";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";
import Errors from "../ui/Errors.component";

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUser: Validate.createForm("loginUser", "loginUser"),
      ws: new WebSocket("ws://localhost:8008/ws?token=asdf")
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("loginUser", "lo", (loginUser) => { this.setState({ loginUser, });});
  }

  componentWillUnmount() {
    Validate.unsubscribe("lo");
  }

  handleChange(name, event) {
    Validate.updateForm("loginUser", name, event.target.value);
  }
  /**
  * Handler method to handle what to do when the submit button is clicked.
  * @param event Used to get a hold of what the input of the user was.
  */
  handleClick(type, event) {
    this.state.ws.send('{"message": "joo"}');
    event.preventDefault();
    if (Validate.isFormValid("loginUser")) {
      const { email, password } = this.state.loginUser.values;
      this.props.loginUser(email, password);
    }
  }

  /**
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * @return <div> Login-Conntainer wrapping all the html elements to be rendered.
  */
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
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
                    value={ this.state.loginUser.values.email }
                    onChange={ this.handleChange.bind(this, "email") }
                  />
                </div>
              </div>
              <div className="field error">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={ this.state.loginUser.values.password }
                    onChange={ this.handleChange.bind(this, "password") }
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <div className="ui fluid large blue submit button" onClick={this.handleClick.bind(this, "submit")}>
                Login
              </div>
            </div>
            <div className="field">
              <Link className="ui fluid small submit" to="/reset-password">Lost password</Link>
            </div>
          </div>
          <Errors errors={this.state.loginUser.errors}/>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { loginUser } from "./auth.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  return {
    user: auth.get("user").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser(email, password) {
    dispatch(loginUser(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
