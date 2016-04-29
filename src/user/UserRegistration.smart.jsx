import React, { Component } from "react";


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
    };
  }

  handleChange(name, event) {
    event.preventDefault();
    const change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      name: `${this.state.fname} ${this.state.lname}`,
      email: this.state.email,
      // password: this.state.password,
    };
    const { saveUser } = this.props;
    console.log(newUser);
    saveUser(newUser);
  }

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <h2 className="ui dividing header">Registration</h2>
          <div className="tree fields">
            <div className="field">
              <input type="text" name="firstname" placeholder="First Name" value={this.state.fname} onChange={this.handleChange.bind(this, "fname")}>
              </input>
            </div>
            <div className="field">
              <input type="text" name="lastname" placeholder="Last Name" value={this.state.lname} onChange={this.handleChange.bind(this, "lname")}>
              </input>
            </div>
            <div className="field">
              <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this, "email")}>
              </input>
            </div>
          </div>

          <div className="two fields">
            <div className="two wide field">
              <input type="password" name="password" placeholder="Password">
              </input>
            </div>
            <div className="two wide field">
              <input type="password" name="passwordConf" placeholder="Confirm password" value={this.state.password} onChange={this.handleChange.bind(this, "password")}>
              </input>
            </div>
          </div>

          <button className="ui primary button" onClick={ () => {
            this.handleSubmit();
          }}
          >
            Submit
          </button>
          <button className="ui primary button">Cancel</button>

        </form>
      </div>
    );
  }
}

import { connect } from "react-redux";
import { saveUser } from "./user.actions";

const mapDispatchToProps = (dispatch) => ({
  saveUser(newUser) {
    dispatch(saveUser(newUser));
  },
});


export default connect(null, mapDispatchToProps)(UserRegistration);
