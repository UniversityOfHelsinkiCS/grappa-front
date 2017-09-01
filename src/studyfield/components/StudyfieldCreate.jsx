import React, { Component } from "react";
import Validate from "../../validate/Validate";
import ValidateError from "../../ui/Error";

export default class StudyfieldCreate extends Component {

    handleChange = (event) => {
        this.props.sendChange(event.target.value);
    }

    saveStudyfield = () => {
        this.props.sendSave();
    }

    render() {
        return (
            <div>
                <h2 className="ui dividing header">Create a studyfield</h2>
                <div className="two fields">
                    <div className="field">
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={this.handleChange}
                        />
                        <ValidateError errors={this.props.errors} model="studyfield" field="name" />
                    </div>
                    <div className="field">
                        <button className="ui primary button" onClick={this.saveStudyfield}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}