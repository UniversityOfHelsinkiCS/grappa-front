import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";

export class EmailDraftList extends Component {

  componentDidMount() {
    this.props.getEmailDrafts();
  }

  render() {
    const { EmailDrafts } = this.props;
    const columns = [
      "type",
      "title",
      "body",
      "",
    ];
    return (
      <div>
        <h2 className="ui dividing header">Email drafts</h2>
        <p>
          Drafts for the emails that are being sent by Grappa. $LINK$ indicates the place where the link is inserted.
        </p>
        <Table
          className="ui table"
          noDataText="No users found"
          ref="table"
          sortable columns={columns}
          data={EmailDrafts}
          filterable={columns}
        >
          <Thead>
            <Th column="type">Type</Th>
            <Th column="title">Title</Th>
            <Th column="body">Body</Th>
            <Th column="edit">Edit</Th>
          </Thead>
        </Table>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getEmailDrafts } from "./email.actions";

const mapStateToProps = (state) => {
  const email_r = state.get("email");
  return {
    EmailDrafts: email_r.get("emailDrafts").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getEmailDrafts() {
    dispatch(getEmailDrafts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailDraftList);
