/**
* ThesisCreate.smart for displaying and running the feature for adding thesis,
* which contains the ThesisCreate component for creating the visual side
* of the page and the container containing functions for connecting the component
* to the reducers that handle the actual changes to the state.
*/

import React from "react";
import Dropzone from "react-dropzone";
import moment from "moment";

import GraderContainer from "../grader/GraderListCreateUpdate.container";
import GradersDropdown from "../ui/GradersDropdown.component";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";

export class ThesisCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      newThesis: Validate.createForm("newThesis", "thesis"),
      showModal: false,
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("newThesis", "tc", (newThesis) => {
      this.setState({ newThesis, });
    });
  }

  componentWillUnmount() {
    Validate.unsubscribe("tc");
  }

  /**
  * Handler method to handle changes happening in the different input fields in the render method.
  * @param name The id for where the change has happened. Used to designated which state parameter changes.
  * @param event Used to get a hold of what the input of the user was.
  * @param type Type of validation needed: text, email or link
  */
  handleChange(name, event) {
    Validate.updateForm("newThesis", name, event.target.value);
  }

  /**
   * Handler method to handle what to do when the submit button is clicked.
   * @param event Used to get a hold of what the input of the user was.
   */
  handleClick(type, event) {
    event.preventDefault();
    // if (Validate.isFormValid("newThesis")) {
    //   const form = new FormData();
    //   form.append("file", this.state.newThesis.values.PdfFile);
    //   const newThesis = this.state.newThesis.values;
    //   delete newThesis.PdfFile;
    //   form.append("json", JSON.stringify(newThesis));
    //   this.props.saveThesisWithReview(form);
    // }
    if (type === "submit" && Validate.isFormValid("newThesis")) {
      this.setState({
        showModal: true,
      })
    } else if (type === "closeModal" && Validate.isFormValid("newThesis")) {
      this.setState({
        showModal: false,
      })
      const form = new FormData();
      form.append("file", this.state.newThesis.values.PdfFile);
      const newThesis = this.state.newThesis.values;
      newThesis.PdfFile = undefined;
      form.append("json", JSON.stringify(newThesis));
      this.props.saveThesisWithReview(form);
    }
  }

  renderModal() {
    return (
      <div id="grappaModal" className={this.state.showModal ? "grappa-modal show" : "grappa-modal"}>
        <div className="grappa-modal-content">
          <div className="image content m-bot">
            <div className="description">
              <p>
                Have you remembered to add the thesis into the thesis-management system?
                If not please do so right away.
              </p>
              <a target="_blank" href="https://ilmo.cs.helsinki.fi/gradu/servlet/hae">Ilmo (opens in a new window)</a>
            </div>
          </div>
          <div className="actions">
            <div className="one fluid ui buttons">
              <div className="ui positive button"
                onClick={this.handleClick.bind(this, "closeModal")}
              >
                Okay
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderThesisAuthor() {
    return (
      <div className="m-bot">
        <p>
          Thesis has to have a minimun of two graders and if
          one of them isn't at least a professor and the other a doctor an evaluation of
          the graders will be done by the thesis' studyfield's professor.
        </p>
        <h3 className="ui dividing header">Thesis Author</h3>
        <div className="three fields">
          <div className="field">
            <label>First name</label>
            <input
              type="text"
              value={this.state.newThesis.values.authorFirstname}
              onChange={this.handleChange.bind(this, "authorFirstname")}
              placeholder="First Name"
            />
            <ValidateError errors={this.state.newThesis.errors} model="thesis" field="authorFirstname" />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              value={this.state.newThesis.values.authorLastname}
              onChange={this.handleChange.bind(this, "authorLastname")}
              placeholder="Last Name"
            />
            <ValidateError errors={this.state.newThesis.errors} model="thesis" field="authorLastname" />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={this.state.newThesis.values.authorEmail}
              onChange={this.handleChange.bind(this, "authorEmail")}
              placeholder="Email Address"
            />
            <ValidateError errors={this.state.newThesis.errors} model="thesis" field="authorEmail" />
          </div>
        </div>
      </div>
    );
  }

  renderThesisInformation() {
    // console.log(this.props.StudyFields);
    const { StudyFields } = this.props;
    const activeFields = StudyFields.filter(field => {
      if (field.isActive) return field;
    });
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Thesis Information</h3>
        <div className="three fields">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={this.state.newThesis.values.title}
              onChange={this.handleChange.bind(this, "title")}
              placeholder="Title"
            />
            <ValidateError errors={this.state.newThesis.errors} model="thesis" field="title" />
          </div>
          <div className="field">
            <label>Studyfield</label>
            <select
              className="ui fluid search dropdown"
              onChange={this.handleChange.bind(this, "StudyFieldId")}
            >
              <option key="0" value="">Select field</option>
              { activeFields.map((field, index) =>
                <option key={index} value={field.id}>
                  { field.name }
                </option>
              )}
            </select>
            <ValidateError errors={this.state.newThesis.errors} model="thesis" field="StudyFieldId" />
          </div>
          <div className="field">
            <label>Grade</label>
            <select
              className="ui fluid search dropdown"
              value={this.state.newThesis.values.grade}
              onChange={this.handleChange.bind(this, "grade")}
            >
              <option value="">Select grade</option>
              <option value="Approbatur">Approbatur</option>
              <option value="Lubenter Approbatur">Lubenter Approbatur</option>
              <option value="Non Sine Laude Approbatur">Non Sine Laude Approbatur</option>
              <option value="Cum Laude Approbatur">Cum Laude Approbatur</option>
              <option value="Magna Cum Laude Approbatur">Magna Cum Laude Approbatur</option>
              <option value="Eximia Cum Laude Approbatur">Eximia Cum Laude Approbatur</option>
              <option value="Laudatur">Laudatur</option>
            </select>
            <ValidateError errors={this.state.newThesis.errors} model="thesis" field="grade" />
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label>Urkund-link</label>
            <input
              type="text"
              value={this.state.newThesis.values.urkund}
              onChange={this.handleChange.bind(this, "urkund")}
              placeholder="Link to Urkund"
            />
            <ValidateError errors={this.state.newThesis.errors} model="thesis" field="urkund" />
          </div>
        </div>
      </div>
    );
  }

  onDrop(files) {
    // console.log('Received files: ', files);
    Validate.updateForm("newThesis", "PdfFile", files[0]);
  }

  renderUploadReview() {
    // console.log(this.state.newThesis.values.PdfFile);
    return (
      <div>
        <h3 className="ui dividing header">Upload Thesis review as PDF (max. 1 MB)</h3>
        <div className="m-bot">
          <Dropzone className="field upload-box" onDrop={this.onDrop.bind(this)} multiple={false}>
            <p className="upload-p">Click to navigate to the file or drop them from your file system.</p>
            <p className="upload-p">Current file: {this.state.newThesis.values.PdfFile.name}</p>
          </Dropzone>
        </div>
        <ValidateError errors={this.state.newThesis.errors} model="thesis" field="PdfFile" />
      </div>
    );
  }

  renderGraders() {
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Graders</h3>
        <div className="field">
          <label>Select Graders</label>
          <GradersDropdown formname="newThesis" graders={this.props.Graders}
            selected={this.state.newThesis.values.Graders} editable/>
        </div>
        <ValidateError errors={this.state.newThesis.errors} model="thesis" field="Graders" />
      </div>
    );
  }

  formatMeetingsForReactTable(meetings) {
    return meetings.map(meeting => {
      return {
        date: moment(new Date(meeting.date)).format("DD/MM/YYYY"),
      };
    });
  }

  filterOldDates(meetings) {
    const today = new Date();
    return meetings.filter(meeting => {
      const mdate = new Date(meeting.date);
      if (mdate >= today || mdate.toDateString() === today.toDateString()) {
        return meeting;
      }
    });
  }

  renderPickCouncilmeeting() {
    // console.log(this.props.CouncilMeetings);
    const today = new Date();
    const filtered = this.props.CouncilMeetings.filter(meeting => {
      const mdate = new Date(meeting.date);
      if (mdate >= today || mdate.toDateString() === today.toDateString()) {
        return meeting;
      }
    });
    const formatted = filtered.map(meeting => {
      return {
        id: meeting.id,
        content: `${moment(new Date(meeting.date)).format("DD/MM/YYYY")} Deadline: ${moment(new Date(meeting.instructorDeadline)).format("HH:mm DD/MM/YYYY")}`,
      };
    });
    const CouncilMeetings = [{ id: "", content: "Select Date" }, ...formatted];
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Choose the Councilmeeting date</h3>
        <p>
          Deadline tells when Grappa stops accepting new theses for that date. If the deadline has passed
          you have to either contact admin or submit thesis to another Councilmeeting.
        </p>
        <select className="ui fluid search dropdown"
          onChange={this.handleChange.bind(this, "CouncilMeetingId")}
        >
          { CouncilMeetings.map((meeting, index) =>
            <option key={ index } value={ meeting.id } >
              { meeting.content }
            </option>
          )}
        </select>
        <ValidateError errors={this.state.newThesis.errors} model="thesis" field="CouncilMeetingId" />
      </div>
    );
  }

