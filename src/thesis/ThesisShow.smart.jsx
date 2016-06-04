/**
 * ThesisShow.smart for displaying and running the view of a single thesis.
 * It contains the component for displaying the needed displayable data, and
 * the container in charge of connecting the component to the reducers and actions
 * in charge of state changes.
 */

import React, { Component } from "react";
import { browserHistory, Link } from "react-router";

import GraderList from "../grader/GraderList.component";

import { updateThesis, deleteThesis } from "./thesis.actions";
import { updateGrader } from "../grader/grader.actions";
import { updateUser } from "../user/user.actions";
import { sendNotification } from "../email/email.actions";
import { updateThesisProgress } from "../thesisprogress/thesisprogress.actions";

export class ThesisShow extends Component {
  constructor() {
    super();

    this.state = {
      thesis: {},
      delete: false,
      graders: [
        {
          name: "pena",
          title: "prof",
        },
        {
          name: "juha",
          title: "sbuge"
        }
      ]
    };
  }

  handleClicking(event) {
    console.log("click!");
  }

  componentWillMount() {
    this.findThesisFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.findThesisFromProps(newProps);
  }

  findThesisFromProps(props) {
    let thesisId;
    try {
      thesisId = parseInt(props.params.id, 10);
    } catch (e) {
      return;
    }
    const foundThesis = props.theses.find(thesis => {
      if (thesis.id === thesisId) {
        return thesis;
      }
    });
    if (typeof foundThesis !== "undefined") {
      this.state.thesis = foundThesis;
    }
  }

  render() {
    return (
      <div>
        <div className="ui form">
          <h2 className="ui dividing header">{this.state.thesis.title}</h2>
          <div className="ui green button">Edit</div>
          <h2 className="ui dividing header">Thesis details</h2>
          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>Title</label>
                <input type="text" name="shipping[first-name]" placeholder="First Name" readOnly="true" value="teesi"/>
              </div>
              <div className="field">
                <label>Grade</label>
                <input type="text" name="shipping[first-name]" placeholder="First Name" readOnly="true" value="teesi"/>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>Ethesis</label>
                <div className="ui right icon input">
                <i className="external icon">
                  <a href="http://www.w3schools.com" target="_blank" className="icon-link"></a>
                </i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    readOnly="true"
                    value="ethesis"
                  />
                </div>
              </div>
              <div className="field">
                <label>Urkund</label>
                <div className="ui right icon input">
                  <i className="external icon">
                    <a href="http://www.w3schools.com" target="_blank" className="icon-link"></a>
                  </i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    readOnly="true"
                    value="urkundi"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>Author</label>
                <input type="text" name="shipping[first-name]" placeholder="First Name" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="text" name="shipping[last-name]" placeholder="Last Name" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>Instructor</label>
                <input type="text" name="shipping[first-name]" placeholder="First Name" />
              </div>
              <div className="field">
                <label>Studyfield</label>
                <input type="text" name="shipping[last-name]" placeholder="Last Name" />
              </div>
            </div>
          </div>
          <h2 className="ui dividing header">Abstract</h2>
          <div className="field">
            <textarea></textarea>
          </div>
          <GraderList graders={this.state.graders} />
          <h2 className="ui dividing header">Grader evaluation</h2>
          <div className="field">
            <textarea></textarea>
          </div>
          <h2 className="ui dividing header">Sent reminders</h2>
          <div className="field">
            <div className="ui right input">
              <h3 className="ui header">Ethesis Reminder</h3>
              <div className="ui checkbox m-left">
                <input type="checkbox" />
                <label></label>
              </div>
            </div>
            <div className="four fields">
              <div className="field">
                <label>Student</label>
                <input type="text" name="shipping[first-name]" placeholder="First Name" />
              </div>
              <div className="field">
                <label>Last sent</label>
                <p>1.1.2016</p>
                {/*<input type="text" name="shipping[last-name]" placeholder="Last Name" />*/}
              </div>
              <div className="field">
                <label>Deadline</label>
                <p>1.4.2016</p>
              </div>
              <div className="field">
                <label>&nbsp;</label>
                <button className="ui blue button">Send reminder</button>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="ui right input">
              <h3 className="ui header">Grader Evaluation Reminder</h3>
              <div className="ui checkbox m-left">
                <input type="checkbox" />
                <label></label>
              </div>
            </div>
            <div className="four fields">
              <div className="field">
                <input type="text" name="shipping[first-name]" placeholder="First Name" />
              </div>
              <div className="field">
                <label>Last sent</label>
                <p>1.1.2016</p>
                {/*<input type="text" name="shipping[last-name]" placeholder="Last Name" />*/}
              </div>
              <div className="field">
                <label>Deadline</label>
                <p>1.4.2016</p>
              </div>
              <div className="field">
                <label>&nbsp;</label>
                <button className="ui blue button">Send reminder</button>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="ui right input">
              <h3 className="ui header">Print Thesis Reminder</h3>
              <div className="ui checkbox m-left">
                <input type="checkbox" />
                <label></label>
              </div>
            </div>
            <div className="four fields">
              <div className="field">
                <label>Print-person</label>
                <input type="text" name="shipping[first-name]" placeholder="First Name" />
              </div>
              <div className="field">
                <label>Last sent</label>
                <p>1.1.2016</p>
                {/*<input type="text" name="shipping[last-name]" placeholder="Last Name" />*/}
              </div>
              <div className="field">
                <label>Deadline</label>
                <p>1.4.2016</p>
              </div>
              <div className="field">
                <label>&nbsp;</label>
                <button className="ui blue button">Send reminder</button>
              </div>
            </div>
          </div>
          <h2 className="ui dividing header">Print</h2>
          <div className="field">
            <button className="ui blue button">Open as PDF</button>
          </div>
        </div>
      </div>
    );
  }
}
import { connect } from "react-redux";

/**
 * A special function used to define what the form of the data is that is gotten from the state.
 * @return (Object) {user, theses} An object containing a list of all the thesis visible to
 * your role and a list of all the users.
 */
const mapStateToProps = (state) => {
  const user = state.get("auth");
  const thesis = state.get("thesis");
  return {
    user: user.get("user").toJS(),
    theses: thesis.get("theses").toJS(),
  };
};

/**
* A special function used to define and dispatch the relevant data to the right
* actions in thesis.actions.
*/
const mapDispatchToProps = (dispatch) => ({
  updateThesis(thesis) {
    dispatch(updateThesis(thesis));
  },
  updateGrader(grader) {
    dispatch(updateGrader(grader));
  },
  updateUser(user) {
    dispatch(updateUser(user));
  },
  sendNotification(object) {
    dispatch(sendNotification(object));
  },
  deleteThesis(thesis) {
    dispatch(deleteThesis(thesis));
  },
  updateThesisProgress(thesis) {
    dispatch(updateThesisProgress(thesis));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisShow);
