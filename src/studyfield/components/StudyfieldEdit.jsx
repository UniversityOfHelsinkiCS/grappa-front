import React, { Component } from "react";
import Validate from "../../validate/Validate";
import ValidateError from "../../ui/Error";

export default class StudyfieldEdit extends Component {

    updateStudyfield = () => {
        this.props.sendUpdate();
    }

    toggleActive = () => {
        this.props.toggleActive();
    }

    handleChange = (event) => {
        this.props.sendChange(event.target.value);
    }

    render() {
        return (
            <div>
                <div className="field">
                    <h2 className="ui dividing header">Update studyfield {this.props.studyfield.name}</h2>
                    <div className="three fields">
                        <div className="field">
                            <input
                                type="text"
                                placeholder="Name"
                                value={this.props.studyfield.name}
                                onChange={this.handleChange}
                            />
                            <ValidateError errors={this.props.updateStudyfieldErrors} model="studyfieldEdit" field="name" />
                        </div>
                        <div className="field">
                            <div className="ui checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.props.studyfield.isActive ? "true" : ""}
                                    onChange={this.toggleActive}
                                />
                                <label>Active</label>
                            </div>
                        </div>
                        <div className="field">
                            <button className="ui green button" onClick={this.updateStudyfield}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}