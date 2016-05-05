import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";
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
        const link = '<a href="' + API_PATH + '/thesis/pdf/' + theses[i].id + '">Print documents</a>';
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
        <h2>Theses</h2>
          <Table noDataText="No theses available" className="table" columns={columns} sortable filterable={columns} data={this.state.theses}>
          </Table>
          <button type="button" onClick={this.handleClick}>Print all</button>
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
  createPdfs(listToPrint){
    dispatch(createPdfs(listToPrint));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ThesisListForPrint);
