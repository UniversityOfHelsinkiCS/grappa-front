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
import Errors from "../ui/Errors.component";
// import Validation from "./thesisValidation";
import Validate from "../validate/Validate";
import ValidInput from "../config/ValidInput.component";
import { validateField, validateModel, updateErrors } from "../config/Validator";

export class ThesisCreate extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      authorFirstname: "",
      authorLastname: "",
      authorEmail: "",
      title: "",
      Graders: [],
      urkund: "",
      grade: "",
      StudyFieldId: "",
      CouncilMeetingId: "",
      PdfFile: "",
      errors: {},
    };
  }

  /**
  * Handler method to handle changes happening in the different input fields in the render method.
  * @param name The id for where the change has happened. Used to designated which state parameter changes.
  * @param event Used to get a hold of what the input of the user was.
  * @param type Type of validation needed: text, email or link
  */
  handleChange(name, event) {
    console.log(name);
    event.preventDefault();
    const change = {
      errors: this.state.errors,
    };
    change[name] = event.target.value;
    const newErrors = validateField(name, event.target.value, "thesis");
    change.errors[`thesis_${name}`] = newErrors;
    this.setState(change);
  }

  /**
   * Handler method to handle what to do when the submit button is clicked.
   * @param event Used to get a hold of what the input of the user was.
   */
  handleSubmit(event) {
    event.preventDefault();
    const thesisErrors = validateModel(this.state, "thesis");
    // const graderErrors = validateModel(this.state.graders, "grader");
    // console.log(thesisErrors);
    if (thesisErrors.list.length === 0) {
      const newThesis = {
        authorFirstname: this.state.authorFirstname,
        authorLastname: this.state.authorLastname,
        authorEmail: this.state.authorEmail,
        title: this.state.title,
        Graders: this.state.Graders,
        urkund: this.state.urkund,
        grade: this.state.grade,
        StudyFieldId: this.state.StudyFieldId,
        CouncilMeetingId: this.state.CouncilMeetingId,
      };
      const form = new FormData();
      form.append("json", JSON.stringify(newThesis));
      form.append("file", this.state.PdfFile);
      this.props.saveThesisWithReview(form);
    } else {
      this.setState({ errors: thesisErrors.obj });
    }
  }
// <ValidInput
//               name="thesis_authorFirstname"
//               type="text"
//               value={this.state.authorFirstname}
//               onChange={this.handleChange.bind(this, "authorFirstname")}
//               placeholder="First Name"
//               errors={this.state.errors}
//             />
  renderThesisAuthor() {
    return (
      <div className="m-bot">
        <p>
          Please fill in all the fields. Thesis has to have a minimun of two graders and if
          one of them isn't at least a professor and the other a doctor an evaluation of
          the graders will be done by the thesis' studyfield's professor.
        </p>
        <h3 className="ui dividing header">Thesis Author</h3>
        <div className="three fields">
          <div className="field">
            <label>First name</label>
            <input
              type="text"
              value={this.state.authorFirstname}
              onChange={this.handleChange.bind(this, "authorFirstname")}
              placeholder="First Name"
            />

          </div>
          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              value={this.state.authorLastname}
              onChange={this.handleChange.bind(this, "authorLastname")}
              placeholder="Last Name"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={this.state.authorEmail}
              onChange={this.handleChange.bind(this, "authorEmail")}
              placeholder="Email Address"
            />
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
    })
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Thesis Information</h3>
        <div className="three fields">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleChange.bind(this, "title")}
              placeholder="Title"
            />
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
          </div>
          <div className="field">
            <label>Grade</label>
            <select
              className="ui fluid search dropdown"
              value={this.state.grade}
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
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label>Urkund-link</label>
            <input
              type="text"
              value={this.state.urkund}
              onChange={this.handleChange.bind(this, "urkund")}
              placeholder="Link to Urkund"
            />
          </div>
        </div>
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
        date: moment(new Date(meeting.date)).format("DD/MM/YYYY"),
      };
    });
    const CouncilMeetings = [{ id: "", date: "Select Date" }, ...formatted];
    return (
      <div className="m-bot">
        <h3 className="ui dividing header">Choose the Councilmeeting date</h3>
        <select className="ui fluid search dropdown"
          onChange={this.handleChange.bind(this, "CouncilMeetingId")}
        >
          { CouncilMeetings.map((meeting, index) =>
            <option key={ index } value={ meeting.id } >
              { meeting.date }
            </option>
          )}
        </select>
      </div>
    );
  }

  onDrop(files) {
    // console.log('Received files: ', files);
    this.setState({
      PdfFile: files[0],
    });
  }

  renderUploadReview() {
    console.log(this.state.PdfFile);
    return (
      <div>
        <h3 className="ui dividing header">Upload Thesis review as PDF (max. 1 MB)</h3>
        <div className="m-bot">
          <Dropzone className="field upload-box" onDrop={this.onDrop.bind(this)} multiple={false}>
            <p className="upload-p">Click to navigate to the file or drop them from your file system.</p>
            <p className="upload-p">Current file: {this.state.PdfFile.name}</p>
          </Dropzone>
        </div>
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
        <div className="ui form">
          <h2 className="ui dividing header">Create a thesis</h2>
          {this.renderThesisAuthor()}
          {this.renderThesisInformation()}
          {this.renderUploadReview()}
          <GraderContainer activated={this.state.Graders} editable/>
          {this.renderPickCouncilmeeting()}
        </div>
        <Errors errors={this.state.errors}/>
        <button className="ui primary button" onClick={this.handleSubmit}>
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
import { uploadReview } from "../upload/upload.actions";

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
  return {
    CouncilMeetings: cmreducer.get("councilmeetings").toJS(),
    StudyFields: sfreducer.get("studyfields").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThesisCreate);
