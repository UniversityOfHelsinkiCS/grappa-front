import React, { Component } from "react";
import Validate from "../validate/Validate";

export default class Dropdown extends Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      menuActive: false,
      filtered: [],
    };
  }

  componentWillMount() {
    console.log("will mount");
    console.log(this.props.graders);
    console.log(this.props.activated);
  }

  componentWillReceiveProps(newProps) {
    console.log("got props");
    console.log(newProps.graders);
  }


  handleClick(type, index, event) {
    if (type === "unactivate" && this.props.editable) {
      Validate.updateForm(this.props.formname, "Graders", this.props.activated.filter((grader, i) => {
        if (index !== i) return grader;
      }));
      // this.props.activated.splice(index, 1);
      // this.setState({});
    } else if (type === "activate" && this.props.editable) {
      // console.log("pushing grader to activated")
      // this.props.activated.push(this.props.graders[index]);
      // this.setState({});
      // const old = Validate.getFormField(this.props.formname, "Grader");
      // Validate.updateForm(this.props.formname, "Grader", [...old, this.props.graders[index]]);
      Validate.updateForm(this.props.formname, "Graders", [...this.props.activated, this.props.graders[index]]);
    } else if (type === "toggleMenu") {
      this.setState({
        menuActive: !this.state.menuActive,
      });
    }
  }

  handleChange(name, event) {
    if (name === "search") {
      const value = event.target.value;
      const filtered = this.props.graders.map((item, index) => {
        return item.name.toLowerCase().indexOf(value) === -1 &&
          item.title.toLowerCase().indexOf(value) === -1;
      });
      this.setState({
        searchValue: value,
        filtered,
      });
    }
  }

  handleKeyPress(target) {
    // if enter
    if (target.charCode === 13 && this.props.editable) {
      const activated = this.props.graders.find((item, index) => {
        if (!this.state.filtered[index] && !this.isActivated(item)) {
          return item;
        }
      });
      if (activated !== undefined) {
        this.props.activated.push(activated);
        this.setState({});
      }
    }
  }

  handleFocus() {
    console.log("DIV FOCUSS")
    this.setState({
      menuActive: true,
    });
  }

  handleMenuFocus() {
    console.log("MENU FOCUSS")
  }

  handleBlur() {
    console.log("BLURR")
    // this.setState({
    //   menuActive: false,
    // });
  }

  isActivated(grader) {
    const index = this.props.activated.findIndex(item => {
      if (grader.id === item.id) return item;
    });
    return index !== -1;
  }

  render() {
    const { graders, activated } = this.props;
    const { filtered } = this.state;
    // console.log("filtered")
    // console.log(filtered)
    // console.log("activated")
    // console.log(activated)
    return (
      <div>
        <div
          className="ui fluid multiple search selection dropdown empty visible"
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        >
          <input name="tags" type="hidden" value="asdf" />
          <i className={this.state.menuActive ? "delete icon" : "dropdown icon"} onClick={this.handleClick.bind(this, "toggleMenu")}></i>
          { activated.map((item, index) => {
            return (
              <a key={index} className="ui label transition visible" data-value="angular" onFocus={this.handleFocus.bind(this)}>
                { `${item.title} ${item.name}` }
                <i className="delete icon" onClick={this.handleClick.bind(this, "unactivate", index)}></i>
              </a>
            );
          })}
          <input
            className="search"
            autoComplete="off"
            tabIndex="0"
            style={{ width: "100%" }}
            value={this.state.searchValue}
            onChange={this.handleChange.bind(this, "search")}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          { this.state.menuActive ?
            <div onFocus={this.handleMenuFocus.bind(this)} className="menu transition visible" tabIndex="-1">
              { graders.map((item, index) => {
                if (!filtered[index] && !this.isActivated(item)) {
                  return (
                    <div
                      key={index}
                      className="item"
                      data-value="css"
                      onClick={this.handleClick.bind(this, "activate", index)}
                      onFocus={this.handleMenuFocus.bind(this)}
                    >
                      { `${item.title} ${item.name}` }
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="item filtered" data-value="css">{item.name}</div>
                  );
                }
              })
              }
            </div>
              :
            <div className="menu transition hidden" tabIndex="-1">
            </div>
          }
        </div>
      </div>
    );
  }
}
