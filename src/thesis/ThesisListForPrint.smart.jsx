import React, { Component } from "react";
import { Table, unsafe } from "reactable";
import API_PATH from "../middleware/grappaAPI";
import { createPdfs } from "../pdf/pdf.actions";

export class ThesisListForPrint extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { getTheses } = this.props;
    getTheses();

    this.setState({ theses: this.selectFields(this.props.theses) });
  }

  /**
   * Yeah, doesn't work. Plz fix
   */
  handleClick() {
    const { createPdfs } = this.props;
    const listToPrint = { thesesToPrint: this.props.theses };
    createPdfs(listToPrint);
  }
  selectFields(theses) {
    const newTheses = [];
    for (let i = 0; i < theses.length; i++) {
      const newThesis = {};
      if (theses[i].ThesisProgress.gradersStatus && theses[i].abstract !== null) {
        newThesis.Status = "Ready to print";
      } else {
        newThesis.Status = "Waiting for documents";
        newThesis.pdf = "";
        const link = "<a href='" + API_PATH + "/thesis/pdf/" + theses[i].id + "'>Print documents</a>";
        newThesis.pdf = unsafe(link);
      }
      newThesis.title = theses[i].title;
      const origDate = new Date(theses[i].deadline);
      const newDate = `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
      newThesis.deadline = newDate;
      newTheses.push(newThesis);
    }
    return newTheses;
  }

  render() {
    const columns = [
      "Status",
      "title",
      "deadline",
      "pdf",
    ];

    return (
      <div>
        <h2 className="ui dividing header">Councilmeeting of asdf</h2>
        <p>Total abstracts: 666</p>
        <p>
          It will take approximately 1 min for 20 theses to be bundled into one
          downloadable document. Be patient. If nothing works you can manually go
          through theses in the "Theses" view and click "Download as PDF" to get 1 page
          abstracts. In the darkest possible scenario if that fails too you can click
          the "Ethesis" -link and download the whole thesis and cut the 2nd page from
          the pdf yourself.
        </p>
        <button>Download</button>
      </div>
    );
  }
}

import { connect } from "react-redux";
import { getTheses } from "./thesis.actions";

/*
* A special funciton used to define what the form of the data is that is gotten from the state.
* @return ListOfThesis A list containing all the thesis listed in the database.
*/
const mapStateToProps = (state) => {
  const user = state.get("auth").get("user");
  const thesis = state.get("thesis");
  return {
    theses: thesis.get("theses").toJS(),
    user: user.toJS(),
  };
};
/*
* A special function used to define and dispatch the relevant data to the right
* actions in thesis.actions.
*/
const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
  createPdfs(listToPrint) {
    dispatch(createPdfs(listToPrint));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ThesisListForPrint);
