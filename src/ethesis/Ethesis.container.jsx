import React, { Component } from "react";
import FlashMessage from "../flash/FlashMessage.container";

export class Ethesis extends Component {
  constructor() {
    super();
    this.state = {
      ethesislink: "",
    };
  }

  handleChange(name, event) {
    event.preventDefault();
    const change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  handleClick(type, event) {
    event.preventDefault();
    this.props.updateThesisesEthesis(this.props.params.token, this.state.ethesislink);
  }

  renderInput() {
    return (
      <div className="ui container m-top">
        <div className="ui form">
          <div className="ui field">
            <div className="ui left icon input">
              <i className="external icon"></i>
              <input
                type="text"
                name="ethesislink"
                placeholder="eThesis link to the PDF file"
                onChange={this.handleChange.bind(this, "ethesislink")}
              />
            </div>
          </div>
          <div className="field">
            <button className="ui fluid large green button" onClick={this.handleClick.bind(this, "save")}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  renderMessage() {
    const link = this.props.linkSent;
    return (
      <div className="ui container m-top">
        <h2 className="ui dividing header">{ link === "success" ? "Success" : "Error"}</h2>
        <p>
          { link === "success" ?
            "Link was successfully saved. You may now leave this page."
             :
            "There was an error saving your link. Please refresh the page and try again. If everything else fails " +
            "please contact admin."
          }
        </p>
      </div>
    );
  }

  render() {
    const link = this.props.linkSent;
    return (
      <div className="main-container">
        { link ?
          this.renderMessage()
            :
          this.renderInput()
        }
        <FlashMessage />
      </div>
    );
  }
}

import { connect } from "react-redux";
import { updateThesisesEthesis } from "../ethesis/ethesis.actions";

const mapDispatchToProps = (dispatch) => ({
  updateThesisesEthesis(token, link) {
    dispatch(updateThesisesEthesis(token, link));
  },
});

const mapStateToProps = (state) => {
  const ethesisreducer = state.get("ethesis");
  return {
    linkSent: ethesisreducer.get("linkSent"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ethesis);
