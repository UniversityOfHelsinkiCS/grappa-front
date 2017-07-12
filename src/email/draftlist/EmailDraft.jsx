import React, { Component } from "react";

import Validate from "../../validate/Validate";
import ValidateError from "../../ui/Error";

export class EmailDraft extends Component {
    constructor(props) {
        super(props);
        const draftFormName = "updateEmailDraft" + this.props.index;
        this.state = {
            editing: false,
            draftFormName,
            updateEmailDraft: Validate.createForm(draftFormName, "emailDraftEdit"),
        };
    }

    componentDidMount() {
        Validate.subscribeToForm(this.state.draftFormName, "ed" + this.props.index, updateEmailDraft => this.setState({ updateEmailDraft }));
    }

    componentWillUnmount() {
        Validate.unsubscribe("ed" + this.props.index);
    }

    handleChange(field, event) {
        Validate.updateForm(this.state.draftFormName, field, event.target.value);
    }

    saveEdit = () => {
        if (Validate.isFormValid(this.state.draftFormName)) {
            this.props.updateDraft(this.state.updateEmailDraft.values);
        }
    }

    cancelEdit = () => {
        this.setState({ editing: false })
    }

    startEdit = () => {
        this.setState({ editing: true })
        Validate.replaceForm(this.state.draftFormName, this.props.draft);
    }

    delete = () => {
        this.props.sendDeleteRequest(this.props.draft);
    }

    renderButtons() {
        if (this.state.editing) {
            return (
                <div>
                    <button className="ui button blue" onClick={this.saveEdit}>Save</button>
                    <button className="ui button orange" onClick={this.cancelEdit}>Stop editing</button>
                    <button className="ui negative right floated button" onClick={this.delete}> Delete </button>
                </div>
            );
        } else {
            return (
                <div className="field">
                    <button className="ui green button" onClick={this.startEdit}>Edit</button>
                </div>
            );
        }
    }

    render() {
        const editing = this.state.editing;
        var draft = this.props.draft;
        if (editing) {
            draft = this.state.updateEmailDraft.values;
        }
        if (!this.state.updateEmailDraft) {
            return <div></div>;
        }
        return (
            <div className="m-bot">
                <h3 className="ui dividing header">{editing ? "Editing draft: " : ""}{draft.type}</h3>
                <div className="field">
                    <label>Title</label>
                    <input
                        type="text"
                        value={draft.title}
                        placeholder="Title"
                        readOnly={!editing}
                        onChange={this.handleChange.bind(this, "title")}
                    />
                    <ValidateError errors={this.state.updateEmailDraft.errors} model="emailDraftEdit" field="title" />
                </div>
                <div className="field">
                    <label>Body</label>
                    <textarea
                        value={draft.body}
                        readOnly={!editing}
                        onChange={this.handleChange.bind(this, "body")}
                    />
                    <ValidateError errors={this.state.updateEmailDraft.errors} model="emailDraftEdit" field="body" />
                </div>

                {this.renderButtons()}
            </div>
        );
    }
}



export default EmailDraft;