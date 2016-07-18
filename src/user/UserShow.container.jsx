import React, { Component } from "react";

export class UserShow extends Component {
  constructor() {
    super();
    this.state = {
      User: {},
      StudyField: {},
      editUser: {},
    };
  }

  componentWillMount() {
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

  handleChange(type, field, event) {
    if (type === "updateUser") {
      this.state.editUser[field] = event.target.value;
      this.setState({});
    }
  }

  handleClick(type, index, event) {
    if (type === "update") {
      this.props.updateUser(this.state.editUser);
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

  render() {
    const { User, StudyField } = this.state;
    const { StudyFields } = this.props;
    const activeFields = StudyFields.filter(field => {
      if (field.isActive) return field;
    });
    return (
      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <h2 className="ui dividing header">Your information</h2>
            <div className="ui list">
              <div>
                <i className="user icon"></i>
                <span>
                  { User.name }
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
          <div className="field">
            <h2 className="ui dividing header">Update your information</h2>
            <p>
              You don't have to submit your password when you're changing other information than your password.
            </p>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={this.state.editUser.name}
                onChange={this.handleChange.bind(this, "updateUser", "name")}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                value={this.state.editUser.email}
                onChange={this.handleChange.bind(this, "updateUser", "email")}
              />
            </div>
            <div className="field">
              <label>Studyfield</label>
              <select
                className="ui fluid search dropdown"
                value={this.state.editUser.StudyFieldId}
                onChange={this.handleChange.bind(this, "updateUser", "StudyFieldId")}
              >
                <option value="">None</option>
                { activeFields.map((field, index) =>
                  <option key={index} value={field.id}>
                    { field.name }
                  </option>
                )}
              </select>
            </div>
            <div className="field">
              <label>Current password</label>
              <input
                type="password"
                placeholder="Password"
                value={this.state.editUser.password}
                onChange={this.handleChange.bind(this, "updateUser", "password")}
              />
            </div>
            <div className="field">
              <label>New password</label>
              <input
                type="password"
                placeholder="New password"
                value={this.state.editUser.newPassword}
                onChange={this.handleChange.bind(this, "updateUser", "newPassword")}
              />
            </div>
            <div className="field">
              <label>Confirm new password</label>
              <input
                type="password"
                placeholder="Confirmation"
                value={this.state.editUser.newPasswordConf}
                onChange={this.handleChange.bind(this, "updateUser", "newPasswordConf")}
              />
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <button className="ui green button" onClick={this.handleClick.bind(this, "update")}>Update</button>
            </div>
          </div>
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
