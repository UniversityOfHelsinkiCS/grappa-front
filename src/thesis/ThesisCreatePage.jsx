/**
* ThesisCreatePage.smart for displaying and running the feature for adding thesis,
* which contains the ThesisCreatePage component for creating the visual side
* of the page and the container containing functions for connecting the component
* to the reducers that handle the actual changes to the state.
*/

import React, { Component } from "react";

import Validate from "../validate/Validate";

import ThesisConfirmModal from "./components/ThesisConfirmModal";

import ThesisInformation from "./components/ThesisInformation";
import ThesisUploadWidget from "./components/ThesisUploadWidget";
import ThesisGraders from "./components/ThesisGraders";
import GraderListCreateUpdate from "../grader/GraderListCreateUpdate";
import ThesisCouncilMeetingPicker from "./components/ThesisCouncilMeetingPicker";

export class ThesisCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newThesis: Validate.createForm("newThesis", "thesis"),
      showModal: false,
    }
  }

  componentDidMount() {
    Validate.subscribeToForm("newThesis", "tc", (newThesis) => {
      this.setState({ newThesis, });
    });
  }

  componentWillUnmount() {
    Validate.unsubscribe("tc");
  }

  handleAddThesis = () => {
    const form = new FormData();
    form.append("file", this.state.newThesis.values.PdfFile);
    const newThesis = this.state.newThesis.values;
    //The pdf is appended to the form as a file, so we don't want it with the valuegroup
    newThesis.PdfFile = undefined;
    form.append("json", JSON.stringify(newThesis));
    //The rendering would break if uploadwidget gets "undefined".name
    //TODO: Consider redirecting to thesis list or thesis edit page
    newThesis.PdfFile = "";

    this.props.saveThesisWithReview(form);

    this.toggleModal();
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  handleChange = (fieldName, fieldValue) => {
    Validate.updateForm("newThesis", fieldName, fieldValue);
  }

  /**
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * @return <div> thesis-container Container wrapping all the html elements to be rendered.
  */
  render() {
    const isAdmin = this.props.user.role === "admin";
    const isProfessor = this.props.user.role.includes("rof");
    return (
      <div>
        <ThesisConfirmModal sendAddThesis={this.handleAddThesis} closeModal={this.toggleModal} showModal={this.state.showModal} />
        <div className="ui form">
          <h2 className="ui dividing header">Create a thesis</h2>
          <ThesisInformation errors={this.state.newThesis.errors} thesis={this.state.newThesis.values} sendChange={this.handleChange} studyFields={this.props.StudyFields} editing />
          <h3 className="ui dividing header">Upload Thesis files</h3>
          <ThesisUploadWidget errors={this.state.newThesis.errors} sendChange={this.handleChange} currentFile={this.state.newThesis.values.PdfFile.name} type={"newThesisReview"} />
          <ThesisGraders errors={this.state.newThesis.errors} updateOrNew={"newThesis"} graders={this.props.Graders} alreadySelected={this.state.newThesis.values.Graders} editing={true} />
          {isProfessor || isAdmin ? <GraderListCreateUpdate editable /> : ""}
          <ThesisCouncilMeetingPicker errors={this.state.newThesis.errors} councilMeetings={this.props.CouncilMeetings} sendChange={this.handleChange} editing={true} />
        </div>
        <button className="ui primary button" onClick={this.toggleModal}>
          Submit
        </button>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { saveThesisWithReview } from "./thesis.actions";
import { getCouncilmeetings } from "../councilmeeting/councilmeeting.actions";
import { getStudyfields } from "../studyfield/studyfield.actions";

const mapDispatchToProps = (dispatch) => ({
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
  const auth = state.get("auth");
  const cmreducer = state.get("councilmeeting");
  const sfreducer = state.get("studyfield");
  const grader_r = state.get("grader");
  return {
    user: auth.get("user").toJS(),
    CouncilMeetings: cmreducer.get("councilmeetings").toJS(),
    StudyFields: sfreducer.get("studyfields").toJS(),
    Graders: grader_r.get("graders").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThesisCreatePage);
