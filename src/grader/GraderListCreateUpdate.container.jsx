import React, { Component, PropTypes } from "react";

import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";

export class GraderListCreateUpdate extends Component {
  constructor() {
    super();
    this.state = {
      newGrader: Validate.createForm("newGrader", "grader"),
      updateGrader: Validate.createForm("updateGrader", "graderEdit"),
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("newGrader", "g", (newGrader) => { this.setState({ newGrader, });});
    Validate.subscribeToForm("updateGrader", "g", (updateGrader) => { this.setState({ updateGrader, });});
  }

  componentWillUnmount() {
    Validate.unsubscribe("g");
  }

  handleChange(field, formname, event) {
    event.preventDefault();
    if (this.props.editable) {
      if (field === "select" && formname === "updateGrader") {
        // console.log(event.target.value)
        // console.log(this.props.Graders[event.target.value]);
        Validate.replaceForm("updateGrader", this.props.Graders[event.target.value]);
      } else {
        Validate.updateForm(formname, field, event.target.value);
      }
    }
  }

  handleClick(type, event) {
    event.preventDefault();
    if (this.props.editable) {
      if (type === "create" && Validate.isFormValid("newGrader")) {
        this.props.saveGrader(this.state.newGrader.values);
      } else if (type === "update" && Validate.isFormValid("updateGrader")) {
        this.props.updateGrader(this.state.updateGrader.values);
      } else if (type === "delete" && Validate.isFormValid("updateGrader")) {
        this.props.deleteGrader(this.state.updateGrader.values);
      }
    }
  }

  renderCreate() {
    return (
      <div className="four fields">
        <div className="field">
          <label>Title</label>
          <select
            className="ui fluid search dropdown"
            value={this.state.newGrader.values.title}
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
            value={this.state.newGrader.values.name}
            placeholder="Name"
            onChange={this.handleChange.bind(this, "name", "newGrader")}
          />
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="ui green button"
            onClick={this.handleClick.bind(this, "create")}
          >
            Create Grader
          </button>
        </div>
      </div>
    );
  }

  renderUpdate() {
    const { Graders } = this.props || [];
    // console.log("my graders: ")
    // console.log(Graders)
    return (
      <div className="five fields">
        <div className=" field">
          <label>Who</label>
          <select
            className="ui fluid search dropdown"
            onChange={this.handleChange.bind(this, "select", "updateGrader")}
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
            value={this.state.updateGrader.values.title}
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
            value={this.state.updateGrader.values.name}
            placeholder="Name"
            onChange={this.handleChange.bind(this, "name", "updateGrader")}
          />
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="ui blue button"
            onClick={this.handleClick.bind(this, "update")}
          >
            Update Grader
          </button>
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="ui red button"
            onClick={this.handleClick.bind(this, "delete")}
          >
            Delete Grader
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="field">
        { this.props.editable ?
          <span>
            <h3 className="ui dividing header">Create or update Graders</h3>
            <p>
              You can create new graders or edit the current ones. If grader
              hasn't been linked to any thesis it can deleted, otherwise those
              associations have to be removed from the theses first.
            </p>
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

import { saveGrader, updateGrader, deleteGrader } from "../grader/grader.actions";

const mapDispatchToProps = (dispatch) => ({
  saveGrader(newGrader) {
    dispatch(saveGrader(newGrader));
  },
  updateGrader(data) {
    dispatch(updateGrader(data));
  },
  deleteGrader(data) {
    dispatch(deleteGrader(data));
  },
});

const mapStateToProps = (state) => {
  const grader_r = state.get("grader");
  return {
    Graders: grader_r.get("graders").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraderListCreateUpdate);
