import React, { Component } from "react";

import EmailDraft from "./EmailDraft"

export class EmailDraftList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.draftList.map((draft, index) => {
                    return <EmailDraft draft={draft} key={index} index={index} updateDraft={this.props.handleUpdateDraft} />
                })}
            </div>
        );
    }
}

export default EmailDraftList;