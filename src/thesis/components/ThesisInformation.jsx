import React, { Component } from "react";

import ValidateError from "../../ui/Error";

export class ThesisInformation extends Component {

    changeField = (fieldName, event) => {
        const fieldValue = event.target.value;
        if (fieldValue) {
            this.props.sendChange(fieldName, fieldValue);
        }

    }

    renderTextField(label, fieldName, placeholder) {
        return (
            <div className="field">
                <label>{label}</label>
                <input
                    type="text"
                    onChange={(event) => {this.changeField(fieldName, event)}}
                    placeholder={placeholder}
                />
                <ValidateError errors={this.props.errors} model="thesis" field={fieldName} />
            </div>
        );
    }

    renderDropdownField(label, fieldArray, fieldName) {
        return (
            <div className="field">
                <label>{label}</label>
                <select
                    className="ui fluid search dropdown"
                    onChange={(event) => {this.changeField(fieldName, event)}}>
                    <option key="0" value="">Select {label}</option>
                    {fieldArray.map((field, index) =>
                        <option key={index} value={field.id}>
                            {field.name}
                        </option>
                    )}
                </select>
                <ValidateError errors={this.props.errors} model="thesis" field={fieldName} />
            </div>
        );
    }

    renderThesisAuthor() {
        return (
            <div className="m-bot">
                <p>
                    Thesis has to have a minimun of two graders and if
                    one of them isn't at least a professor and the other a doctor an evaluation of
                    the graders will be done by the thesis' studyfield's professor.
                </p>
                <h3 className="ui dividing header">Thesis Author</h3>
                <div className="three fields">
                    {this.renderTextField("First name", "authorFirstname", "First Name")}
                    {this.renderTextField("Last name", "authorLastname", "Last Name")}
                    {this.renderTextField("Email", "authorEmail", "Email Address")}
                </div>
            </div>
        );
    }

    renderThesisInformation() {
        const activeStudyFields = this.props.studyFields.filter(field => {
            if (field.isActive) return field;
        });
        const oldGradeFields = [
            { id: "Approbatur", name: "Approbatur" },
            { id: "Lubenter Approbatur", name: "Lubenter Approbatur" },
            { id: "Non Sine Laude Approbatur", name: "Non Sine Laude Approbatur" },
            { id: "Cum Laude Approbatur", name: "Cum Laude Approbatur" },
            { id: "Magna Cum Laude Approbatur", name: "Magna Cum Laude Approbatur" },
            { id: "Eximia Cum Laude Approbatur", name: "Eximia Cum Laude Approbatur" },
            { id: "Laudatur", name: "Laudatur" },
        ]
        return (
            <div className="m-bot">
                <h3 className="ui dividing header">Thesis Information</h3>
                <div className="three fields">
                    {this.renderTextField("Title", "title", "Title")}
                    {this.renderDropdownField("Studyfield", activeStudyFields, "StudyFieldId")}
                    {this.renderDropdownField("Grade", oldGradeFields, "grade")}
                </div>
                <div className="three fields">
                    {this.renderTextField("Urkund-link", "urkund", "Link to Urkund")}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderThesisAuthor()}
                {this.renderThesisInformation()}
            </div>
        );
    }
}
export default ThesisInformation;