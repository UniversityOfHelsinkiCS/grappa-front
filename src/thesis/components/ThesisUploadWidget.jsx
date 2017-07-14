import React, { Component } from "react";

import Dropzone from "react-dropzone";
import ValidateError from "../../ui/Error";

export class ThesisUploadWidget extends Component {

    onDrop = (files) => {
        this.props.sendChange("PdfFile", files[0]);
    }

    render() {
        return (
            <div>
                <h3 className="ui dividing header">Upload Thesis review as PDF (max. 1 MB)</h3>
                <div className="m-bot">
                    <Dropzone className="field upload-box" onDrop={this.onDrop} multiple={false}>
                        <p className="upload-p">Click to navigate to the file or drop them from your file system.</p>
                        <p className="upload-p">Current file: {this.props.currentFile}</p>
                    </Dropzone>
                </div>
                <ValidateError errors={this.props.errors} model="thesis" field="PdfFile" />
            </div>
        );
    }
}
export default ThesisUploadWidget;