import React, { Component } from "react";

import Dropzone from "react-dropzone";
import ValidateError from "../../ui/Error";

export class ThesisUploadWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.getLabel(props.type),
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ label: this.getLabel(newProps.type)});
    }

    getLabel = (type) => {
        if (type === "Review" || type === "newThesisReview") {
            return "Upload Thesis review as PDF (max. 1 MB)";
        } else if (type === "Abstract") {
            return "Upload Thesis with abstract on 2nd page (max. 40 MB)";
        }
        return "";
    }

    onDrop = (files) => {
        switch (this.props.type) {
            case "newThesisReview":
                this.props.sendChange("PdfFile", files[0]);
                return;
            case "Review":
                this.props.sendChange("GraderReviewFile", files[0]);
                return;
            case "Abstract":
                this.props.sendChange("AbstractFile", files[0]);
                return;
            default:
        }

        
    }

    render() {
        return (
            <div className="field">
                <label>{this.state.label}</label>
                    <Dropzone className="field upload-box" onDrop={this.onDrop} multiple={false}>
                        <p className="upload-p">Click to navigate to the file or drop them from your file system.</p>
                        <p className="upload-p">Current file: {this.props.currentFile}</p>
                    </Dropzone>
                <ValidateError errors={this.props.errors} model="thesis" field={this.props.type} />
            </div>
        );
    }
}
export default ThesisUploadWidget;