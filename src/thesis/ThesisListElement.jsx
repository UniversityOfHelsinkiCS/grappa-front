import React from "react";
import { Link } from "react-router";

export const ThesisListElement = props => {

    const selectThesis = () => {
        props.selectThesis(props.thesis.id);
    }

    const sendStudentNotification = () => {
        props.sendStudentNotification(props.thesis.id);
    }

    const toggleRegistrationRequest = () => {
        props.toggleRegistrationRequest(props.thesis.id);
    }

    const status = (thesis) => {
        return (
            thesis.ThesisProgress.ethesisDone
                && thesis.ThesisProgress.graderEvalDone
                && thesis.ThesisProgress.printDone ?
                "Done" :
                "In progress"
        )
    }

    return (
        <tr>
            <td>{status(props.thesis)}</td>
            <td>
                <div className="ui checkbox">
                    <input
                        type="checkbox"
                        readOnly="true"
                        checked={props.thesis.ThesisProgress.ethesisDone ? "true" : ""}
                    />
                    <label></label>
                </div>
            </td>
            <td>
                <div className="ui checkbox">
                    <input
                        type="checkbox"
                        readOnly="true"
                        checked={props.thesis.ThesisProgress.graderEvalDone ? "true" : ""}
                    />
                    <label></label>
                </div>
            </td>
            <td>
                <div className="ui checkbox">
                    <input
                        type="checkbox"
                        readOnly="true"
                        checked={props.thesis.ThesisProgress.printDone ? "true" : ""}
                    />
                    <label></label>
                </div>
            </td>
            <td>{props.thesis.authorLastname}</td>
            <td>{props.thesis.authorFirstname}</td>
            <td>
                <Link to={`/thesis/${props.thesis.id}`}>{props.thesis.title}</Link>
            </td>
            <td>{props.thesis.User.firstname + " " + props.thesis.User.lastname}</td>
            <td>{props.thesis.StudyField.name}</td>
            <td>{props.thesis.grade}</td>
            <td>
                <div className="ui checkbox">
                    <input
                        type="checkbox"
                        checked={props.selected ? "true" : ""}
                        onChange={selectThesis}
                    />
                    <label></label>
                </div>
            </td>
            <td>
                <div className="ui checkbox">
                    <input
                        type="checkbox"
                        checked={props.thesis.regreq ? "true" : ""}
                        onChange={toggleRegistrationRequest}
                    />
                    <label></label>
                </div>
            </td>
            <td>
                {props.thesis.ThesisProgress.studentNotificationSent === true ||
                    props.thesis.ThesisProgress.StudentRegistrationNotification !== null ?
                    <button className="ui negative button" disabled>Sent</button>
                    :
                    <button className="ui positive button" onClick={sendStudentNotification}>Send</button>
                }
            </td>
        </tr>
    )
}