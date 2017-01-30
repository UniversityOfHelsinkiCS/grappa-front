import React, { Component } from "react";

export class NewUsersList extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentWillMount() {
    this.props.getUsers();
    const users = this.filterAndInitUsers([], this.props.Users);
    this.setState({
      users,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.Users !== this.props.Users) {
      const users = this.filterAndInitUsers(this.state.users, newProps.Users);
      this.setState({
        users,
      });
    }
  }

  filterAndInitUsers(oldUsers, newUsers) {
    const notActive = newUsers.filter(user => {
      if (!user.isActive) return user;
    });
    return notActive.map(newUser => {
      const old = oldUsers.find(oldUser => {
        if (oldUser.id === newUser.id) {
          return oldUser;
        }
      });
      if (old) {
        return old;
      } else {
        newUser.role = "instructor";
        newUser.StudyFieldId = "";
        return newUser;
      }
    });
  }

  handleChange(name, index, event) {
    event.preventDefault();
    if (name === "role") {
      this.state.users[index].role = event.target.value;
      this.setState({});
    } else if (name === "StudyFieldId") {
      this.state.users[index].StudyFieldId = event.target.value;
      this.setState({});
    }
  }

  handleClick(name, index, event) {
    event.preventDefault();
    if (name === "accept") {
      const newUser = this.state.users[index];
      if (!newUser.StudyFieldId) {
        delete newUser.StudyFieldId;
      } else {
        newUser.StudyField = this.props.StudyFields.find(field => {
          if (field.id.toString() === newUser.StudyFieldId.toString()) return field;
        });
      }
      newUser.isActive = true;
      this.props.updateUser(newUser);
    } else if (name === "decline" && confirm("Are you sure you want to delete this user?")) {
      this.props.deleteUser(this.state.users[index]);
    }
  }

  renderTable(users) {
    const { StudyFields } = this.props;
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Select role</th>
            <th>Select studyfield</th>
            <th>Accept</th>
            <th>Decline</th>
          </tr>
        </thead>
        <tbody>
          { users.map((user, index) =>
            <tr key={index}>
              <td>{ `${user.firstname} ${user.lastname}` }</td>
              <td>{user.email}</td>
              <td>
                <select value={user.role} className="ui dropdown" onChange={this.handleChange.bind(this, "role", index)}>
                  <option value="instructor">Instructor</option>
                  <option value="print-person">Print-person</option>
                  <option value="professor">Professor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <select
                  value={ user.StudyFieldId }
                  className="ui fluid search dropdown"
                  onChange={this.handleChange.bind(this, "StudyFieldId", index)}
                >
                  <option key="" value="">Select field</option>
                  { StudyFields.map((field, index) =>
                    <option key={field.id} value={field.id}>
                      { field.name }
                    </option>
                  )}
                </select>
              </td>
              <td>
                <button className="positive ui button" onClick={this.handleClick.bind(this, "accept", index)}>
                  Accept
                </button>
              </td>
              <td>
                <button className="negative ui button" onClick={this.handleClick.bind(this, "decline", index)}>
                  Decline
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h2 className="ui dividing header">New users</h2>
        <p>
          Role must be set for each user and studyfield should only be selected for professors
          in charge of the studyfield. Studyfield can have only one professor. Declining an user
          deletes it completely.
        </p>
        { this.renderTable(users) }
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getUsers, updateUser, deleteUser } from "./user.actions";

const mapDispatchToProps = (dispatch) => ({
  getUsers() {
    dispatch(getUsers());
  },
  updateUser(user) {
    dispatch(updateUser(user));
  },
  deleteUser(user) {
    dispatch(deleteUser(user));
  },
});

const mapStateToProps = (state) => {
  const user = state.get("user");
  const sfreducer = state.get("studyfield");
  return {
    Users: user.get("users").toJS(),
    StudyFields: sfreducer.get("studyfields").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUsersList);
