import Validation from "../thesis/thesisValidation";
import React, { Component } from "react";
import { connect } from "react-redux";

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

  handleSubmit(event) {
    event.preventDefault();
    /*
    const thesis = {
      ethesis: this.state.ethesislink,
    };
    // const { saveThesis this.props;
    // saveThesis(newThesis);
    */
  }

  render() {
    return (
      <Validation.Form className="ethesis form" onSubmit={this.handleSubmit}>
        <h4 className="ui dividing header">Enter eThesis link to your thesis</h4>
        <Validation.Input
          type="text"
          name="ethesisLink"
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
const mapStateToProps = (state) => {
  const link = state.get("ethesislink");
  return {
    theses: theses.get("theseslist").toJS(),
  };
};

  */
/*
* A special function used to define and dispatch the relevant data to thesis.actions
*/
  /*
const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
});
  */
export default connect(null, null)(Ethesis);
