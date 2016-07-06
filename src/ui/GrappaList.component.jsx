import React, { Component } from "react";

export default class GrappaList extends Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      menuActive: false,
      filtered: [],
      selected: [],
    };
  }

 componentWillMount() {
    const selected = this.props.data.map(item => {
      return true;
    });
    this.setState({
      selected,
    });
  }

  componentWillReceiveProps(newProps) {
    const selected = this.props.data.map(item => {
      return true;
    });
    this.setState({
      selected,
    });
  }

  handleClick(type, index, event) {
    if (type === "sort") {
      this.sortByField(index);
    } else if (type === "toggleSelect") {
      this.state.selected[index] = !this.state.selected[index];
      this.setState({});
    }
  }

  // handleChange(name, event) {
  //   if (name === "search") {
  //     const value = event.target.value;
  //     const filtered = this.props.graders.map((item, index) => {
  //       return item.name.toLowerCase().indexOf(value) === -1 &&
  //         item.title.toLowerCase().indexOf(value) === -1;
  //     });
  //     this.setState({
  //       searchValue: value,
  //       filtered,
  //     });
  //   }
  // }

  // handleKeyPress(target) {
  //   // if enter
  //   if (target.charCode === 13 && this.props.editable) {
  //     const activated = this.props.graders.find((item, index) => {
  //       if (!this.state.filtered[index] && !this.isActivated(item)) {
  //         return item;
  //       }
  //     });
  //     if (activated !== undefined) {
  //       this.props.activated.push(activated);
  //       this.setState({});
  //     }
  //   }
  // }

  handleFocus() {
    this.setState({
      menuActive: true,
    });
  }

  handleBlur() {
    // this.setState({
    //   menuActive: false,
    // });
  }

  handleCheckBoxClick(event) {
    const filtered = this.filterOldTheses(this.state.formattedTheses, !this.refs.checkOld.checked);
    this.setState({
      filteredTheses: filtered,
    });
  }

  sortByField(field) {
    console.log("sortin yo " + field)
    this.props.data.sort((a, b) => {
      if(a[field] < b[field]) return -1;
      if(a[field] > b[field]) return 1;
      return 0;
    });
    this.setState({});
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className="column">
          <div className="ui input m-right">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="ui right input">
            <div className="ui checkbox">
              <input ref="checkOld" type="checkbox" onClick={this.handleCheckBoxClick.bind(this)}/>
              <label>Show also finished theses</label>
            </div>
          </div>
          <div className="column">
            <button className="ui button blue">Toggle all</button>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th onClick={this.handleClick.bind(this, "sort", "status")}>Status</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Author firstname</th>
              <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Author lastname</th>
              <th>Title</th>
              <th>Instructor</th>
              <th onClick={this.handleClick.bind(this, "sort", "studyfield")}>Studyfield</th>
              <th>Deadline</th>
              <th>Selected</th>
            </tr>
          </thead>
          <tbody>
            { data.map((item, index) =>
              <tr key={index} onClick={this.handleClick.bind(this, "toggleSelect", index)}>
                <td>{item.status}</td>
                <td>{item.authorFirstname}</td>
                <td>{item.authorLastname}</td>
                <td>{"item.title"}</td>
                <td>{item.instructor}</td>
                <td>{item.studyfield}</td>
                <td>{item.deadline}</td>
                <td>
                  <div className="ui checkbox">
                    <input ref="checkOld" type="checkbox" checked={this.state.selected[index] ? "true" : ""}/>
                    <label></label>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
          </tfoot>
        </table>
      </div>
    );
  }
}
