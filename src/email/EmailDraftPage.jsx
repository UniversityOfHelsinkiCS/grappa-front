import React, { Component } from "react";

import Validate from "../validate/Validate";
import ValidateError from "../ui/Error";

export class EmailDraftPage extends Component {

  constructor() {
    super();
    this.state = {
      updateEmailDraft: Validate.createForm("updateEmailDraft", "emailDraftEdit"),
      editing: false,
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("updateEmailDraft", "ed", (updateEmailDraft) => { this.setState({ updateEmailDraft, });});
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
    if (type === "stopEditing") {
      this.setState({ editing: false })
    } else if (type === "edit") {
      this.setState({ editing: true })
      Validate.replaceForm("updateEmailDraft", this.props.EmailDrafts[index]);
    } else if (type === "save" && this.state.updateEmailDraft.values.id && Validate.isFormValid("updateEmailDraft")) {
      this.props.updateEmailDraft(this.state.updateEmailDraft.values);
    } 
  }

  renderEditDraft() {
    const updateEmailDraft = this.state.updateEmailDraft.values;
    return (
      <div className="field">
        <h2 className="ui dividing header">Edit draft: {updateEmailDraft.type}</h2>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={updateEmailDraft.title}
            placeholder="Title"
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
        <button className="ui button blue" onClick={this.handleClick.bind(this, "save", "")}>Save</button>
        <button className="ui button red" onClick={this.handleClick.bind(this, "stopEditing", "")}>Stop editing</button>
      </div>
    );
  }

  renderDraft(draft, index) {
    return (
      <div>
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
        <div className="field">
          <button className="ui green button" onClick={this.handleClick.bind(this, "edit", index)}>Edit</button>
        </div>
      </div>
    );
  }

  render() {
    const { EmailDrafts } = this.props || [];
    return (
      <div className="ui form">
        <h2 className="ui dividing header">Email drafts</h2>
        <p>
          Drafts for the emails that are being sent by Grappa. Title is the email's title and body the text.
          Different variables are indicated with double dollars eg. $LINK$ which differ from draft to draft.
        </p>
        <div>
          { EmailDrafts.map((item, index) =>
            { if (this.state.editing && this.state.updateEmailDraft.values.id === item.id) {
                return (
                <div className="m-bot" key={index}>
                  {this.renderEditDraft(item, index)}
                </div>
                )
              } else {
                return (
                <div className="m-bot" key={index}>
                  {this.renderDraft(item, index)}
                </div>
                )
              }
            }
          )}
        </div>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { updateEmailDraft } from "./email.actions";

const mapStateToProps = (state) => {
  const email_r = state.get("email");
  return {
    EmailDrafts: email_r.get("emaildrafts").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateEmailDraft(draft) {
    dispatch(updateEmailDraft(draft));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailDraftPage);
