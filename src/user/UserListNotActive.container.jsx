import React, { Component } from "react";

export class NewUsersList extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.props.getUsers();
    this.setState({
      users: this.filterAndInitUsers(this.props.Users),
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.Users !== undefined) {
      this.setState({
        users: this.filterAndInitUsers(newProps.Users),
      });
    }
  }

  handleChange(name, index, event) {
    event.preventDefault();
    console.log("yo handling " + name);
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
    console.log("yo clicking " + name);
    if (name === "accept") {
      const newUser = this.state.users[index];
      if (!newUser.StudyFieldId) {
        delete newUser.StudyFieldId;
      }
      newUser.isActive = true;
      console.log(newUser);
      this.props.updateUser(newUser);
    } else if (name === "decline") {
      if (confirm("Are you sure you want to delete this user?")) {
        this.props.deleteUser(this.state.users[index]);
      }
    }
  }

  filterAndInitUsers(users) {
    const notActive = users.filter(user => {
      if (!user.isActive) return user;
    });
    return notActive.map(user => {
      user.role = "instructor";
      return user;
    });
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
          Role must be set for each user but studyfield can be left unselected for admin or print-person. Studyfield can
          have only one professor. Declining an user deletes it completely.
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
