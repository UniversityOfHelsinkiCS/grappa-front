import React, { Component } from "react";
import Errors from "../ui/Errors.component";
import Validator from "validator";
import { validateField, validateModel } from "../config/Validator";

export class UserRegistration extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      passwordConf: "",
      errors: {},
    };
  }

  validateInput(name, input) {
    const errors = {};
    // console.log(this.state.password)
    // console.log(this.state.passwordConf)
    if ((name === "lname" || name === "fname") && Validator.isNull(input)) {
      errors[name] = "Name can't be empty.";
    } else if (name === "email" && !Validator.isEmail(input)) {
      errors[name] = "Not valid email.";
    } else if (name === "password" && input.length < 8) {
      // console.log("lol")
      errors[name] = "Password must be at least 8 characters long.";
    } else if (name === "password" && !Validator.equals(input, this.state.passwordConf) ||
      name === "passwordConf" && !Validator.equals(input, this.state.password)) {
      errors[name] = "Passwords didn't match.";
    } else {
      if (name === "password" || (name === "passwordConf" && this.state.errors.password !==
        "Password must be at least 8 characters long.")) {
        errors.password = "";
        errors.passwordConf = "";
      } else {
        errors[name] = "";
      }
    }
    return errors;
  }

  handleChange(name, event) {
    console.log(name);
    event.preventDefault();
    const change = {
      errors: this.state.errors,
    };
    change[name] = event.target.value;
    console.log(change);
    const newErrors = validateField(name, event.target.value, "user");
    console.log(newErrors);
    change.errors[`user_${name}`] = newErrors;
    this.setState(change);
  }

  // handleChange(name, event) {
  //   event.preventDefault();
  //   const change = {};
  //   change[name] = event.target.value;
  //   // console.log(name);
  //   const errors = this.validateInput(name, event.target.value);
  //   change.errors = Object.assign(this.state.errors, errors);
  //   this.setState(change);
  // }

  handleSubmit(event) {
    event.preventDefault();
    // const inputs = Object.keys(this.state.errors);
    // const change = { errors: {} };
    // const errorsCount = inputs.reduce((previous, currentinput) => {
    //   const errors = this.validateInput(currentinput, this.state[currentinput]);
    //   change.errors = Object.assign(change.errors, errors);
    //   const amount = errors[currentinput] === "" ? 0 : 1;
    //   return previous + amount;
    // }, 0);
    //
    // this.setState(change);
    // console.log(errorsCount)
    const userErrors = validateModel(this.state, "user");
    console.log(userErrors);
    if (userErrors.list.length === 0) {
      const newUser = {
        name: `${this.state.fname} ${this.state.lname}`,
        email: this.state.email,
        password: this.state.password,
      };
      // console.log(newUser);
      this.props.registerUser(newUser);
    } else {
      this.setState({errors: userErrors.obj });
    }
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="ui">
          <div className="ui large form stacked segment">
            <div className="field error">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="fname"
                  placeholder="First name"
                  value={ this.state.fname }
                  onChange={ this.handleChange.bind(this, "fname") }
                />
              </div>
            </div>
            <div className="field error">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="lname"
                  placeholder="Last name"
                  value={ this.state.lname }
                  onChange={ this.handleChange.bind(this, "lname") }
                />
              </div>
            </div>
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
            <div className="field error">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  name="confPassword"
                  placeholder="Confirm password"
                  value={ this.state.confPassword }
                  onChange={ this.handleChange.bind(this, "confPassword") }
                />
              </div>
            </div>
            <div className="ui fluid large blue submit button" onClick={this.handleSubmit}>
              Register
            </div>
          </div>
          <Errors errors={this.state.errors}/>
          {/*<div className="ui error message">
            <ul className="list">
              <li>{ this.state.errors.fname }</li>
              <li>{ this.state.errors.lname }</li>
              <li>{ this.state.errors.email }</li>
              <li>{ this.state.errors.password }</li>
              <li>{ this.state.errors.passwordConf }</li>
            </ul>
          </div>*/}
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";
import { registerUser } from "./user.actions";

const mapDispatchToProps = (dispatch) => ({
  registerUser(newUser) {
    dispatch(registerUser(newUser));
  },
});


export default connect(null, mapDispatchToProps)(UserRegistration);
