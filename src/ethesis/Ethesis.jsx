import React, { Component } from "react";
import Dropzone from "react-dropzone";
import FlashMessage from "../flash/FlashMessage";

/**
 * TODO: Rename, 
 * this renders the website where students add their thesis to Grappa and has nothing to do
 * with Ethesis (yet)
 */

export class Ethesis extends Component {
  constructor() {
    super();
    this.state = {
      thesisPDF: "",
      regreq: false,
    };
  }

  saveThesis = () => {
    const form = new FormData();
    form.append("file", this.state.thesisPDF);
    form.append("regreq", this.state.regreq);
    this.props.uploadThesisPDF(this.props.params.token, form);
  }

  toggleRegReq = () => {
    this.setState({ regreq: !this.state.regreq });
  }

  onDrop(files) {
    this.setState({ thesisPDF: files[0] })
  }

  renderUploadThesis() {
    return (
      <div className="ui field">
        <div className="m-bot">
          <Dropzone className="field upload-box" onDrop={this.onDrop.bind(this)} multiple={false}>
            <p className="upload-p">Click to navigate to the file or drop them from your file system.</p>
            <p className="upload-p">Current file: {this.state.thesisPDF.name}</p>
          </Dropzone>
        </div>
      </div>
    );
  }

  renderButton() {
    switch (this.props.status) {
      case "":
        return (
          <div className="field">
            <button disabled={this.props.loading} className="ui fluid large green button" onClick={this.saveThesis}>
              Save thesis {this.state.regreq ? "and send request" : ""}
            </button>
          </div>
        )
      case "failure":
        return (
          <div className="field">
            <button disabled={this.props.loading} className="ui fluid large green button" onClick={this.saveThesis}>
              Try again to save thesis {this.state.regreq ? "and send request" : ""}
            </button>
          </div>
        )
      case "success":
        return (
          <div className="field">
            <button disabled="true" className="ui fluid large red button" onClick={this.saveThesis}>
              Thesis has been successfully sent.
          </button>
          </div>
        )
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="ui container m-top">
          <div className="ui form">
            <h2 className="ui dividing header">Save your Thesis as PDF (max. 40 MB)</h2>
            <p>
              Please make sure your abstract is on the 2nd page of the thesis.
            </p>
            {this.renderUploadThesis()}
            <p>
              Do you want to send a study module registration request to head of studies?
            </p>
            <div className="ui checkbox">
              <input
                type="checkbox"
                checked={this.state.regreq ? "true" : ""}
                onChange={this.toggleRegReq}
              />
              <label>Send registration request.</label>
            </div>
            <p>{'  '}</p>
            {this.state.thesisPDF != "" ? this.renderButton() : ""}
          </div>
        </div>
        <FlashMessage />
      </div>
    );
  }
}

import { connect } from "react-redux";
import { uploadThesisPDF } from "../ethesis/ethesis.actions";

const mapDispatchToProps = (dispatch) => ({
  uploadThesisPDF(token, formdata) {
    dispatch(uploadThesisPDF(token, formdata));
  }
});

const mapStateToProps = (state) => {
  const ethesis = state.get("ethesis");
  return {
    status: ethesis.get("status"),
    loading: ethesis.get("loading"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ethesis);
