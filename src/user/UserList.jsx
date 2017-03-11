import React, { Component } from "react";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error";
import Errors from "../ui/Errors";

export class UserList extends Component {

  constructor() {
    super();
    this.state = {
      updateUser: Validate.createForm("updateUser", "userEdit"),
      editing: false,
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("updateUser", "ul", (updateUser) => {
      this.setState({ updateUser, });
    });
  }

  componentWillUnmount() {
    Validate.unsubscribe("ul");
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.Users) {
  //     this.setState({
  //       Users: newProps.Users,
  //     });
  //   }
  // }

  handleChange(type, field, event) {
    if (type === "updateUser") {
      let value;
      if (field === "isActive" || field === "isRetired") {
        value = !Validate.getFormField("updateUser", field);
      } else {
        value = event.target.value;
      }
      Validate.updateForm("updateUser", field, value);
    }
  }

  handleClick(type, index, event) {
    if (type === "editUser") {
      const Users = this.props.Users.filter(user => {
        if (user.isActive) return user;
      });
      this.setState({ editing: true });
      Validate.replaceForm("updateUser", Users[index]);
    } else if (type === "save" && this.state.updateUser.values.id && Validate.isFormValid("updateUser")) {
      const user = Validate.getForm("updateUser").values;
      user.StudyField = this.props.StudyFields.find(field => {
        if (field.id.toString() === user.StudyFieldId) return field;
      });
      this.props.updateUser(user);
    }
  }

  // filterInactiveUsers(meetings) {
  //   const today = new Date();
  //   return meetings.filter(meeting => {
  //     const mdate = new Date(meeting.date);
  //     if (mdate >= today || mdate.toDateString() === today.toDateString()) {
  //       return meeting;
  //     }
  //   });
  // }

  renderEditUser(activeFields) {
    return (
      <tr style={{width: "100%"}}>
        <td>
          <select
            className="ui fluid search dropdown"
            value={this.state.updateUser.values.role}
            onChange={this.handleChange.bind(this, "updateUser", "role")}
          >
            <option value="instructor">Instructor</option>
            <option value="print-person">Print-person</option>
            <option value="professor">Professor</option>
            <option value="admin">Admin</option>
          </select>
        </td>
        <td>
          <select
            className="ui fluid search dropdown"
            value={this.state.updateUser.values.StudyFieldId || ""}
            onChange={this.handleChange.bind(this, "updateUser", "StudyFieldId")}
          >
            <option value="">None</option>
            { activeFields.map((field, index) =>
              <option key={index} value={field.id}>
                { field.name }
              </option>
            )}
          </select>
        </td>
        <td>
          <input
            type="text"
            placeholder="First name"
            value={this.state.updateUser.values.firstname}
            onChange={this.handleChange.bind(this, "updateUser", "firstname")}
          />
          <ValidateError errors={this.state.updateUser.errors} model="userEdit" field="firstname" />
        </td>
        <td className="field">
          <input
            type="text"
            placeholder="Last name"
            value={this.state.updateUser.values.lastname}
            onChange={this.handleChange.bind(this, "updateUser", "lastname")}
          />
          <ValidateError errors={this.state.updateUser.errors} model="userEdit" field="lastname" />
        </td>
        <td className="field">
          <input
            type="text"
            placeholder="Email"
            value={this.state.updateUser.values.email}
            onChange={this.handleChange.bind(this, "updateUser", "email")}
          />
          <ValidateError errors={this.state.updateUser.errors} model="userEdit" field="email" />
        </td>
        <td className="field">
          <div className="ui checkbox">
            <input
              type="checkbox"
              checked={this.state.updateUser.values.isRetired ? "true" : ""}
              onChange={this.handleChange.bind(this, "updateUser", "isRetired")}
            />
            <label>&nbsp;</label>
          </div>
        </td>
        <td className="field">
          <button className="ui blue button" onClick={this.handleClick.bind(this, "save")}>Save</button>
        </td>
      </tr>
    )
  }

  render() {
    const activeUsers = this.props.Users.filter(user => {
      if (user.isActive) return user;
    });
    const { StudyFields } = this.props;
    const activeFields = StudyFields.filter(field => {
      if (field.isActive) return field;
    });
    const Users = activeUsers.map(user => {
      if (user.StudyFieldId) {
        user.StudyField = StudyFields.find(field => field.id === parseInt(user.StudyFieldId));
      }
      return user;
    })
    return (
      <div className="ui form">
        <h2 className="ui dividing header">Users</h2>
        <p>
          All registered and activated users. Retiring an user disables the account but doesn't delete it 
          from the database. Click on the user to edit.
        </p>
        <table className="ui celled table">
          <thead>
            <tr>
              <th onClick={this.handleClick.bind(this, "sort", "status")}>Role</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Field</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Firstname</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Lastname</th>
              <th onClick={this.handleClick.bind(this, "sort", "title")}>Email</th>
              <th onClick={this.handleClick.bind(this, "sort", "studyfield")}>Retired</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            { Users.map((item, index) => {
                if (this.state.editing && this.state.updateUser.values.id === item.id) {
                  { return (this.renderEditUser(activeFields)) }
                } else {
                  return (
                    <tr key={index}>
                      <td>{item.role}</td>
                      <td>{item.StudyField ? item.StudyField.name : ""}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.email}</td>
                      <td>
                        <div className="ui checkbox">
                          <input
                            type="checkbox"
                            readOnly="true"
                            checked={item.isRetired ? "true" : ""}
                          />
                          <label></label>
                        </div>
                      </td>
                      <td>
                        <button className="ui green button" onClick={this.handleClick.bind(this, "editUser", index)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                }
              }
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getUsers, updateUser } from "./user.actions";

const mapStateToProps = (state) => {
  const user_r = state.get("user");
  const studyfield_r = state.get("studyfield");
  return {
    Users: user_r.get("users").toJS(),
    StudyFields: studyfield_r.get("studyfields").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers() {
    dispatch(getUsers());
  },
  updateUser(data) {
    dispatch(updateUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
