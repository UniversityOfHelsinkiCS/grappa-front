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
        this.setState({ theses: this.props.theses });
    }

    componentWillReceiveProps(newProps) {
        if (this.state.theses !== newProps.theses) {
            this.setState({ theses: newProps.theses });
        }
    }

    handleDownloadTheses = (thesisIds) => {
        this.props.downloadTheses({ thesisIds });
    }

    sendRegisterRequest = (thesisId) => {
        //Since updateThesis wants form
        const form = new FormData();
        const found = this.props.theses.find(arrThesis => (arrThesis.id == thesisId))
        found.regreq = !found.regreq;
        form.append("json", JSON.stringify(found));
        this.props.updateThesis(thesisId, form);
    }

    handleSendRegistrationEmail = (thesisId) => {
        this.props.sendReminder(thesisId, "StudentRegistrationNotification");
    }

    render() {
        return (
            <div>
                <div className="m-bot">
                    <h2 className="ui dividing header">Theses</h2>
                    <p>
                        Past and current theses which you are allowed to view. Click on the thesis to select/unselect.
                    </p>
                </div>
                <ThesisList
                    theses={this.state.theses}
                    userRole={this.props.user.role}
                    toggleRegisterRequest={this.sendRegisterRequest}
                    sendRegistrationEmail={this.handleSendRegistrationEmail}
                    sendDownloadTheses={this.handleDownloadTheses}
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
