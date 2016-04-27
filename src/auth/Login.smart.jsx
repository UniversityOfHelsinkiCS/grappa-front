/*
* Login.smart for displaying and running the feature of logging in, which contains
* the Login component for creating the visual side of the page, and the container
* containing the functions for connecting the component to the reducers that handle
* the actual changes to the state.
*/
import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import Validation from "./loginValidation";

export class Login extends React.Component {
  constructor() {
    super();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordchange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "ohtugrappa@gmail.com",
      password: "asdf",
    };
  }

  /*
   * Built-in method for React-Component called when its props changes
   *
   * Here it's used for redirecting from /login to /thesis after user has
   * logged in and also for immediatly fetching all the data for better
   * user experience.
   * @param {Object} nextProps - The new props received from Redux
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.role !== undefined) {
      browserHistory.replace("/thesis");
      this.props.fetchAll();
    }
  }
/**
 * Handler method to handle the changes to the email input field.
 * @param (Event) used to get a hold of what the input of the user was.
 */
  handleEmailChange(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  /*
  * Handler method to handle the changes to the password input field.
  * @param (Event) used to get a hold of what the input of the user was.
  */
  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }
  /*
  * Handler method to handle what to do when the submit button is clicked.
  * @param event Used to get a hold of what the input of the user was.
  */
  handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
  }
  /*
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * @return <div> Login-Conntainer wrapping all the html elements to be rendered.
  */
  render() {
    return (
      <Validation.Form className="field" onSubmit={this.handleSubmit}>
        <Validation.Input
          type="text"
          value={ this.state.email }
          onChange={ this.handleEmailChange.bind(this) }
          placeholder="email"
          validations={ [{ rule: "isEmail" }] }
        />
        <Validation.Input
          type="password"
          value={ this.state.password }
          onChange={ this.handlePasswordChange.bind(this) }
          placeholder="Password"
          validations={ [{ rule: "isRequired" }] }
        />
        <Validation.Button className="ui primary button" value="Submit" onClick={this.handleSubmit} />
      </Validation.Form>
    );
  }
}

import { loginUser } from "./auth.actions";
// import { getTheses } from "../thesis/thesis.actions";
import { getCouncilmeetings } from "../councilmeeting/councilmeeting.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  return {
    user: auth.get("user").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser(userData) {
    dispatch(loginUser(userData));
  },
  fetchAll() {
    // dispatch(getTheses());
    dispatch(getCouncilmeetings());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
