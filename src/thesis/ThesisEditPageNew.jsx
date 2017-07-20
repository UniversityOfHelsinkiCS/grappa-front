import React, { Component } from "react";
import { browserHistory, Link } from "react-router";

import Validate from "../validate/Validate";

import ThesisInformation from "./components/ThesisInformation";
import ThesisUploadWidget from "./components/ThesisUploadWidget";

export class ThesisEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateThesis: Validate.createForm("updateThesis", "thesisEdit"),
            editing: false,
            grading: false,
        };
    }

    componentDidMount() {
        Validate.subscribeToForm("updateThesis", "tse", (updateThesis) => {
            this.setState({ updateThesis });
        });
        const thesis = this.findThesisFromProps(this.props);
        if (thesis) {
            Validate.replaceForm("updateThesis", thesis);
            if (this.props.user.role === "admin") {
                this.setState({ editing: true })
            }
        }
    }

    componentWillUnmount() {
        Validate.unsubscribe("tse");
    }

    componentWillReceiveProps(newProps) {
        const thesis = this.findThesisFromProps(newProps);
        if (thesis) {
            Validate.replaceForm("updateThesis", thesis);
        }
    }

    findThesisFromProps(props) {
        let thesisId;
        try {
            thesisId = parseInt(props.params.id, 10);
        } catch (e) {
            return undefined;
        }
        return props.theses.find(thesis => {
            if (thesis.id === thesisId) {
                return thesis;
            }
        });
    }

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

    saveThesis = () => {
        if (Validate.isFormValid("updateThesis")) {
            const form = new FormData();
            const thesis = this.state.updateThesis.values;
            if (thesis.GraderReviewFile.name) {
                form.append("GraderReviewFile", thesis.GraderReviewFile);
            }
            if (thesis.AbstractFile.name) {
                form.append("AbstractFile", thesis.AbstractFile);
            }
            thesis.GraderReviewFile = undefined;
            thesis.AbstractFile = undefined;
            form.append("json", JSON.stringify(thesis));
            this.props.updateThesis(thesis.id, form);
        }
    }

    deleteThesis = () => {
        if (confirm("Are you sure you want to delete this thesis? All data will be lost.")) {
            this.props.deleteThesis(this.state.updateThesis.values.id);
        }
    }

    gradeThesis = () => {
        this.setState({ grading: true });
    }

    downloadThesis = () => {
        this.props.downloadTheses({ thesisIds: [this.state.updateThesis.values.id] });
    }

    handleChange = (fieldName, fieldValue) => {
        console.log(fieldName + ": " + fieldValue);
        Validate.updateForm("updateThesis", fieldName, fieldValue);
    }

    handleAbstract = (fieldValue) => {
        files[0].filetype = key;
        Validate.updateForm("updateThesis", key, files[0]);
    }

    handleReview = (fieldValue) => {
        files[0].filetype = key;
        Validate.updateForm("updateThesis", key, files[0]);
    }

    renderControlButtons() {
        const user = this.props.user;
        if (user.role === "admin") {
            return (
                <div className="field">
                    {this.state.editing ?
                        <div className="ui red button" onClick={this.toggleEditing}>Stop editing</div>
                        :
                        <div className="ui green button" onClick={this.toggleEditing}>Edit</div>
                    }
                    <div className="ui blue button" onClick={this.saveThesis}>Save</div>
                    <div className="ui red button" onClick={this.deleteThesis}>Delete</div>
                    <button className="ui violet button" onClick={this.downloadThesis}>Download as PDF</button>
                </div>
            );
        } else if (user.role === "professor" && user.StudyFieldId === this.state.updateThesis.values.StudyFieldId) {
            return (
                <div className="field">
                    {this.state.grading ?
                        <div className="ui blue button" onClick={this.saveThesis}>Save</div>
                        :
                        <div className="ui green button" onClick={this.gradeThesis}>Evaluate graders</div>
                    }
                    <button className="ui violet button" onClick={this.downloadThesis}>Download as PDF</button>
                </div>
            );
        } else {
            return (
                <div className="field">
                    <button className="ui violet button" onClick={this.downloadThesis}>Download as PDF</button>
                </div>
            );
        }
    }

    renderThesisFileButtons() {
        return (
            <div className="m-bot">
                <h3 className="ui dividing header">Thesis Files</h3>
                <p>
                    Click to open the pdf-document in a new tab.
                </p>
                <div className="three fields">
                    <div className="field">
                        <Link className="ui orange button" to={`/thesis/${this.state.updateThesis.values.id}/review`} target="_blank">
                            <i className="external icon"></i>
                            Review
                        </Link>
                    </div>
                    <div className="field">
                        <Link className="ui orange button" to={`/thesis/${this.state.updateThesis.values.id}/abstract`} target="_blank">
                            <i className="external icon"></i>
                            Abstract
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    renderThesisUploadFiles() {
        return (
            <div>
                <h3 className="ui dividing header">Upload new Thesis files</h3>
                <p>
                    Size limit for the files is 1 MB for the review and 40 MB for the Thesis
                            from which 2nd page is parsed as abstract.
                </p>
                <div className="two fields">
                    <ThesisUploadWidget errors={this.state.updateThesis.errors} sendChange={this.handleReview} currentFile={this.state.updateThesis.values.GraderReviewFile.name} type={"Review"} />
                    <ThesisUploadWidget errors={this.state.updateThesis.errors} sendChange={this.handleAbstract} currentFile={this.state.updateThesis.values.AbstractFile.name} type={"Abstract"} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="ui form">
                <h2 className="ui dividing header">{this.state.updateThesis.values.title}</h2>
                {this.renderControlButtons()}
                <ThesisInformation errors={this.state.updateThesis.errors} thesis={this.state.updateThesis.values} sendChange={this.handleChange} studyFields={this.props.studyfields} editing={this.state.editing} />
                {this.renderThesisFileButtons()}
                {this.state.editing ? this.renderThesisUploadFiles() : ""}
            </div>
        );
    }
}

import { connect } from "react-redux";

import { updateThesis, deleteThesis, downloadTheses } from "./thesis.actions";
import { updateGraders } from "../grader/grader.actions";
import { sendReminder } from "../email/email.actions";
import { updateThesisProgress } from "../thesis/thesis.actions";

const mapStateToProps = (state) => {
    const auth = state.get("auth");
    const thesis = state.get("thesis");
    const councilmeeting = state.get("councilmeeting");
    const sfreducer = state.get("studyfield");
    const grader_r = state.get("grader");
    return {
        user: auth.get("user").toJS(),
        theses: thesis.get("theses").toJS(),
        councilmeetings: councilmeeting.get("councilmeetings").toJS(),
        studyfields: sfreducer.get("studyfields").toJS(),
        Graders: grader_r.get("graders").toJS(),
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateThesis(id, thesis) {
        dispatch(updateThesis(id, thesis));
    },
    updateGraders(graders) {
        dispatch(updateGraders(graders));
    },
    sendReminder(thesisId, type) {
        dispatch(sendReminder(thesisId, type));
    },
    updateThesisProgress(tp) {
        dispatch(updateThesisProgress(tp));
    },
    deleteThesis(thesisId) {
        dispatch(deleteThesis(thesisId));
    },
    downloadTheses(theses) {
        dispatch(downloadTheses(theses));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisEditPage);