import React, { Component, PropTypes } from "react";

import Dropdown from "../ui/Dropdown.component";
import { updateErrors, validateField, validateModel } from "../config/Validator";

export class GraderListCreateUpdate extends Component {
  constructor() {
    super();
    this.state = {
      chosenGraders: [],
      newGrader: {},
      updateGrader: {},
      errors: {},
    };
  }

  handleChange(name, type, event) {
    event.preventDefault();
    if (this.props.editable) {
      if (name === "which" && type === "updateGrader") {
        this.setState({
          updateGrader: Object.assign({}, this.props.Graders[event.target.value]),
        });
      } else {
        const change = {
          errors: updateErrors(event.target.value, name, "grader", this.state.errors),
        };
        change[type] = this.state[type];
        change[type][name] = event.target.value;
        this.setState(change);
      }
    }
  }

  createGrader(event) {
    event.preventDefault();
    if (this.props.editable) {
      const errors = validateModel(this.state.newGrader, "grader");
      console.log("errors");
      console.log(errors);
      if (errors.list.length === 0) {
        this.props.saveGrader(this.state.newGrader);
      }
    }
  }

  updateGrader(event) {
    event.preventDefault();
    if (this.props.editable) {
      const errors = validateModel(this.state.updateGrader, "grader");
      console.log("errors");
      console.log(errors);
      if (errors.list.length === 0) {
        this.props.updateGrader(this.state.updateGrader);
      }
    }
  }

  renderCreate() {
    return (
      <div className="four fields">
        <div className=" field">
          <label>Title</label>
          <select
            className="ui fluid search dropdown"
            value={this.state.newGrader.title}
            onChange={this.handleChange.bind(this, "title", "newGrader")}
          >
            <option value="">Select title</option>
            <option value="Prof">Professor</option>
            <option value="AssProf">Assistant Professor</option>
            <option value="AdjProf">Adjunct Professor</option>
            <option value="Doc">Doctor</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={this.state.newGrader.name}
            placeholder="Name"
            onChange={this.handleChange.bind(this, "name", "newGrader")}
          />
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="ui green button"
            onClick={this.createGrader.bind(this)}
          >
            Create Grader
          </button>
        </div>
      </div>
    );
  }

  renderUpdate() {
    const { Graders } = this.props;
    return (
      <div className="four fields">
        <div className=" field">
          <label>Who</label>
          <select
            className="ui fluid search dropdown"
            onChange={this.handleChange.bind(this, "which", "updateGrader")}
          >
            { Graders.map((item, index) =>
              <option key={ index } value={ index } >
                { `${item.title} ${item.name}` }
              </option>
            )}
          </select>
        </div>
        <div className="field">
          <label>Title</label>
          <select
            className="ui fluid search dropdown"
            value={this.state.updateGrader.title}
            onChange={this.handleChange.bind(this, "title", "updateGrader")}
          >
            <option value="Prof">Professor</option>
            <option value="AssProf">Assistant Professor</option>
            <option value="AdjProf">Adjunct Professor</option>
            <option value="Doc">Doctor</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={this.state.updateGrader.name}
            placeholder="Name"
            onChange={this.handleChange.bind(this, "name", "updateGrader")}
          />
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="ui blue button"
            onClick={this.updateGrader.bind(this)}
          >
            Update Grader
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { Graders } = this.props;
    // console.log(Graders)
    return (
      <div className="field">
        <h3 className="ui dividing header">Graders</h3>
        <div className="field">
          <label>Select Graders</label>
          <Dropdown Graders={ Graders } editable={ this.props.editable }/>
        </div>
        { this.props.editable ?
          <span>
            { this.renderCreate() }
            { this.renderUpdate() }
          </span>
            :
          <span>
          </span>
        }
      </div>
    );
  }
}

import { connect } from "react-redux";

import { saveGrader, updateGrader } from "../grader/grader.actions";

const mapDispatchToProps = (dispatch) => ({
  saveGrader(newGrader) {
    dispatch(saveGrader(newGrader));
  },
  updateGrader(data) {
    dispatch(updateGrader(data));
  },
});

export default connect(null, mapDispatchToProps)(GraderListCreateUpdate);
