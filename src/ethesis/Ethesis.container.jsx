import Validation from "../thesis/thesisValidation";
import React, { Component } from "react";

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

  handleClick(event) {
    event.preventDefault();
    const data = {
      token: this.props.params.token,
      thesis: {
        ethesis: this.state.ethesislink,
      },
    };
    this.props.updateThesisesEthesis(data);
  }

  render() {
    const link = this.props.linkSent;
    if (link === "success") {
      return (
        <div className="ui container m-top">
          <h2 className="ui dividing header">Success</h2>
          <p>Link was successfully saved. You may now leave this page.</p>
        </div>
      );
    } else if (link === "failure") {
      return (
        <div className="ui container m-top">
          <h2 className="ui dividing header">Error</h2>
          <p>There was an error saving your link. Please refresh the page and try again. If everything else fails please contact Kjell Lemström.</p>
        </div>
      );
    }
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
}

import { connect } from "react-redux";
import { updateThesisesEthesis } from "../ethesis/ethesis.actions";

const mapDispatchToProps = (dispatch) => ({
  updateThesisesEthesis(data) {
    dispatch(updateThesisesEthesis(data));
  },
});

const mapStateToProps = (state) => {
  const ethesisreducer = state.get("ethesis");
  return {
    linkSent: ethesisreducer.get("linkSent"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ethesis);
