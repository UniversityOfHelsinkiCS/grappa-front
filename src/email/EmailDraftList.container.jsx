import React, { Component } from "react";

export class EmailDraftList extends Component {

  constructor() {
    super();
    this.state = {
      EmailDrafts: [],
    };
  }

  componentWillMount() {
    console.log(this.props.EmailDrafts);
    this.setState({
      EmailDrafts: this.props.EmailDrafts,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.EmailDrafts && newProps.EmailDrafts) {
      this.setState({
        EmailDrafts: newProps.EmailDrafts,
      });
    }
  }

  handleChange(index, field, event) {
    event.preventDefault();
    console.log(this.state.EmailDrafts[index][field]);
    console.log(event.target.value);
    this.state.EmailDrafts[index][field] = event.target.value;
    this.setState({});
  }

  handleClick(type, index, event) {
    event.preventDefault();
    if (type === "update") {
      this.props.updateEmailDraft(this.state.EmailDrafts[index]);
    }
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
            placeholder="Link to Urkund"
            onChange={this.handleChange.bind(this, index, "title")}
          />
        </div>
        <div className="field">
          <label>Body</label>
          <textarea
            value={draft.body}
            onChange={this.handleChange.bind(this, index, "body")}
          />
        </div>
        <button className="ui button green" onClick={this.handleClick.bind(this, "update", index)}>Update</button>
      </div>
    );
  }

  render() {
    const { EmailDrafts } = this.state;
    console.log(EmailDrafts);
    return (
      <div>
        <h2 className="ui dividing header">Email drafts</h2>
        <p>
          Drafts for the emails that are being sent by Grappa. $LINK$ indicates the place where the link is inserted.
        </p>
        <div className="ui form">
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
