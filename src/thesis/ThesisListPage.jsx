/**
* ThesisList.smart for displaying the data relating to all the thesis added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import moment from "moment";
import ThesisListElement from "./ThesisListElement";
import ThesisList from "./ThesisList"

export class ThesisListPage extends Component {
    constructor() {
        super();
        this.state = {
            theses: [],
        };
    }

    componentDidMount() {
        this.props.getTheses();
        this.setState({
            theses: this.props.theses
        });
    }

    componentWillReceiveProps(newProps) {
        // theses since they seem to always be in disorder
        const newTheses = newProps.theses.sort((a, b) => a.id - b.id)
        this.setState({ theses: newTheses });
    }
    /*
    formatTheses(theses) {
        return theses.map(thesis => {
            if (thesis.ThesisProgress.StudentRegistrationNotification) {
                thesis.ThesisProgress.studentNotificationSent = true;
            }
            return {
                id: thesis.id,
                status: thesis.ThesisProgress.ethesisDone && thesis.ThesisProgress.graderEvalDone && thesis.ThesisProgress.printDone ?
                    "Done" : "In progress",
                authorFirstname: thesis.authorFirstname,
                authorLastname: thesis.authorLastname,
                title: thesis.title,
                instructor: `${thesis.User.firstname} ${thesis.User.lastname}`,
                studyfield: thesis.StudyField.name,
                grade: thesis.grade,
                ethesisDone: thesis.ThesisProgress.ethesisDone,
                graderEvalDone: thesis.ThesisProgress.graderEvalDone,
                printDone: thesis.ThesisProgress.printDone,
                regreq: thesis.regreq,
                notificationSent: thesis.ThesisProgress.studentNotificationSent,
            };
        });
    }
    */

    downloadTheses = (theses) => {
        const IDs = theses.map(thesis => thesis.id);
        console.log("Downloading");
        //this.props.downloadTheses({ thesisIds: IDs });
    }

    sendRegisterRequest = (thesisId) => {
        if (this.props.user.role !== "admin") {
            return;
        }

        //Since updateThesis wants form
        const form = new FormData();
        const found = this.props.theses.find(arrThesis => (arrThesis.id == thesisId))
        found.regreq = !found.regreq;
        form.append("json", JSON.stringify(found));
        this.props.updateThesis(thesisId, form);
    }

    handleSendRegistrationEmail = (thesisId) => {
        if (this.props.user.role !== "admin") {
            return;
        }
        this.props.sendReminder(thesisId, "StudentRegistrationNotification");
    }

    render() {
        const inProgress = this.state.theses.filter(thesis => thesis.status === "In progress").length;
        return (
            <div>
                <div className="m-bot">
                    <h2 className="ui dividing header">Theses</h2>
                    <p>
                        Past and current theses which you are allowed to view. Click on the thesis to select/unselect.
                    </p>
                    <button className="ui violet button" onClick={this.downloadTheses}>Download selected</button>
                </div>
                <p>Theses done/all theses: {this.state.theses.length - inProgress}/{this.state.theses.length}</p>
                <ThesisList
                    theses={this.state.theses}
                    toggleRegisterRequest={this.sendRegisterRequest}
                    sendRegistrationEmail={this.handleSendRegistrationEmail}
                />
            </div>
        );
    }
}

import { connect } from "react-redux";
import { updateThesis, getTheses, downloadTheses, } from "../thesis/thesis.actions";
import { sendReminder } from "../email/email.actions";

const mapStateToProps = (state) => {
    const auth = state.get("auth");
    const thesis = state.get("thesis");
    return {
        theses: thesis.get("theses").toJS(),
        user: auth.get("user").toJS(),
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateThesis(id, thesis) {
        dispatch(updateThesis(id, thesis));
    },
    sendReminder(thesisId, type) {
        dispatch(sendReminder(thesisId, type));
    },
    getTheses() {
        dispatch(getTheses());
    },
    downloadTheses(theses) {
        dispatch(downloadTheses(theses));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisListPage);
