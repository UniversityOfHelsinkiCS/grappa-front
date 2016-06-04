import React, { Component, PropTypes } from "react";

import { validateField, validateModel } from "../config/Validator";

export default class GraderList extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  handleGraderChange(index, name, event) {
    event.preventDefault();
    const change = {
      errors: this.state.errors,
    };
    // console.log(this.state.errors);
    this.props.graders[index][name] = event.target.value;
    const newErrors = validateField(name, event.target.value, "grader");
    // console.log(newErrors);
    change.errors[`grader_${name}`] = newErrors;
    this.setState(change);
  }

  addGrader(event) {
    event.preventDefault();
    this.props.graders.push({
      name: "",
      title: "",
    });
    const change = {
      errors: this.state.errors,
    };
    const newErrors = validateField("graders", this.props.graders, "thesis");
    // console.log(newErrors);
    change.errors.thesis_graders = newErrors;
    this.setState(change);
  }

  removeGrader(index, event) {
    event.preventDefault();
    this.props.graders.splice(index, 1);
    const change = {
      errors: this.state.errors,
    };
    const newErrors = validateField("graders", this.props.graders, "thesis");
    // console.log(newErrors);
    change.errors.thesis_graders = newErrors;
    this.setState(change);
  }

  render() {
    return (
      <div>
        <h2 className="ui dividing header">Graders</h2>
        {
          this.props.graders.map((grader, index) =>
            <div key={index} className="three fields">
              <div className="field">
                <label>Name</label>
                <input
                  type="text" name="grader_name" value={grader.name} placeholder="Name"
                  onChange={this.handleGraderChange.bind(this, index, "name")}
                />
              </div>
              <div className=" field">
                <label>Title</label>
                <select className="ui fluid search dropdown" value={grader.title}
                  onChange={this.handleGraderChange.bind(this, index, "title")}
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
                <label>&nbsp;</label>
                <button className="ui red button"
                  onClick={this.removeGrader.bind(this, index)}
                >
                  Remove Grader
                </button>
              </div>
            </div>
          )
        }
        <button className="ui primary button" onClick={this.addGrader.bind(this)}>Add Grader</button>
      </div>
    );
  }
}

// GraderList.propTypes = {
//   graders: PropTypes.array,
// };
