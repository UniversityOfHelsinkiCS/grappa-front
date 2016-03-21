import React, { Component, PropTypes } from "react";

import Thesis from "../thesis/Thesis.smart";

export class ThesisList extends Component {

  constructor() {
    super();
    this.getTheses = this.getTheses.bind(this);
    this.resetTheses = this.resetTheses.bind(this);
  }

  getTheses(event) {
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
    return (
      <div>
        <h2>Tämä on ThesisList komponentti</h2>
        <div>
          <button onClick={this.getTheses}>getTheses (from mock api)</button>
          <button onClick={this.resetTheses}>resetTheses</button>
        </div>
        <ul>
          { theses.map(itemi =>
            <li>
              <Thesis
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

ThesisList.propTypes = {
  theses: PropTypes.array.isRequired,
};

import { connect } from "react-redux";

import { getTheses, resetTheses } from "../thesis/Thesis.actions";

const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
  resetTheses() {
    dispatch(resetTheses());
  },
});

export default connect(null, mapDispatchToProps)(ThesisList);
