import Validation from "../thesis/thesisValidation";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateThesisWithEthesis } from "../thesis/thesis.actions";

export class Ethesis extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  /* Creates data object to pass to updateThesisWithEthesis action */

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      token: this.state.token,
      thesis: {
        ethesis: this.state.ethesislink,
      },
    };
    const { updateThesisWithEthesis } = this.props;
    updateThesisWithEthesis(data);
  }

  /* Grabs url parameter and saves it to state, then renders form */

  render() {
    this.state.token = this.props.params.token;
    const link = this.props.linkSent;
    if (link === "success") {
      return (
        <h4>Link successfully saved. You may now safely close the browser window.</h4>
      );
    } else if (link === "failed") {
      return (
        <h4>There was an error saving your link. Please refresh the page and try again.</h4>
      );
    }
    return (
      <Validation.Form className="ethesis form" onSubmit={this.handleSubmit}>
        <h4 className="ui dividing header">Enter eThesis link to your thesis</h4>
        <Validation.Input
          ref="ethesislink"
          type="text"
          name="ethesislink"
          className="ethesis field"
          value={this.state.ethesislink}
          onChange={this.handleChange.bind(this, "ethesislink")}
          placeholder="Link to eThesis"
          validations={[{ rule: "isLink" },
                        { rule: "isRequired" }]}
        />
        <Validation.Button className="ui primary button" value="Submit" onClick={this.handleSubmit}/>
      </Validation.Form>
    );
  }
}

/*
* An ordinary function used to define and dispatch the relevant data to thesis.actions
*/
const mapDispatchToProps = (dispatch) => ({
  updateThesisWithEthesis(data) {
    dispatch(updateThesisWithEthesis(data));
  },
});

const mapStateToProps = (state) => {
  const ethesis = state.get("thesis");
  return {
    linkSent: ethesis.get("linkSent"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ethesis);
