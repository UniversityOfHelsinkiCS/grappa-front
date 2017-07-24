import React, { Component } from "react";

import moment from "moment";

export class ThesisEmails extends Component {

    sendReminder = (reminderType) => {
        this.props.sendEmail(reminderType);
    }

    setDone = (reminderType) => {
        this.props.sendDone(reminderType);
    }

    renderReminder(name, type, reminder, isDone) {
        console.log(reminder);
        return (
            <div className="field">
                <div className="ui right input">
                    <h3 className="ui header">{name}</h3>
                    <div className="ui checkbox m-left">
                        <input type="checkbox" readOnly="true" checked={isDone ? "true" : ""} />
                        <label></label>
                    </div>
                </div>
                <div className="three fields">
                    <div className="field">
                        <label>Recipient</label>
                        <p>{reminder.to}</p>
                    </div>
                    <div className="field">
                        <label>Last sent</label>
                        {reminder.lastSent ? <p>{moment(new Date(reminder.lastSent)).format("DD/MM/YYYY HH:mm")}</p> : <p></p>}
                    </div>
                    {isDone ? <div className="field"></div> :
                        <div>
                            <div className="field">
                                <label>&nbsp;</label>
                                <button className="ui blue button" onClick={() => this.sendReminder(type)}>
                                    Send reminder
                                </button>
                            </div>
                        </div>
                    }
                    {isDone ? <div className="field"></div> :
                        <div>
                            <div className="field">
                                <label>&nbsp;</label>
                                <button className="ui red button" onClick={() => this.setDone(type)}>
                                    Set done
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }

    render() {
        const thesisProgress = this.props.thesisProgress;
        return (
            <div>
                <h2 className="ui dividing header">Sent reminders</h2>
                {this.renderReminder("Ethesis Reminder", "EthesisReminder", thesisProgress.EthesisReminder || {}, thesisProgress.ethesisDone)}
                {this.renderReminder("Grader Evaluation Reminder", "GraderEvalReminder", thesisProgress.GraderEvalReminder || {}, thesisProgress.graderEvalDone)}
                {this.renderReminder("Print Thesis Reminder", "PrintReminder", thesisProgress.PrintReminder || {}, thesisProgress.printDone)}
                {this.renderReminder("Student Notification", "StudentRegistrationNotification", thesisProgress.StudentRegistrationNotification || {}, thesisProgress.studentNotificationSent)}
            </div>
        );
    }
}
export default ThesisEmails;