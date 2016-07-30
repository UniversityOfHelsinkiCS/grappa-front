/**
* ThesisList.smart for displaying the data relating to all the thesis added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import moment from "moment";
import ThesisListComp from "../thesis/ThesisList.component";

export class ThesisList extends Component {
  constructor() {
    super();
    this.state = {
      filteredTheses: [],
      selectedTheses: [],
      searchedTheses: [],
    };
  }

  componentWillMount() {
    this.props.getTheses();
    this.setState({
      filteredTheses: this.props.theses,
      selectedTheses: [],
      searchedTheses: [],
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.theses !== newProps.theses) {
      this.setState({
        filteredTheses: newProps.theses,
        selectedTheses: [],
        searchedTheses: [],
      });
    }
  }

  handleClick(name, event) {
    event.preventDefault();
    if (name === "download") {
      const IDs = this.state.filteredTheses.reduce((previousValue, currentValue, index) => {
        if (this.state.selectedTheses[index] && this.state.searchedTheses[index]) {
          return [...previousValue, currentValue.id];
        }
        return previousValue;
      }, []);
      this.props.downloadTheses(IDs);
    }
  }

  render() {
    return (
      <div>
        <div className="m-bot">
          <h2 className="ui dividing header">Theses</h2>
          <p>
            Past and current theses which you are allowed to view.
          </p>
          <button className="ui button blue" onClick={this.handleClick.bind(this, "download")}>Download selected</button>
        </div>
        <ThesisListComp
          theses={this.state.filteredTheses}
          selected={this.state.selectedTheses}
          searched={this.state.searchedTheses}
        />
      </div>
    );
  }
}

import { connect } from "react-redux";
import { getTheses, downloadTheses } from "../thesis/thesis.actions";

const mapStateToProps = (state) => {
  const auth = state.get("auth");
  const thesis = state.get("thesis");
  return {
    theses: thesis.get("theses").toJS(),
    user: auth.get("user").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
  downloadTheses(theses) {
    dispatch(downloadTheses(theses));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
