import React, { Component } from "react";

import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";

export class EmailDraftList extends Component {

  constructor() {
    super();
    this.state = {
      updateEmailDraft: Validate.createForm("updateEmailDraft", "emailDraftEdit"),
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("updateEmailDraft", "ed", (updateEmailDraft) => { this.setState({ updateEmailDraft, })});
  }

  componentWillUnmount() {
    Validate.unsubscribe("ed");
  }

  handleChange(formname, field, event) {
    // event.preventDefault();
    Validate.updateForm(formname, field, event.target.value);
  }

  handleClick(type, index, event) {
    event.preventDefault();
    if (type === "select") {
      Validate.replaceForm("updateEmailDraft", this.props.EmailDrafts[index]);
    } else if (type === "update" && this.state.updateEmailDraft.values.id && Validate.isFormValid("updateEmailDraft")) {
      this.props.updateEmailDraft(this.state.updateEmailDraft.values);
    }
  }

  renderUpdateDraft() {
    const updateEmailDraft = this.state.updateEmailDraft.values;
    return(
      <div className="field">
        <h2 className="ui dividing header">Update draft {updateEmailDraft.type}</h2>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={updateEmailDraft.title}
            placeholder="Link to Urkund"
            onChange={this.handleChange.bind(this, "updateEmailDraft", "title")}
          />
          <ValidateError errors={this.state.updateEmailDraft.errors} model="emailDraftEdit" field="title" />
        </div>
        <div className="field">
          <label>Body</label>
          <textarea
            value={updateEmailDraft.body}
            placeholder="Body"
            onChange={this.handleChange.bind(this, "updateEmailDraft", "body")}
          />
          <ValidateError errors={this.state.updateEmailDraft.errors} model="emailDraftEdit" field="body" />
        </div>
        <button className="ui button green" onClick={this.handleClick.bind(this, "update", "")}>Update</button>
      </div>
    );
  }

  renderDraft(draft, index) {
    return (
      <div onClick={this.handleClick.bind(this, "select", index)}>
        <h3 className="ui dividing header">{draft.type}</h3>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={draft.title}
            placeholder="Title"
            readOnly="true"
          />
        </div>
        <div className="field">
          <label>Body</label>
          <textarea
            value={draft.body}
            readOnly="true"
          />
        </div>
      </div>
    );
  }

  render() {
    const { EmailDrafts } = this.props || [];
    return (
      <div className="ui form">
        {this.renderUpdateDraft()}
        <h2 className="ui dividing header">Email drafts</h2>
        <p>
          Drafts for the emails that are being sent by Grappa. $LINK$ indicates the place where the link is inserted.
        </p>
        <div>
          { EmailDrafts.map((item, index) =>
            <div className="m-bot" key={index}>
              {this.renderDraft(item, index)}
            </div>
          )}
        </div>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getEmailDrafts, updateEmailDraft } from "./email.actions";

const mapStateToProps = (state) => {
  const email_r = state.get("email");
  return {
    EmailDrafts: email_r.get("emaildrafts").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getEmailDrafts() {
    dispatch(getEmailDrafts());
  },
  updateEmailDraft(draft) {
    dispatch(updateEmailDraft(draft));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailDraftList);
