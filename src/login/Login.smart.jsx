/*
* Login.smart for displaying and running the feature of logging in, which contains
* the Login component for creating the visual side of the page, and the container
* containing the functions for connecting the component to the reducers that handle
* the actual changes to the state.
*/
import React from "react";
import { connect } from "react-redux";
import Validation from "./loginValidation";
import { saveLoginData } from "./login.actions";

export class Login extends React.Component {
  constructor() {
    super();
    this.handleNamechange = this.handleNameChange.bind(this);
    this.handlePasswordchange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
    };
  }
/*
* Handler method to handle the changes to the username input field.
* @param (Event) used to get a hold of what the input of the user was.
*/
  handleNameChange(event) {
    event.preventDefault();
    this.setState({ username: event.target.value });
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
    const loginData = {
      username: this.state.username,
      password: this.state.password,
    };
    saveLoginData(loginData);
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
          value={ this.state.username }
          onChange={ this.handleNameChange.bind(this) }
          placeholder="Username"
          validations={ [{ rule: "isEmail"} ] }
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

/*
* A special function used to define and dispatch the relevant data to login.actions.
*/
const mapDispatchToProps = (dispatch) => ({
  saveLoginData(loginData) {
    dispatch(saveLoginData(loginData));
  },
});


export default connect(null, mapDispatchToProps)(Login);
