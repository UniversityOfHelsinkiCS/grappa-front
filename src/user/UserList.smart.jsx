import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";

export class UserList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getUsers();
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

  render() {
    const { users } = this.props;
    console.log(users);
    const columns = [
      "name",
    ];
    return (
      <div>
        <h2 className="ui dividing header">Users</h2>
        <Table
          className="ui table"
          noDataText="No users found due to apparent error"
          ref="table"
          sortable columns={columns}
          data={users}
          filterable={columns}
        >
          <Thead>
            <Th column="role">Role</Th>
            <Th column="studyfield">StudyField</Th>
            <Th column="name">Name</Th>
            <Th column="email">Email</Th>
          </Thead>
        </Table>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getUsers, updateUser } from "./user.actions";

const mapStateToProps = (state) => {
  const user = state.get("user");
  return {
    users: user.get("users").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers() {
    dispatch(getUsers());
  },
  updateUser(user) {
    dispatch(updateUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
