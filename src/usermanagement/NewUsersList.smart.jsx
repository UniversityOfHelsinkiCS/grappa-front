import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export class NewUsersList extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

    render() {
      const { users } = this.props;
    return (
      <div>


        <h2>New users</h2>
        <BootstrapTable data={users} search bordered={false}>
          <TableHeaderColumn filter= {{ type: "TextFilter" }} dataField="id" isKey hidden>
          Thesis ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort width="200">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort width="200">Email</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getUsers } from "./usermanagement.actions";

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



export default connect(mapStateToProps, mapDispatchToProps)(NewUsersList);
