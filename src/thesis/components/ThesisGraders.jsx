import React, { Component } from "react";

import ValidateError from "../../ui/Error";
import GradersDropdown from "../../ui/GradersDropdown";

export class ThesisGraders extends Component {
    render() {
        return (
            <div className="m-bot">
                <h3 className="ui dividing header">Graders</h3>
                <p>Click to open a drop-down menu or to type into the input for search.</p>
                <div className="field">
                    <label>Select Graders</label>
                    <GradersDropdown formname="newThesis" graders={this.props.graders}
                        selected={this.props.alreadySelected} editable />
                </div>
                <ValidateError errors={this.props.errors} model="thesis" field="Graders" />
            </div>
        );
    }
}
export default ThesisGraders;