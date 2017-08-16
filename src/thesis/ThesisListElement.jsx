import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router";
import _ from "lodash";

export default class ThesisListElement extends Component {

    selectThesis = () => {
        this.props.selectThesis(this.props.thesis.id);
    }

    sendStudentNotification = () => {
        this.props.sendStudentNotification(this.props.thesis.id);
    }

    toggleRegistrationRequest = () => {
        this.props.toggleRegistrationRequest(this.props.thesis.id);
    }

    render() {
        const thesis = this.props.thesis;
        return (
            <tr>
                <td>{thesis.status}</td>
                <td>
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            readOnly="true"
                            checked={thesis.ethesisDone ? "true" : ""}
                        />
                        <label></label>
                    </div>
                </td>
                <td>
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            readOnly="true"
                            checked={thesis.graderEvalDone ? "true" : ""}
                        />
                        <label></label>
                    </div>
                </td>
                <td>
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            readOnly="true"
                            checked={thesis.printDone ? "true" : ""}
                        />
                        <label></label>
                    </div>
                </td>
                <td>{thesis.authorLastname}</td>
                <td>{thesis.authorFirstname}</td>
                <td>
                    <Link to={`/thesis/${thesis.id}`}>{thesis.title}</Link>
                </td>
                <td>{thesis.instructor}</td>
                <td>{thesis.studyfield}</td>
                <td>{thesis.grade}</td>
                <td>
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            checked={this.props.selected ? "true" : ""}
                            onChange={this.selectThesis}
                        />
                        <label></label>
                    </div>
                </td>
                <td>
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            readOnly="true"
                            checked={thesis.regreq ? "true" : ""}
                            onChange={this.toggleRegistrationRequest}
                        />
                        <label></label>
                    </div>
                </td>
                <td>
                    {thesis.notificationSent === true ?
                        <button className="ui negative button" disabled>Sent</button>
                        :
                        <button className="ui positive button" onClick={this.sendStudentNotification}>Send</button>
                    }
                </td>
            </tr>
        )
    };
}