/**
* The method in charge of rendering the outlook of the page. Contains all the html elements.
* @return <div> thesis-container Container wrapping all the html elements to be rendered.
*/
  render() {
    return (
      <div>
        { this.renderModal() }
        <div className="ui form">
          <h2 className="ui dividing header">Create a thesis</h2>
          {this.renderThesisAuthor()}
          {this.renderThesisInformation()}
          {this.renderUploadReview()}
          {this.renderGraders()}
          <GraderContainer editable/>
          {this.renderPickCouncilmeeting()}
        </div>
        <button className="ui primary button" onClick={this.handleClick.bind(this, "submit")}>
          Submit
        </button>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { saveThesis, saveThesisWithReview } from "./thesis.actions";
import { getCouncilmeetings } from "../councilmeeting/councilmeeting.actions";
import { getStudyfields } from "../studyfield/studyfield.actions";

const mapDispatchToProps = (dispatch) => ({
  saveThesis(newThesis, pdfFile) {
    dispatch(saveThesis(newThesis));
    dispatch(uploadReview(pdfFile));
  },
  saveThesisWithReview(data) {
    dispatch(saveThesisWithReview(data));
  },
  getCouncilmeetings() {
    dispatch(getCouncilmeetings());
  },
  getStudyfields() {
    dispatch(getStudyfields());
  },
});

const mapStateToProps = (state) => {
  const cmreducer = state.get("councilmeeting");
  const sfreducer = state.get("studyfield");
  const grader_r = state.get("grader");
  return {
    CouncilMeetings: cmreducer.get("councilmeetings").toJS(),
    StudyFields: sfreducer.get("studyfields").toJS(),
    Graders: grader_r.get("graders").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThesisCreate);
