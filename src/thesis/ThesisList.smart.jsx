import React, { Component } from "react";

import ThesisListItem from "./ThesisListItem.smart";

export class ThesisList extends Component {

  constructor() {
    super();
    this.getThesesAPI = this.getThesesAPI.bind(this);
    this.resetTheses = this.resetTheses.bind(this);
  }

  getThesesAPI(event) {
    event.preventDefault();
    const { getTheses } = this.props;
    getTheses();
  }

  resetTheses(event) {
    event.preventDefault();
    const { resetTheses } = this.props;
    resetTheses();
  }

  render() {
    const { theses } = this.props;
    const theseslist = theses.toJS();
    return (
      <div className="thesis-container">
        <h2>Tämä on ThesisList komponentti</h2>
        <div>
          <button onClick={this.getThesesAPI}>getTheses from api</button>
          <button onClick={this.resetTheses}>resetTheses</button>
        </div>
        <ul>
          { theseslist.map(itemi =>
            <li>
              <ThesisListItem
                id = { itemi.id }
                author = { itemi.author }
                email = { itemi.email }
                title = { itemi.title }
                urkund = { itemi.urkund }
                ethesis = { itemi.ethesis }
                abstract = { itemi.abstract }
                grade = { itemi.grade }
              />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { getTheses, resetTheses } from "../thesis/thesis.actions";

const mapStateToProps = (state) => {
  const theses = state.get("theses");
  return {
    theses: theses.get("theseslist"),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
  resetTheses() {
    dispatch(resetTheses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
