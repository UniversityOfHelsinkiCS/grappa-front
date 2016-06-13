/**
* NewUsersList.smart for displaying the data relating to new users added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Table, Thead, Th, unsafe } from "reactable";

export class NewUsersList extends Component {
  constructor() {
    super();
    this.acceptButtonFormatter = this.acceptButtonFormatter.bind(this);
    this.declineButtonFormatter = this.declineButtonFormatter.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.declineUser = this.declineUser.bind(this);
    this.setUserRole = this.setUserRole.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.users !== undefined) {
      const init = {};
      newProps.users.map(user => {
        if (!user.isActive) {
          init[user.id] = {};
          init[user.id].id = user.id;
          init[user.id].role = "instructor";
          init[user.id].StudyFieldId = "";
        }
      });
      this.setState(init);
    }
  }

  setUserRole(user, event) {
    event.preventDefault();
    const change = {};
    change[user.id] = this.state[user.id];
    change[user.id].role = event.target.value;
    this.setState(change);
  }

  setUserField(user, event) {
    event.preventDefault();
    const change = {};
    change[user.id] = this.state[user.id];
    change[user.id].StudyFieldId = event.target.value;
    this.setState(change);
  }

  updateUser(user) {
    const newUser = Object.assign({}, this.state[user.id]);
    // if (newUser.role === undefined || newUser.role === null) {
    //   newUser.role = "instructor";
    // }
    // if (newUser.StudyFieldId === undefined || newUser.role === null) {
    //   newUser.StudyFieldId = null;
    // }
    newUser.isActive = true;
    console.log(newUser)
    this.props.updateUser(newUser);
  }

  declineUser(user) {
    this.props.declineUser(user);
  }

  /**
  * Formatter-methods are in charge of formatting the correct
  * views and actions into the react-bootstrap-table.
  */
  acceptButtonFormatter(cell, row) {
    return (
      <button className="positive ui button" onClick={
        this.updateUser.bind(this, cell, row)}
      >
        Accept
      </button>
    );
  }

  declineButtonFormatter(cell, row) {
    return (
      <button className="negative ui button" onClick={ () => {
        if (confirm("Are you sure you want to delete this user?")) {
          this.declineUser(row);
        }}}
      >
        Decline
      </button>
    );
  }

  renderRoleFormatter(user) {
    const role = this.state[user.id] === undefined ? "" : this.state[user.id].role;
    return (
      <select value={role} className="ui dropdown" onChange={this.setUserRole.bind(this, user)}>
        <option value="instructor">Instructor</option>
        <option value="print-person">Print-person</option>
        <option value="professor">Professor</option>
        <option value="admin">Admin</option>
      </select>
    );
  }

  renderStudyFieldFormatter(user) {
    const fieldId = this.state[user.id] === undefined ? "" : this.state[user.id].StudyFieldId;
    return (
      <select
        value={ fieldId }
        className="ui fluid search dropdown"
        onChange={this.setUserField.bind(this, user)}
      >
        <option key="" value="">Select field</option>
        { this.props.studyfields.map((field, index) =>
          <option key={index} value={field.id}>
            { field.name }
          </option>
        )}
      </select>
    );
  }

  renderTable(users) {
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
          {
            users.map(user =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{ this.renderRoleFormatter(user)}</td>
                <td>{ this.renderStudyFieldFormatter(user)}</td>
                <td>
                  <button className="positive ui button" onClick={
                    this.updateUser.bind(this, user)}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button className="negative ui button" onClick={ () => {
                    if (confirm("Are you sure you want to delete this user?")) {
                      this.declineUser(row);
                    }}}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          {/*<tr>
            <th>
              <div className="ui right floated pagination menu">
                <a className="icon item">
                  <i className="left chevron icon"></i>
                </a>
                <a className="item">1</a>
                <a className="item">2</a>
                <a className="item">3</a>
                <a className="item">4</a>
                <a className="icon item">
                  <i className="right chevron icon"></i>
                </a>
              </div>
            </th>
          </tr>*/}
        </tfoot>
      </table>
    )
  }

  /**
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * Contains a react-bootstrap-table library styled table.
  * @return <div>-container Container wrapping all the html elements to be rendered.
  */
  render() {
    const users = this.props.users.filter(user => {
      if (!user.isActive) {
        return user;
      }
    });
    const noUsers = users.length === 0;
    return (
      <div>
        <h2 className="ui dividing header">New users</h2>
        <p>Role must be set for each user but studyfield can be left unselected which saves it as empty. Declining a user deletes it completely.</p>
        { this.renderTable(users) }
      </div>
    )
    // return (
    //   <div>
    //     { noUsers ?
    //       <h2 className="ui dividing header">No new users</h2>
    //       :
    //       <div>
    //         <h2 className="ui dividing header">New users</h2>
    //         <p>Role must be set for each user but studyfield can be set as null (empty). Declining a user deletes it completely.</p>
    //         { this.renderTable(users) }
    //       </div>
    //     }
    //   </div>
    // );
  }
}
import { connect } from "react-redux";
import { getUsers, updateUser, deleteUser } from "./user.actions";
import { getStudyfields } from "../studyfield/studyfield.actions";

const mapDispatchToProps = (dispatch) => ({
  getUsers() {
    dispatch(getUsers());
  },
  updateUser(user) {
    dispatch(updateUser(user));
  },
  declineUser(user) {
    dispatch(deleteUser(user));
  },
  getStudyfields() {
    dispatch(getStudyfields());
  },
});

const mapStateToProps = (state) => {
  const user = state.get("user");
  const sfreducer = state.get("studyfield");
  return {
    users: user.get("users").toJS(),
    studyfields: sfreducer.get("studyfields").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUsersList);
