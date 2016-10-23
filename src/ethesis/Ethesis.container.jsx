import React, { Component } from "react";
import Dropzone from "react-dropzone";
import FlashMessage from "../flash/FlashMessage.container";

export class Ethesis extends Component {
  constructor() {
    super();
    this.state = {
      thesisPDF: "",
    };
  }

  handleClick(type, event) {
    event.preventDefault();
    const form = new FormData();
    form.append("file", this.state.thesisPDF);
    this.props.uploadThesisPDF(this.props.params.token, form);
  }

  onDrop(files) {
    this.setState({
      thesisPDF: files[0]
    })
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

  // renderInput() {
  //   return (
  //     <div className="ui container m-top">
  //       <div className="ui form">
  //         <div className="ui field">
  //           <div className="ui left icon input">
  //             <i className="external icon"></i>
  //             <input
  //               type="text"
  //               name="ethesislink"
  //               placeholder="eThesis link to the PDF file"
  //               onChange={this.handleChange.bind(this, "ethesislink")}
  //             />
  //           </div>
  //         </div>
  //         <div className="field">
  //           <button className="ui fluid large green button" onClick={this.handleClick.bind(this, "save")}>
  //             Save
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // renderMessage() {
  //   const link = this.props.linkSent;
  //   return (
  //     <div className="ui container m-top">
  //       <h2 className="ui dividing header">{ link === "success" ? "Success" : "Error"}</h2>
  //       <p>
  //         { link === "success" ?
  //           "Link was successfully saved. You may now leave this page."
  //            :
  //           "There was an error saving your link. Please refresh the page and try again. If everything else fails " +
  //           "please contact admin."
  //         }
  //       </p>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="main-container">
        <div className="ui container m-top">
          <div className="ui form">
            <h2 className="ui dividing header">Save your Thesis as PDF (max. 40 MB)</h2>
            <p>
              Please make sure your abstract is on the 2nd page of the thesis.
            </p>
            { this.renderUploadThesis() }
            <div className="field">
              <button className="ui fluid large green button" onClick={this.handleClick.bind(this, "save")}>
                Save
              </button>
            </div>
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
