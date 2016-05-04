/*
* NewUsersList.smart for displaying the data relating to new users added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export class NewUsersList extends Component {
  constructor() {
    super();
    this.acceptButtonFormatter = this.acceptButtonFormatter.bind(this);
    this.declineButtonFormatter = this.declineButtonFormatter.bind(this);
    this.rolesFormatter = this.rolesFormatter.bind(this);
    this.fieldFormatter = this.fieldFormatter.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.declineUser = this.declineUser.bind(this);
    this.setUserRole = this.setUserRole.bind(this);
    this.state = {};
  }

  /*
  * Defines what is done at the beginning of the components life before rendering.
  */
  componentDidMount() {
    this.props.getUsers();
  }

  setUserRole(cell, id, event) {
    if (this.state[id] === undefined) {
      this.state[id] = {};
    }
    this.state[id].role = event.target.value;
  }

  setUserField(cell, id, event) {
    if (this.state[id] === undefined) {
      this.state[id] = {};
    }
    this.state[id].studyfieldId = event.target.value;
    console.log("ID on: ", id);
  }

  updateUser(cell, user) {
    const newUser = Object.assign({}, user);
    newUser.role = this.state[user.id].role;
    if (this.state[user.id].studyfieldId !== 5) {
      newUser.StudyFieldId = this.state[user.id].studyfieldId;
    }
    newUser.isActive = true;
    this.props.updateUser(newUser);
  }

  declineUser(user) {
    const { declineUser } = this.props;
    declineUser(user);
  }

  /*
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

  rolesFormatter(cell, row) {
    return (
      <select className="ui dropdown" onChange={this.setUserRole.bind(this, cell, row.id)}>
        <option value="instructor">Instructor</option>
        <option value="print-person">Print-person</option>
        <option value="professor">Professor</option>
        <option value="admin">Admin</option>
      </select>
    );
  }

  fieldFormatter(cell, row) {
    return (
      <select className="ui dropdown" onChange={this.setUserField.bind(this, cell, row.id)}>
        <option value="5">SELECT</option>
        <option value="1">Algorithmic Bioinformatics</option>
        <option value="2">Algorithms, Data Analytics and Machine Learning</option>
        <option value="3">Networking and Services</option>
        <option value="4">Software Systems</option>
      </select>
    );
  }

  /*
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
        { noUsers ?
          <h2>No new users</h2>
          :
          <div>
            <h2>New users</h2>
            <BootstrapTable data={users}>
              <TableHeaderColumn filter= {{ type: "TextFilter" }} dataField="id" isKey hidden>
              Thesis ID</TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort width="200">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="email" dataSort width="200">Email</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.rolesFormatter} dataSort width="150">Permission</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.fieldFormatter} dataSort width="100">Field</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.acceptButtonFormatter} dataSort width="50" />
              <TableHeaderColumn dataFormat={this.declineButtonFormatter} dataSort width="50" />
            </BootstrapTable>
          </div>
        }
      </div>
      );
  }
}
import { connect } from "react-redux";
import { getUsers, updateUser, deleteUser } from "./user.actions";

/*
* A special funciton used to define what the form of the data is that is gotten from the state.
* @return users A list containing all the new users listed in the database.
*/
const mapStateToProps = (state) => {
  const user = state.get("user");
  return {
    users: user.get("users").toJS(),
  };
};

/*
* A special function used to define and dispatch the relevant data to usermanagement.actions
*/
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUsersList);
