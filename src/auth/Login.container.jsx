/**
* Login.smart for displaying and running the feature of logging in, which contains
* the Login component for creating the visual side of the page, and the container
* containing the functions for connecting the component to the reducers that handle
* the actual changes to the state.
*/
import React from "react";
import { browserHistory } from "react-router";
// import { validateField, validateModel } from "../config/Validator";

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "ohtugrappa@gmail.com",
      password: "asdf",
      errors: {},
    };
  }

  /**
   * Built-in method for React-Component called when its props changes
   *
   * Here it's used for redirecting from /login to /thesis after user has
   * logged in and also for immediatly fetching all the data for better
   * user experience.
   * @param {Object} nextProps - The new props received from Redux
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.role) {
      browserHistory.replace("/thesis");
      console.log(nextProps.user);
      if (nextProps.user.role === "admin") {
        this.props.fetchAdminData();
      } else {
        this.props.fetchUserData();
      }
    }
  }

  handleChange(name, event) {
    event.preventDefault();
    const change = {
      errors: this.state.errors,
    };
    change[name] = event.target.value;
    // const newErrors = validateField(name, event.target.value, "login");
    // change.errors[name] = newErrors;
    this.setState(change);
  }
  /**
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
  /**
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * @return <div> Login-Conntainer wrapping all the html elements to be rendered.
  */
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="ui large form">
          <div className="ui stacked segment">
            <div className="field error">
              <div className="ui left icon input">
                <i className="mail icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail address"
                  value={ this.state.email }
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
                  value={ this.state.password }
                  onChange={ this.handleChange.bind(this, "password") }
                />
              </div>
            </div>
          </div>
          <div className="ui fluid large blue submit button" onClick={this.handleSubmit.bind(this)}>
            Login
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { loginUser } from "./auth.actions";
// import { getTheses } from "../thesis/thesis.actions";
import { getGraders } from "../grader/grader.actions";
import { getCouncilMeetings } from "../councilmeeting/councilmeeting.actions";
import { getStudyFields } from "../studyfield/studyfield.actions";
import { getUsers } from "../user/user.actions";
import { getEmailDrafts } from "../email/email.actions";

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
  fetchUserData() {
    // dispatch(getTheses());
    dispatch(getGraders());
    dispatch(getCouncilMeetings());
    dispatch(getStudyFields());
  },
  fetchAdminData() {
    // dispatch(getTheses());
    dispatch(getGraders());
    dispatch(getCouncilMeetings());
    dispatch(getStudyFields());
    dispatch(getUsers());
    dispatch(getEmailDrafts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
