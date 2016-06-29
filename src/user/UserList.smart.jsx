import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";

export class UserList extends Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const users = this.props.users.map(user => {
      let name = "";
      if (user.StudyField) {
        name = user.StudyField.name;
      }
      user.studyfield = name;
      return user;
    });
    const columns = [
      "role",
      "studyfield",
      "name",
      "email",
    ];
    return (
      <div>
        <h2 className="ui dividing header">Users</h2>
        <p>
          All registered and activated users. Retiring an user disables the account but doesn't delete it from the database and it can be reversed.
        </p>
        <Table
          className="ui table"
          noDataText="No users found"
          ref="table"
          sortable columns={columns}
          data={users}
          filterable={columns}
        >
          <Thead>
            <Th column="role">Role</Th>
            <Th column="studyfield">Field</Th>
            <Th column="name">Name</Th>
            <Th column="email">Email</Th>
          </Thead>
        </Table>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getUsers } from "./user.actions";

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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
