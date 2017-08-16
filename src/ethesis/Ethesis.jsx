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
            {this.state.thesisPDF != "" ?
            <div className="field">
              <button className="ui fluid large green button" onClick={this.saveThesis}>
                Save thesis {this.state.regreq ? "and send request" : "" }
              </button>
            </div> :
            ""
            }
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
  const ethesisreducer = state.get("ethesis");
  return {
    linkSent: ethesisreducer.get("linkSent"),
  };
};

export default connect(null, mapDispatchToProps)(Ethesis);
