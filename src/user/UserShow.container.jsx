import React, { Component } from "react";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";

export class UserShow extends Component {

  constructor() {
    super();
    this.state = {
      updateUser: Validate.createForm("updateUser", "userEditSelf"),
      User: {},
      StudyField: {},
      editUser: {},
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("updateUser", "us", (updateUser) => {
      this.setState({ updateUser, });
    });
    Validate.replaceForm("updateUser", this.props.User);

    const edit = Object.assign({
      password: "",
      newPassword: "",
      newPasswordConf: "",
    }, this.props.User);

    this.setState({
      User: this.props.User,
      StudyField: this.props.StudyFields.find(field => {
        if (field.id === this.props.User.StudyFieldId) return field;
      }),
      editUser: edit,
    });
  }

  componentWillUnmount() {
    Validate.unsubscribe("us");
  }

  componentWillReceiveProps(newProps) {
    if (newProps.User && newProps.StudyFields) {
      this.setState({
        User: newProps.User,
        StudyField: newProps.StudyFields.find(field => {
          if (field.id === newProps.User.StudyFieldId) return field;
        }),
      });
    }
  }

  handleChange(formname, field, event) {
    // if (type === "updateUser") {
    //   this.state.editUser[field] = event.target.value;
    //   this.setState({});
    // }
    Validate.updateForm(formname, field, event.target.value);
  }

  handleClick(type, index, event) {
    if (type === "update" && Validate.isFormValid("updateUser")) {
      this.props.updateUser(this.state.updateUser.values);
    }
  }

  renderAdminView() {
    return (
      <div className="ui list">
        <h3 className="dividing header">Admin View</h3>
        <div>
          Thesis' deadline from councilmeeting: 10d
        </div>
        <div>
          Events happened since last login: 23
        </div>
        <div>
          Update data with theses and councilmeetings beyond past year: button
        </div>
      </div>
    );
  }

  renderEdit() {
    const { StudyFields } = this.props;
    const activeFields = StudyFields.filter(field => {
      if (field.isActive) return field;
    });
    const { updateUser } = this.state;
    return (
      <div className="field">
        <h2 className="ui dividing header">Update your information</h2>
        <p>
          You don't have to submit your password when you're changing other information than your password.
        </p>
        <div className="field">
          <label>Firstname</label>
          <input
            type="text"
            placeholder="First name"
            value={updateUser.values.firstname}
            onChange={this.handleChange.bind(this, "updateUser", "firstname")}
          />
          <ValidateError errors={updateUser.errors} model="userEditSelf" field="firstname" />
        </div>
        <div className="field">
          <label>Lastname</label>
          <input
            type="text"
            placeholder="Last name"
            value={updateUser.values.lastname}
            onChange={this.handleChange.bind(this, "updateUser", "lastname")}
          />
          <ValidateError errors={updateUser.errors} model="userEditSelf" field="lastname" />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={updateUser.values.email}
            onChange={this.handleChange.bind(this, "updateUser", "email")}
          />
          <ValidateError errors={updateUser.errors} model="userEditSelf" field="email" />
        </div>
        <div className="field">
          <label>Current password</label>
          <input
            type="password"
            placeholder="Password"
            value={updateUser.values.password}
            onChange={this.handleChange.bind(this, "updateUser", "password")}
          />
          <ValidateError errors={updateUser.errors} model="userEditSelf" field="password" />
        </div>
        <div className="field">
          <label>New password</label>
          <input
            type="password"
            placeholder="New password"
            value={updateUser.values.newPassword}
            onChange={this.handleChange.bind(this, "updateUser", "newPassword")}
          />
          <ValidateError errors={updateUser.errors} model="userEditSelf" field="newPassword" />
        </div>
        <div className="field">
          <label>Confirm new password</label>
          <input
            type="password"
            placeholder="Confirmation"
            value={updateUser.values.newPasswordConf}
            onChange={this.handleChange.bind(this, "updateUser", "newPasswordConf")}
          />
          <ValidateError errors={updateUser.errors} model="userEditSelf" field="newPasswordConf" />
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="ui green button" onClick={this.handleClick.bind(this, "update")}>Update</button>
        </div>
      </div>
    );
  }

  render() {
    const { User, StudyField } = this.state;
    return (
      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <h2 className="ui dividing header">Your information</h2>
            <div className="ui list">
              <div>
                <i className="user icon"></i>
                <span>
                  { `${User.firstname} ${User.lastname}` }
                </span>
              </div>
              <div>
                <i className="mail icon"></i>
                <span>
                  { User.email }
                </span>
              </div>
              <div>
                <i className="student icon"></i>
                <span>
                  { StudyField === undefined ? "No studyfield assigned" : StudyField.name}
                </span>
              </div>
            </div>
          </div>
          { this.renderEdit() }
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";
import { updateUser } from "./user.actions";

const mapStateToProps = (state) => {
  const auth_r = state.get("auth");
  const studyfield_r = state.get("studyfield");
  return {
    User: auth_r.get("user").toJS(),
    StudyFields: studyfield_r.get("studyfields").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateUser(data) {
    dispatch(updateUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
